<template>
  <el-drawer
    :visible.sync="drawer"
    direction="ltr"
  >
    <el-menu default-active="1" class="el-menu-vertical-demo mobile-menu" :collapse="false" :router="true">
      <el-menu-item index="dashboard">
          <i class="el-icon-menu"></i>
          <span slot="title">Dashboard</span>
      </el-menu-item>
      <el-menu-item index="search">
          <i class="el-icon-search"></i>
          <span slot="title">Search</span>
      </el-menu-item>
      <el-menu-item index="profile">
          <i class="el-icon-user"></i>
          <span slot="title">Profile</span>
      </el-menu-item>
      <el-menu-item index="settings">
          <i class="el-icon-setting"></i>
          <span slot="title">Settings</span>
      </el-menu-item>
    </el-menu>
  </el-drawer>
</template>
<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  mounted () {
    this.$root.$on('updateDrawer', () => {
      this.drawer = !this.drawer
    })
  }
}
</script>
