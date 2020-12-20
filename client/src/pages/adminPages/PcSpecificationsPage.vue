<template>
  <v-row>
    <v-col>
      <v-btn @click.stop="$dialogs.push({dialogComponent: 'add-pc-specification-form', dialogData: null})">
        <v-icon right
                class="mx-1">
          add
        </v-icon>
        הוסף מחשב
      </v-btn>

      <v-card class="mx-auto"
              min-width="400"
              tile
              dir="ltr">

        <v-list two-line>
          <template v-for="(item, index) in pcList">

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
                  <v-btn @click.stop="$dialogs.push({dialogComponent: 'add-pc-specification-form', dialogData: null})"
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
            <v-divider v-if="index != pcList.length -1"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "app-pc-specifications-page",

    data() {
      return {
        pcList: [
          {name: 'Lenovo'},
          {name: 'Dell'},
          {name: 'Apple'},
          {name: 'Asus'},
          {name: 'Hp'},
        ]
      }
    },

    methods: {
      deleteItem(key) {
        console.log(`delete item ${key}`);
        this.$dialogs.pop()
      }
    }
  }
</script>

<style scoped>

</style>
