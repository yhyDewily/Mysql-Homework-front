<template>
    <div class="login">
        <v-card class="text-xs-center" max-width=500>
            <v-toolbar dark color="light-blue darken-4">
                <v-toolbar-title>登录</v-toolbar-title>
            </v-toolbar>
            <v-alert
                    type="error"
                    v-model="loginData.errorAlert"
                    transition="fade-transition"
                    dismissible
            >{{ loginData.error }}</v-alert>
            <v-container>
                <v-form v-model="valid" ref="loginForm" lazy-validation>
                    <v-text-field
                            prepend-icon="person"
                            label="学号"
                            :rules="loginData.studentIDRules"
                            v-model="loginData.studentID"
                            required></v-text-field>
                    <v-text-field
                            prepend-icon="lock"
                            label="密码"
                            :rules="loginData.passwordRules"
                            v-model="loginData.password"
                            :append-icon="loginData.visible ? 'visibility_off' : 'visibility'"
                            :append-icon-cb="() => (loginData.visible = !loginData.visible)"
                            :type="loginData.visible ? 'text' : 'password'"
                            required></v-text-field>
                    <v-btn large color="primary" dark @click="login">登录</v-btn>
                </v-form>
            </v-container>
        </v-card>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    loginData: {
      errorAlert: false,
      error: null,
      visible: false,
      studentID: null,
      studentIDRules: [
        (v) => !!v || '学号不能为空',
        (v) => (v && v.length >= 2) || '学号长度应大于等于2'
      ],
      password: null,
      passwordRules: [
        (v) => !!v || '密码不能为空'
      ]
    }
  }),
  methods: {
    login: function () {
      if (this.$refs.loginForm.validate()) {
        this.$axios.post('/login', {
          'sno': this.loginData.studentID,
          'pswd': this.loginData.password
        })
          .then(response => {
            this.$cookie.set('id', this.loginData.studentID)
            this.$router.push('/')
          })
          .catch(error => {
            this.loginData.errorAlert = true
            this.loginData.error = error
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
