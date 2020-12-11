<template>
  <div class="home">
    <el-alert v-if="errorMsg"
      :title="errorMsg"
      type="error"
      @close="removeErrorMsg"
      show-icon>
    </el-alert>
    <el-row class="full-height">
      <el-col :span="12" class="col-full col-left">
          <LeftPanel />
      </el-col>
      <el-col :span="12" class="col-full col-right">
          <div class="right-container">
            <el-col class="form" :span="8">
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
// import rules from '@/config/validation.js'
import LeftPanel from '@/components/LeftPanelNotLoggedIn'
const fb = require('@/firebaseConfig.js')
export default {
  name: 'Home',
  components: {
    LeftPanel
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
      errorMsg: '',
      rules: {
        fullName: [
          { required: true, message: 'Name required', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Email required', trigger: 'blur' },
          { type: 'email', message: 'Please input a valid email address', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Password required', trigger: 'blur' },
          { min: 6, message: 'Password should be at least 6 characters', trigger: 'blur' }
        ],
        passwordRepeat: [
          { validator: validatePass, trigger: 'blur' }
        ],
        company: [
          { required: true, message: 'Company name required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    signup (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$store.dispatch('signup', this.form).then(user => {
            // create user obj
            console.log('USER', user)
            fb.usersCollection.doc(user.user.uid).set({
              fullName: this.form.fullName,
              company: this.form.company,
              email: this.form.email
            }).then(() => {
              this.$store.dispatch('validateEmail', user.user)
              this.$store.dispatch('fetchUserProfile')
              this.$store.dispatch('sendConfirmEmail').then(() => {
                console.log('in here')
                this.$router.push({ name: 'signup-success' })
              }, err => {
                console.error(err)
              })
              loading.close()
            }).catch(err => {
              console.log(err)
              loading.close()
              this.errorMsg = err.message
            })
          }).catch(err => {
            console.log(err)
            loading.close()
            this.errorMsg = err.message
          })
        } else {
          return false
        }
      })
    },
    removeErrorMsg () {
      this.errorMsg = ''
    }
  }
}
</script>
