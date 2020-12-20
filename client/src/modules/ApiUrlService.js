const inDevelopment      = process.env.NODE_ENV === 'development'

export class ApiUrlService {
    static apiRootUrl = inDevelopment ? 'http://localhost:3000/': 'https://gcp.url' //TODO: add production url
    static apiCurrentVersion = 'v1/'

    static apiFullRootUrl = ApiUrlService.apiRootUrl + ApiUrlService.apiCurrentVersion

    static loginUrl(){return ApiUrlService.apiFullRootUrl + 'auth/login'}

    static registerUrl(){return ApiUrlService.apiFullRootUrl + 'auth/register'}

    static refreshTokenUrl(){return ApiUrlService.apiFullRootUrl + 'auth/refresh-token'}

    static getMovieList(){return ApiUrlService.apiFullRootUrl + 'get-movie-list'}

}