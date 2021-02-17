<template>
    <el-row>
      <TopBar name="Settings" />
      <div class="justify-center inner-row">
        <el-col class="settings-col" :xs="22" :sm="18" :md="12" :lg="8">
          <h4>Security</h4>
          <el-input class="padding-small" placeholder="Old password" v-model="security.oldPassword"></el-input>
          <el-input class="padding-small" placeholder="New password" v-model="security.newPassword"></el-input>
          <el-input class="padding-small" placeholder="Repeat New password" v-model="security.newPasswordRepeat"></el-input>
          <div class="button-container">
            <el-button class="settings-button" type="primary">Save password</el-button>
          </div>
          <el-divider></el-divider>
          <h4>Account</h4>
          <p>Delete onliance account</p>
          <div class="button-container">
            <el-button @click="deleteAccountDialog = true" class="settings-button" type="primary" >Delete account</el-button>
          </div>
        </el-col>
      </div>
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
      deleteAccountDialog: false
    }
  }
}
</script>
