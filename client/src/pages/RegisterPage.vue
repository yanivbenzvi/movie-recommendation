<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-form style="width: 400px;"
              v-model="formValid"
              @submit.prevent="login"
              ref="form"
              lazy-validation>

        <v-row justify="center">
          <h1>Register</h1>
        </v-row>

        <v-text-field
            v-model="fName"
            autofocus
            prepend-inner-icon="mdi-email"
            label="Full Name"
            :rules="[rules.required]">
        </v-text-field>

        <v-text-field v-model="email"
                      autofocus
                      prepend-inner-icon="mdi-email"
                      label="Email"
                      :rules="[rules.required ,rules.emailValid]">
        </v-text-field>

        <v-text-field
            v-model="password"
            label="password"
            prepend-inner-icon="mdi-lock"
            :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="hidePassword ? 'password' : 'text'"
            @click:append="hidePassword = !hidePassword"
            :rules="[rules.required]">
        </v-text-field>

        <v-btn color="#62A9F5"
               width="95%"
               height="50px"
               x-large
               rounded
               :disabled="!formValid"
               class="mr-4 mt-2"
               type="submit">
          Register
        </v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import {ApiUrlService} from '@/modules/ApiUrlService'
import {TokenStorage}  from '@/modules/TokenStorage'

export default {
  name: 'app-register-page',

  data: () => ({
    fName:        '',
    email:        '',
    password:     '',
    hidePassword: true,
    formValid:    true,
    rules:        {
      required:   (value) => !!value || 'This field is required.',
      emailValid: (v) => /.+@.+\..+/.test(v) || 'Email pattern is invalid.',
    },
  }),

  methods: {
    async login() {
      try {
        const response = await this.$http.post(ApiUrlService.registerUrl(),
            {
              email:    this.email,
              fName:    this.fName,
              password: this.password,
            })

        TokenStorage.storeToken(response.data.token.accessToken)
        TokenStorage.storeRefreshToken(response.data.token.refreshToken)
        TokenStorage.storeUserEmail(response.data.user.email)
        await this.$router.push('/')

      } catch (error) {
        console.error(error.response)
        this.$dialogs.push({dialogComponent: 'app-error-warning', errorMessage: error.toString()})
      }
    },
  },
}
</script>