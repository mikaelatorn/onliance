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
              <h1>Signup</h1>
              <el-input class="padding-small" placeholder="Full name" v-model="form.fullName"></el-input>
              <el-input class="padding-small" placeholder="Email" v-model="form.email"></el-input>
              <el-input class="padding-small" placeholder="Password" type="password" v-model="form.password"></el-input>
              <el-input class="padding-small" placeholder="Repeat password" type="password" v-model="form.passwordRepeat"></el-input>
              <el-input class="padding-small" placeholder="Company name" v-model="form.companyName"></el-input>
              <small>Already have an account?
                  <router-link class="link" :to="{ name: 'Home' }" >Login here</router-link>
              </small>
              <el-button class="padding-small button-block" type="primary" round>Signup</el-button>
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
        fullName: '',
        email: '',
        password: '',
        passwordRepeat: '',
        company: ''
      }
    }
  }
}
</script>
