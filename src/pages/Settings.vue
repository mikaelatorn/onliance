<template>
    <el-row>
      <TopBar name="Settings" />
      <div class="justify-center">
        <el-col class="settings-col" :xs="22" :sm="18" :md="12" :lg="8">
          <!-- <h4>Account</h4>
          <el-input class="padding-small" placeholder="Email" v-model="form.email"></el-input>
          <div class="button-container">
            <el-button class="settings-button" type="primary" >Change email</el-button>
          </div> -->
          <!-- <el-divider></el-divider> -->
          <h4>Security</h4>
          <el-input class="padding-small" placeholder="Old password" v-model="security.oldPassword"></el-input>
          <el-input class="padding-small" placeholder="New password" v-model="security.newPassword"></el-input>
          <el-input class="padding-small" placeholder="Repeat New password" v-model="security.newPasswordRepeat"></el-input>
          <div class="button-container">
            <el-button class="settings-button" type="primary">Save password</el-button>
          </div>
          <el-divider></el-divider>
          <h4>Privacy</h4>
          <p>According to GDPR bla bla, request all data collected of me</p>
          <div class="button-container">
            <el-button @click="requestDataDialog = true" class="settings-button" type="primary" >Request Data</el-button>
          </div>
          <el-divider></el-divider>
          <h4>Account</h4>
          <p>Delete onliance account</p>
          <div class="button-container">
            <el-button @click="deleteAccountDialog = true" class="settings-button" type="primary" >Delete account</el-button>
          </div>
         <!-- <el-divider content-position="left">Communication</el-divider>
          <el-divider content-position="left">GDPR</el-divider> -->
        </el-col>
      </div>
      <el-dialog title="Request Data (GDPR)" :visible.sync="requestDataDialog">
        <p>Note: The data requested will be sent to the email address associated with this account, the process of retrieving all your account information can take up to 7 days (or smth)</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="requestDataDialog = false">Cancel</el-button>
          <el-button type="primary" @click="requestDataDialog = false">Confirm</el-button>
        </span>
      </el-dialog>
      <el-dialog title="Delete Account" :visible.sync="deleteAccountDialog">
        <p>In order to delete your account, please provide your password. Once you confirm, your account and all data associated with the account will be removed and the account can not be recovered</p>
        <el-form :model="deleteAccountForm">
          <el-form-item label="Password">
            <el-input v-model="deleteAccountForm.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteAccountDialog = false">Cancel</el-button>
          <el-button type="primary" @click="deleteAccountDialog = false">Confirm</el-button>
        </span>
      </el-dialog>
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
      },
      deleteAccountForm: {
        password: ''
      },
      deleteAccountDialog: false,
      requestDataDialog: false
    }
  }
  // beforeMount () {
  //   this.form.email = this.$store.state.currentUser.email
  // }
}
</script>
