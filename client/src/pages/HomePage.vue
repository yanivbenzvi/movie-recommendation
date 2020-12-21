<template>
  <div>

    <v-app-bar absolute
               color="#6A76AB"
               dark
               shrink-on-scroll
               prominent
               :src="require('../assets/home-banner.jpg')"
               fade-img-on-scroll
               scroll-target="#scrolling-techniques-4">

      <template v-slot:img="{ props }">
        <v-img v-bind="props"
               gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)">
        </v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Movie recommendation</v-toolbar-title>

      <v-spacer></v-spacer>
      <template v-if="isAuth">
        <v-btn dark class="mx-1" @click="logout">
          <v-icon>login</v-icon>
          logout
        </v-btn>
      </template>
      <template v-else>

        <v-btn dark class="mx-1" to="/login">
          <v-icon>login</v-icon>
          login
        </v-btn>

        <v-btn dark class="mx-1" to="/register">
          register
        </v-btn>
      </template>
    </v-app-bar>

      <v-container style="margin-top: 120px"  >
        <app-movie-list v-if="isAuth"/>
        <template v-else>
          In order to view movie recommendation you have to login.
        </template>
      </v-container>
  </div>
</template>

<script>
import {TokenStorage} from '../modules/TokenStorage'
import MovieList      from '../components/MovieList'
import WishList       from '../components/WishList'

export default {
  name:       'app-home-page',
  components: {
    'app-movie-list':      MovieList,
    'app-movie-wish-list': WishList,
  },

  data() {
    return {
      isAuth: false,
    }
  },

  methods: {
    logout() {
      TokenStorage.clear()
      this.isAuth = false
    },
  },

  beforeMount() {
    this.isAuth = TokenStorage.isAuthenticated()
  },

}
</script>
