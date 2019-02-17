<template>
  <div id="app">
    <div id="app">
      <v-app>
        <v-navigation-drawer
                fixed
                v-model="drawer"
                app
        >
          <v-list dense>
            <v-list-tile router to="/course">
              <v-list-tile-action>
                <v-icon>list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>课程</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile router to="/Grades">
              <v-list-tile-action>
                <v-icon>date_range</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>成绩</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-content>
          <v-container fluid>
            <router-view/>
          </v-container>
        </v-content>
        <v-toolbar color="indigo" dark fixed app>
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title>选课成绩管理系统</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu v-model="menu">
            <v-btn color="orange" dark slot="activator">
              <v-icon left>account_circle</v-icon>
              {{ userID }}
            </v-btn>
            <v-card>
              <v-btn flat small color="error" @click="logout">注销</v-btn>
            </v-card>
          </v-menu>
        </v-toolbar>
        <v-footer color="indigo" app inset>
          <span class="white--text">&copy; 2017</span>
        </v-footer>
      </v-app>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    menu: false,
    userID: '16121755'
  }),
  methods: {
    logout: function () {
      console.log('注销')
    }
  }
}
</script>

<style>

</style>
