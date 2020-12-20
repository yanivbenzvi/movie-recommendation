<template>
  <v-row>
    <v-col>
      <v-btn @click.stop="$dialogs.push({dialogComponent: 'add-manufacturers-form', dialogData: null})">
        <v-icon right
                class="mx-1">
          add
        </v-icon>
        הוסף יצרן
      </v-btn>

      <v-card tile
              dir="ltr">

        <v-list two-line>
          <template v-for="(item, index) in manufacturers">

            <v-list-item :key="index">
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>

              <v-spacer></v-spacer>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon
                         small
                         v-bind="attrs"
                         v-on="on">
                    <v-icon color="green">launch</v-icon>
                  </v-btn>
                </template>
                <span>הצג</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click.stop="$dialogs.push({dialogComponent: 'add-manufacturers-form', dialogData: null})"
                         icon
                         small
                         v-bind="attrs"
                         v-on="on">
                    <v-icon>create</v-icon>
                  </v-btn>
                </template>
                <span>ערוך</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click.stop="$dialogs.push({dialogComponent: 'app-prompt-warning', dialogData: null,
                callbackAction: ()=> deleteItem(index)})"
                         icon
                         small
                         v-bind="attrs"
                         v-on="on">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                </template>
                <span>מחק</span>
              </v-tooltip>

            </v-list-item>
            <v-divider v-if="index != manufacturers.length -1"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {ApiUrlService} from "@/modules/ApiUrlService"
import {TokenStorage} from "@/modules/TokenStorage"

export default {
  name: "app-Manufacturers-page",

  data() {
    return {
      manufacturers: null,
    }
  },

  async created() {
    await this.getAllManufacturer()
  },

  methods: {
    deleteItem(key) {
      console.log(`delete item ${key}`);
      this.$dialogs.pop()
    },

    async getAllManufacturer(){
      try {
        const result = await this.$http.get(ApiUrlService.getManufacturer(), TokenStorage.getAuthentication())
        this.manufacturers = result?.data
      } catch (error) {
        console.error(error)
        this.$dialogs.push({dialogComponent: 'app-error-warning', errorMessage: error.toString()})
      }
    },
  }
}
</script>

<style scoped>

</style>
