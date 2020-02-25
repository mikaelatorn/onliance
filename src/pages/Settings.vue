<template>
    <el-row>
      <TopBar name="Settings" />
      <div class="justify-center">
        <el-col class="settings-col" :xs="22" :sm="18" :md="12" :lg="8">
          <h4>Account</h4>
          <el-input class="padding-small" placeholder="Email" v-model="form.email"></el-input>
          <div class="button-container">
            <el-button class="padding-small settings-button" type="primary" round>Change email</el-button>
          </div>
          <el-divider></el-divider>
          <h4>Security</h4>
          <el-input class="padding-small" placeholder="Old password" v-model="security.oldPassword"></el-input>
          <el-input class="padding-small" placeholder="New password" v-model="security.newPassword"></el-input>
          <el-input class="padding-small" placeholder="Repeat New password" v-model="security.newPasswordRepeat"></el-input>
          <div class="button-container">
            <el-button class="padding-small settings-button" type="primary" round>Save password</el-button>
          </div>
         <!-- <el-divider content-position="left">Communication</el-divider>
          <el-divider content-position="left">GDPR</el-divider> -->
        </el-col>
      </div>
    </el-row>
</template>
<script>
import TopBar from '../components/TopBar'
export default {
  components: {
    TopBar
  },
  data () {
    return {
      form: {
        email: ''
      },
      security: {
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: ''
      }
    }
  }
}
</script>
