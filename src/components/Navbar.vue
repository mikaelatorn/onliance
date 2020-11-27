<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
   <div>
    <img
      src="../assets/img/logo-02.svg"
      class="onliance-logomark-nav"
      type="image/svg+xml"
      alt="Onliance Logomark"
    >
   </div>
    <el-menu-item index="/dashboard">
        <i class="el-icon-menu"></i>
        <span slot="title">Dashboard</span>
    </el-menu-item>
    <el-menu-item index="/search">
        <i class="el-icon-search"></i>
        <span slot="title">Search</span>
    </el-menu-item>
    <el-menu-item index="/profile">
        <i class="el-icon-user"></i>
        <span slot="title">Profile</span>
    </el-menu-item>
    <el-menu-item index="/settings">
        <i class="el-icon-setting"></i>
        <span slot="title">Settings</span>
    </el-menu-item>
    <el-menu-item @click="logout">
        <i class="el-icon-d-arrow-right"></i>
        <span slot="title">Logout</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    logout () {
      this.$fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push({ name: 'login' })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
