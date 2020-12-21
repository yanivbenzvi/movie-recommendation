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
      <template v-slot:extension>
        <v-tabs
            v-model="tab"
            align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
              v-for="item in ['home', 'wish list']"
              :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

      <v-container style="margin-top: 220px">
        <template v-if="!isAuth">
          In order to view movie recommendation you have to login.
        </template>
        <v-tabs-items v-else v-model="tab">
          <v-tab-item key="home">
            <app-movie-list v-if="isAuth"/>
          </v-tab-item>
          <v-tab-item key="wish list">
            <app-movie-wish-list/>
          </v-tab-item>
        </v-tabs-items>

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
      tab: null
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
