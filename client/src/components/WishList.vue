<template>
  <v-row>
    <v-col class="pl-10" cols="6" v-for="movie in movies" :key="movie.id">
      <app-movie :movie="movie" :wishList="true"/>
    </v-col>
  </v-row>
</template>
<script>
import {ApiUrlService} from '@/modules/ApiUrlService'
import {TokenStorage}  from '@/modules/TokenStorage'
import qs              from 'qs'
import Movie           from '@/components/Movie'

export default {
  name: 'app-movie-wish-list',

  components: {
    'app-movie': Movie,
  },

  created() {
    this.getAllWishList()
  },

  methods: {
    async getAllWishList() {
      try {
        const result = await this.$http.get(ApiUrlService.getWishList(), {
          params: {email: TokenStorage.getUserEmail()},
        })
        this.movies = result?.data
      } catch (error) {
        console.error(error)
        this.$dialogs.push({dialogComponent: 'app-error-warning', errorMessage: error.toString()})
      }
    },
  },

  data() {
    return {
      movies: [],
    }
  },
}
</script>