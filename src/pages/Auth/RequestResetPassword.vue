<template>
  <div class="home">
    <el-row class="full-height">
      <el-col :span="12" class="col-full col-left">
          <LeftPanel />
      </el-col>
      <el-col v-if="!passwordResetSuccess" :span="12" class="col-full col-right">
          <div class="right-container">
            <el-col class="form" :span="10">
              <h1>Reset password</h1>
              <small>Enter the email address you used when you joined and we’ll send you instructions to reset your password</small>
              <el-form @submit.prevent :rules="rules" ref="form" :model="form">
                <el-form-item prop="email" class="last-form-item">
                  <el-input class="padding-small" placeholder="Email" v-model="form.email"></el-input>
                </el-form-item>
                <el-button class="button-block button-auth " type="primary" @click="resetPassword('form')">Reset</el-button>
                <div class="small-auth">
                  <small>Want to try again? Go back to
                    <router-link class="link" :to="{ name: 'login' }" >Login here</router-link>
                  </small>
                </div>
              </el-form>
            </el-col>
          </div>
      </el-col>
      <el-col v-if="passwordResetSuccess" :span="12" class="col-full col-right">
        <div class="right-container">
           <el-col class="form" :span="8">
              <h1>Email sent!</h1>
              <p>Check your email to find the link to reset your password</p>
              <el-divider></el-divider>
              <small>Back to
                <router-link class="link" :to="{ name: 'login' }" >Login</router-link>
              </small>
           </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LeftPanel from '@/components/LeftPanelNotLoggedIn'
import { rules } from '@/config/validation.js'
export default {
  name: 'Home',
  components: {
    LeftPanel
  },
  data () {
    return {
      form: {
        email: ''
      },
      passwordResetSuccess: false,
      rules: {
        email: rules.email
      }
    }
  },
  methods: {
    resetPassword (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch("sendResetEmail", this.form.email).then(() => {
            this.passwordResetSuccess = true
            this.form.email = ''
            this.$root.$emit('create-alert', { title: "Email sent! Check your inbox", type: 'success'})
          }).catch(err => {
            console.log(err)
            this.$root.$emit('create-alert', { title: err.message, type: 'error'})
          })
        }
      })
    }
  }
}
</script>
