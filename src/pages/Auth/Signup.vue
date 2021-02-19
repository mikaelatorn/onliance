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
              <h1>Signup</h1>
              <el-form @submit.prevent :rules="rules" ref="form" :model="form">
                <el-form-item prop="fullName">
                  <el-input class="padding-small" placeholder="Full name" v-model="form.fullName" name="fullName"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input class="padding-small" placeholder="Email" v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input class="padding-small" placeholder="Password" type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="passwordRepeat">
                  <el-input class="padding-small" placeholder="Repeat password" type="password" v-model="form.passwordRepeat"></el-input>
                </el-form-item>
                <el-form-item prop="company" class="last-form-item">
                  <el-input class="padding-small" placeholder="Company name" v-model="form.company"></el-input>
                </el-form-item>
                <el-button class="button-block button-auth" type="primary" @click="signup('form')">Signup</el-button>
                <div class="small-auth">
                  <small>Already have an account?
                      <router-link class="link" :to="{ name: 'login' }" >Login here</router-link>
                  </small>
                </div>
              </el-form>
            </el-col>
          </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { rules } from '@/config/validation.js'
import LeftPanel from '@/components/LeftPanelNotLoggedIn'
import Loading from '@/components/Loading'
export default {
  name: 'Home',
  components: {
    LeftPanel,
    Loading
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error('Password inputs don\'t match!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        fullName: '',
        email: '',
        password: '',
        passwordRepeat: '',
        company: ''
      },
      rules: {
        fullName: rules.name,
        email: rules.email,
        password: rules.newPassword,
        company: rules.company,
        passwordRepeat: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    signup (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('signup', this.form).then(user => {
            // create user obj
            console.log('USER', user)
            this.$store.dispatch('setupAccount', { form: this.form, user: user}).then(() => {
              this.$store.dispatch('validateEmail', user.user)
              this.$store.dispatch('fetchUserProfile')
              this.$store.dispatch('sendConfirmEmail').then(() => {
                console.log('in here')
                this.$router.push({ name: 'signup-success' })
              }, err => {
                console.error(err)
                this.$root.$emit('create-alert', { title: err.message, type: 'error'})
              })
              this.loading = false
            }).catch(err => {
              console.log(err)
              this.loading = false
              this.$root.$emit('create-alert', { title: err.message, type: 'error'})
            })
          }).catch(err => {
            console.log(err)
            this.loading = false
            this.$root.$emit('create-alert', { title: err.message, type: 'error'})
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
