<template>
  <v-form-card @input="$emit('input')"
               title="טופס הוספת תוכנה">

    <validation-observer ref="observer"
                         v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <validation-provider v-slot="{ errors }"
                             name="שם התוכנה"
                             rules="required|max:10">
          <v-text-field v-model="softwareName"
                        :counter="10"
                        :error-messages="errors"
                        label="שם התוכנה"
                        required>
          </v-text-field>
        </validation-provider>

        <validation-provider v-slot="{ errors }"
                             name="חברה מפתחת"
                             rules="required|max:10">
          <v-text-field v-model="softwareCompanyName"
                        :counter="10"
                        :error-messages="errors"
                        label="חברה מפתחת"
                        required>
          </v-text-field>
        </validation-provider>
      </form>
    </validation-observer>
  </v-form-card>
</template>

<script>
  import VFormCard from '../VFormCard'
  import {required, max} from 'vee-validate/dist/rules'
  import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} אינו יכול להיות ריק',
  })

  extend('max', {
    ...max,
    message: '{_field_} אינו יכול להכיל יותר מ-{length} תווים',
  })


  export default {
    name: "add-softwares-form",
    components: {
      'v-form-card': VFormCard,
      ValidationProvider,
      ValidationObserver,
    },

    data: () => ({
      softwareName: '',
      softwareCompanyName: '',
      items: [
        'מחשב נייד',
        'Smartphones',
        'אחר',
      ],
    }),

    methods: {
      submit() {
        this.$refs.observer.validate()
      },

      clear() {
        this.softwareName = ''
        this.softwareCompanyName = ''
        this.$refs.observer.reset()
      },
    },
  }
</script>


<style scoped>

</style>
