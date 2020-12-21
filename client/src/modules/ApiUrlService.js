const inDevelopment      = process.env.NODE_ENV === 'development'


export class ApiUrlService {
    static apiRootUrl = inDevelopment ? 'http://localhost:3000/': 'https://api-dot-movie-recommendation-299207.ew.r.appspot.com/'
    static apiCurrentVersion = 'v1/'

    static apiFullRootUrl = ApiUrlService.apiRootUrl + ApiUrlService.apiCurrentVersion

    static loginUrl(){return ApiUrlService.apiFullRootUrl + 'auth/login'}

    static registerUrl(){return ApiUrlService.apiFullRootUrl + 'users'}

    static refreshTokenUrl(){return ApiUrlService.apiFullRootUrl + 'auth/refresh-token'}

    static getMovieList(){return ApiUrlService.apiFullRootUrl + 'movie'}

    static getWishList(){return ApiUrlService.apiFullRootUrl + 'wish-list'}

    static addMovieWishList(){return ApiUrlService.apiFullRootUrl + 'wish-list'}
}