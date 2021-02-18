<template>
  <div class="home">
    <el-row class="full-height">
      <el-col :span="12" class="col-full col-left">
          <LeftPanel />
      </el-col>
      <el-col :span="12" class="col-full col-right">
          <div class="right-container">
            <el-col class="form" :span="10">
              <h1>Set new password</h1>
              <small>After you've entered your new password you will be redirected to the login page and asked to sign in with your new password</small>
              <el-form @submit.prevent :rules="rules" ref="form" :model="form">
                <el-form-item prop="password">
                  <el-input class="padding-small" placeholder="New Password" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="passwordRepeat" class="last-form-item">
                  <el-input class="padding-small" placeholder="Repeat new password" type="password" v-model="form.passwordRepeat"></el-input>
                </el-form-item>
                <el-button class="button-block button-auth" type="primary">Confirm</el-button>
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
        password: '',
        passwordRepeat: ''
      },
      rules: {
        password: rules.newPassword,
        passwordRepeat: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
