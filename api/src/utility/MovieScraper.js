import axios   from 'axios'
import moment  from 'moment'
import {Movie} from '../api/models/movie.model'


/**
 * fetch top movies from itunes api.
 * @returns {Promise<object>}
 */
const getTopMovies = async () => {
    try {
        const httpResponse    = await axios.get('https://itunes.apple.com/us/rss/topmovies/limit=25/json')
        const movieResultList = httpResponse.data.feed.entry
        const movieResultDate = moment(httpResponse.data.updated)

        return {movieList: movieResultList, updateAt: movieResultDate}
    } catch (error) {
        console.error(error)
    }

}

/**
 * Store Movies from api to datastore.
 * @param {Array<Object>}movieList
 * @returns {Promise<void>}
 */
const storeMovies = async (movieList) => {
    let storeList = []
    for (const movie of movieList) {
        const name    = movie['im:name'].label
        const image   = getMaxResolutionImage(movie['im:image'])
        const summary = movie['summary'].label
        const rating  = await getMovieRatingByName(movie['link'])
        storeList.push(new Movie({name, image, summary, rating}).save())
    }
    await Promise.all(storeList)
}

/**
 * Retrieve url of the most quality image (by size).
 * @param {Array<Object>} imageList
 * @returns {String}
 */
const getMaxResolutionImage = (imageList) => {
    let maxResolutionImage
    let max = 0

    imageList.forEach((imageObject) => {
        if (parseInt(imageObject.attributes.height) > max) {
            max                = parseInt(imageObject.attributes.height)
            maxResolutionImage = imageObject.label
        }
    })
    return maxResolutionImage
}

const encodeImageBase64 = async (imageUrl) => {
    const imageToBase64 = require('image-to-base64')
    return await imageToBase64(imageUrl)
}

/**
 * invoke async functions.
 */
(async () => {
    const movieObject = await getTopMovies()
    //TODO: check if there is any update
    await storeMovies(movieObject.movieList)
})()

const getMovieRatingByName = async (movieRefer) => {
    const Xray = require('x-ray')
    const x = Xray()
    const movieReferUrl = movieRefer[0].attributes.href

    const scrapRating = await x(movieReferUrl, 'figcaption')
    return scrapRating.match(/(\d)+\.(\d+)/g)[0]
}
