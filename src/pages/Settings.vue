<template>
    <el-row>
      <TopBar name="Settings" />
      <div class="justify-center inner-row">
        <el-col class="settings-col" :xs="22" :sm="18" :md="12" :lg="8">
          <h4>Security</h4>
          <el-form @submit.prevent :rules="rules" ref="form" :model="security">
            <!-- <el-form-item prop="oldPassword">
              <el-input class="padding-small" placeholder="Old password" type="password" v-model="security.oldPassword" name="oldPassword"></el-input>
            </el-form-item> -->
            <el-form-item prop="newPassword">
              <el-input class="padding-small" placeholder="New password" type="password" v-model="security.newPassword" name="newPassword"></el-input>
            </el-form-item>
            <el-form-item prop="newPasswordRepeat">
              <el-input class="padding-small" placeholder="Repeat New password" type="password" v-model="security.newPasswordRepeat" name="newPasswordRepeat"></el-input>
            </el-form-item>
            <div class="button-container">
              <el-button @click="changePassword('form')" class="settings-button" type="primary">Save password</el-button>
            </div>
          </el-form>
          <el-divider></el-divider>
          <h4>Account</h4>
          <p>Delete onliance account</p>
          <div class="button-container">
            <el-button @click="deleteAccountDialog = true" class="settings-button" type="primary" >Delete account</el-button>
          </div>
        </el-col>
      </div>
      <el-dialog title="Delete Account" :visible.sync="deleteAccountDialog">
        <p>Are you sure you want to delete your account?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteAccountDialog = false">Cancel</el-button>
          <el-button type="primary" @click="deleteAccount()">Confirm</el-button>
        </span>
      </el-dialog>
    </el-row>
</template>
<script>
import TopBar from '../components/TopBar'
import { rules } from '@/config/validation.js'
export default {
  components: {
    TopBar
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.security.newPassword) {
        callback(new Error('Password inputs don\'t match!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        email: ''
      },
      security: {
        newPassword: '',
        newPasswordRepeat: ''
      },
      deleteAccountDialog: false,
      rules: {
        newPassword: rules.newPassword,
        newPasswordRepeat: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    deleteAccount () {
      this.$store.dispatch('deleteAccount').then(() =>{
        this.$router.push({ name: 'login' })
      }).catch(err => {
        console.log(err)
        this.$root.$emit('create-alert', { title: err.message, type: 'error'})
      })
    },
    changePassword (form) {
      this.$refs[form].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$store.dispatch('changePassword', this.security).then(res => {
            console.log("done")
            this.$root.$emit('create-alert', { title: 'Password successfully changed!', type: 'success'})
          }).catch(err => {
            console.log(err)
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
