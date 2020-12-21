import httpStatus from 'http-status'
import {Wishlist}       from '../models/wishList.model'
import {Movie}       from '../models/movie.model'

/**
 * Get movie list
 * @public
 */
export const list = async (req, res, next) => {
    try {
        const wishlist            = await Wishlist.getByUser('yanivbenzvi023@gmail.com')
        const transformedWishList = new Wishlist(wishlist).transform()
        const movies = transformedWishList.list.map(item => Movie.getById(item.id))
        res.json(movies)
    } catch (error) {
        next(error)
    }
}

export const addItem = async (req, res, next) => {
    try {
        let wishList            = await Wishlist.getByUser('yanivbenzvi023@gmail.com')
        if(!wishList){
            wishList = new Wishlist({list:[],belongTo:'yanivbenzvi023@gmail.com'})
        }else{
            wishList = new Wishlist(wishList)
        }
        wishList.addMovie(req.body.movie)
        console.log(wishList)
        await wishList.save()
        // const transformedUsers = movies.map(movie =>movie.transform())

        res.json('transformedUsers')
    } catch (error) {
        next(error)
    }
}


