<template>
  <div class="home">
    <Loading v-if="loading" />
    <el-row class="full-height">
      <el-col :span="12" class="col-full col-left">
          <LeftPanel />
      </el-col>
      <el-col :span="12" class="col-full col-right">
          <div class="right-container">
            <el-col class="form" :span="10">
              <h1>Login</h1>
              <small style="margin-bottom: 1rem">Don't have an account?
                <router-link class="link" :to="{ name: 'signup' }" >Signup here</router-link>
              </small>
              <el-form @submit.prevent :rules="rules" ref="form" :model="form">
                <el-form-item prop="email">
                  <el-input class="padding-small" placeholder="Email" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="last-form-item">
                  <el-input class="padding-small" placeholder="Password" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <div style="clear: both"></div>
                <el-button class="button-block button-auth" style="margin-top: 1rem" type="primary" default @click="login('form')">Login</el-button>
                <router-link class="link link-block" style="margin-top: 1rem" :to="{ name: 'request-reset' }" >Forgot your password?</router-link>
              </el-form>
            </el-col>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LeftPanel from '@/components/LeftPanelNotLoggedIn'
import { rules } from '@/config/validation.js'
import Loading from '@/components/Loading'
export default {
  name: 'Home',
  components: {
    LeftPanel,
    Loading
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email : rules.email,
        password: rules.password
      },
      loading: false
    }
  },
  methods: {
    login (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch("signIn", this.form).then(user => {
            if (user.user.emailVerified) {
              this.$store.commit('setCurrentUser', user.user)
              this.$store.dispatch('fetchUserProfile')
              this.$router.push({ name: 'dashboard' })
            } else {
              this.$store.dispatch('logout').then(res => {
                this.$root.$emit('create-alert', { title: "Your email is not verified!", type: 'error'})
              }).catch(err => {
                console.log(err)
                this.$root.$emit('create-alert', { title: err.message, type: 'error'})
              })
            }
            this.loading = false
          }).catch(err => {
            console.log(err)
            this.loading = false
            this.$root.$emit('create-alert', { title: err.message, type: 'error'})
          })
        }
      })
    }
  }
}
</script>
