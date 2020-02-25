<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
   <div>
    <img
      src="../assets/img/1.svg"
      class="onliance-logomark-nav"
      type="image/svg+xml"
      alt="Onliance Logomark"
    >
   </div>
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
</template>
<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  }
}
</script>
