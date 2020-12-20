<template>
  <v-container class="justify-center">

    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>התחברות מנהל</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
              label="שם משתמש"
              prepend-icon="mdi-account-circle"
          />
          <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="סיסמה"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success">הרשמה</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click.stop="login"
               color="info">
          התחבר
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {ApiUrlService} from "@/modules/ApiUrlService"
import {TokenStorage} from "@/modules/TokenStorage"

export default {
  name: 'app-login-page',

  data() {
    return {
      showPassword: false,
    }
  },

  methods: {
    async login() {
      try {
        const response = await this.$http.post(ApiUrlService.loginUrl(),
            {
              email: 'yariv1052@gmail.com',
              password: '123456'
            })

        TokenStorage.storeToken(response.data.token.accessToken)
        TokenStorage.storeRefreshToken(response.data.token.refreshToken)
        TokenStorage.storeUserEmail(response.data.user.email)
        await this.$router.push('admin')

      } catch (error) {
        console.error(error.response)
        this.$dialogs.push({dialogComponent: 'app-error-warning', errorMessage: error.toString()})
      }
    }
  }
}
</script>
