import axios, {AxiosRequestConfig} from 'axios'
import {ApiUrlService}             from '@/modules/ApiUrlService'

export class TokenStorage {

    static LOCAL_STORAGE_TOKEN         = 'token'
    static LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token'
    static LOCAL_USER_EMAIL            = 'user_email'

    static isAuthenticated() {
        return this.getToken() !== null
    }

    static getAuthentication() {
        return {
            headers: {'Authorization': 'Bearer ' + this.getToken()},
        }
    }

    static async getNewToken() {
        try {
            const response = await axios.post(ApiUrlService.refreshTokenUrl(), {
                refreshToken: TokenStorage.getRefreshToken(),
                email:        TokenStorage.getUserEmail(),
            })
            this.storeToken(response.data.accessToken)
            this.storeRefreshToken(response.data.refreshToken)
            return response.data.accessToken
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    static storeToken(token) {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token)
    }

    static storeRefreshToken(refreshToken) {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken)
    }

    static storeUserEmail(userEmail) {
        localStorage.setItem(TokenStorage.LOCAL_USER_EMAIL, userEmail)
    }

    static clear() {
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN)
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN)
        localStorage.removeItem(TokenStorage.LOCAL_USER_EMAIL)
    }

    static getRefreshToken() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN)
    }

    static getToken() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN)
    }

    static getUserEmail() {
        return localStorage.getItem(TokenStorage.LOCAL_USER_EMAIL)
    }
}