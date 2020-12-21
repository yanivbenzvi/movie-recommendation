<template>
  <v-row xs-3>

    <v-card class="d-flex flex-no-wrap justify-space-between">

      <v-row align="start">

        <v-card-title class=" pt-0 pb-0"
                      style="width: 100%;">
          {{ movie.name.substring(0, 30).concat(movie.name.length > 30 ? '...': '')}}
          <v-spacer/>
        </v-card-title>

        <v-card-text class="pb-0 recipe-description">{{ movie.summary.substring(0, 200).concat(movie.summary.length > 200 ? '...': '')}}</v-card-text>

        <v-card-actions class="px-5">

          <v-btn outlined text>
            <v-icon>star</v-icon>
            {{ movie.rating }}
          </v-btn>
        </v-card-actions>
      </v-row>

      <v-avatar size="200" rounded>
        <v-img :src="movie.image"></v-img>
      </v-avatar>

    </v-card>
  </v-row>
</template>

<script>

export default {
  name: "app-recipe",

  props: ['movie']
}
</script>

<style scoped>
.recipe-description {
  height: 100px;
  overflow: hidden;
}
</style>