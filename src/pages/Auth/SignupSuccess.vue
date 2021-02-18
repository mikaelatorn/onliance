<template>
  <div class="home">
    <el-row class="full-height">
      <el-col :span="12" class="col-full col-left">
          <LeftPanel />
      </el-col>
      <el-col :span="12" class="col-full col-right">
        <div class="right-container">
           <el-col class="form" :span="15">
              <h1>Registration complete!</h1>
              <p>Confirm your email address to login</p>
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
export default {
  name: 'SingupSuccess',
  components: {
    LeftPanel
  }
}
</script>

