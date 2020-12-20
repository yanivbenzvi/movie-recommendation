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

      <v-btn dark class="mx-1" to="/login">
        <v-icon>login</v-icon>
        login
      </v-btn>

      <v-btn dark class="mx-1" to="/register">
        register
      </v-btn>
    </v-app-bar>

    <v-sheet id="scrolling-techniques-4"
             class="overflow-y-auto"
             max-height="600">
      <v-container></v-container>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: 'app-home-page',
}
</script>
