<template>
  <div class="home">
    <el-row class="full-height">
      <el-col :span="12" class="col-full col-left">
          <div class="left-container">
            <div>
              <img
                src="@/assets/img/1.svg"
                class="onliance-logomark"
                type="image/svg+xml"
                alt="Onliance Logomark"
              >
              <h1>Onliance</h1>
              <h2>Retail Networking made easy</h2>
            </div>
          </div>
      </el-col>
      <el-col :span="12" class="col-full col-right">
          <div class="right-container">
            <el-col class="form" :span="8">
              <h1>Set new password</h1>
              <small>After you've entered your new password you will be redirected to the login page and asked to sign in with your new password</small>
              <el-input class="padding-small" placeholder="New Password" type="password" v-model="form.password"></el-input>
              <el-input class="padding-small" placeholder="Repeat new password" type="password" v-model="form.passwordRepeat"></el-input>
              <el-button class="padding-small button-block" type="primary" round>Confirm</el-button>
            </el-col>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      form: {
        password: '',
        passwordRepeat: ''
      }
    }
  }
}
</script>
