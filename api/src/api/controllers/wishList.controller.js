import httpStatus from 'http-status'
import {Wishlist} from '../models/wishList.model'
import {Movie}    from '../models/movie.model'

/**
 * Get movie list
 * @public
 */
export const list = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.getByUser(req.query.email)
        const movies   = []
        if (wishlist) {
            const transformedWishList = new Wishlist(wishlist).transform()
            transformedWishList.list.forEach(item => movies.push(Movie.getById(item)))
        }
        res.json(await Promise.all(movies))
    } catch (error) {
        next(error)
    }
}

export const addItem = async (req, res, next) => {
    try {
        let wishList = await Wishlist.getByUser(req.body.email)
        if (!wishList) {
            wishList = new Wishlist({list: [], belongTo: req.body.email})
            wishList.addMovie(req.body.movie)
            await wishList.save()
        } else {
            wishList = new Wishlist(wishList)
            wishList.addMovie(req.body.movie)
            await wishList.update()
        }

        // const transformedUsers = movies.map(movie =>movie.transform())
        res.json([])
    } catch (error) {
        next(error)
    }
}


