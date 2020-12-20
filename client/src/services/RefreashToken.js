import Vue            from 'vue'
import axios          from 'axios'
import {Promise}      from 'es6-promise'
import {TokenStorage} from '@/modules/TokenStorage'

const interceptor = axios.interceptors.response.use((response) => {
    // Return a successful response back to the calling service
    return response
}, async (error) => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }

    // Logout user if token refresh didn't work or user is disabled
    if (error.config.url == 'v1/auth/refresh-token' || error.response.message == 'Account is disabled.') {
        TokenStorage.clear()
        Vue.$router.push('login')

        return new Promise((resolve, reject) => {
            reject(error)
        })
    }
    axios.interceptors.response.eject(interceptor)

    try {
        // Try request again with new token
        const token = await TokenStorage.getNewToken()
        // New request with new token
        const config                    = error.config
        config.headers['Authorization'] = `Bearer ${token}`
        return await axios.request(config)
    } catch (e) {
        TokenStorage.clear()
        return new Promise((resolve, reject) => {
            reject(e)
        })
    }
})
