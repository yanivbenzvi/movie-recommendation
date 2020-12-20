<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <app-dialog-manager></app-dialog-manager>
    </v-main>
  </v-app>
</template>

<script>
import DialogManger from './components/DialogManager'

export default {
  name: 'App',

  components: {
    'app-dialog-manager': DialogManger
  },

  data: () => ({
    //
  })
}
</script>
