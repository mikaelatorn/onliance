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
              <h1>Reset password</h1>
              <small>Enter the email address you used when you joined and we’ll send you instructions to reset your password</small>
              <el-input class="padding-small" placeholder="Email" v-model="form.email"></el-input>
              <small>Want to try again? Go back to
                  <router-link class="link" :to="{ name: 'login' }" >Login here</router-link>
              </small>
              <el-button class="padding-small button-block" type="primary" round>Reset</el-button>
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
        email: ''
      }
    }
  }
}
</script>
