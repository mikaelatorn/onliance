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
    <el-menu-item index="/app/dashboard">
        <i class="el-icon-menu"></i>
        <span slot="title">Dashboard</span>
    </el-menu-item>
    <!-- <el-menu-item index="search">
        <i class="el-icon-search"></i>
        <span slot="title">Search</span>
    </el-menu-item> -->
    <el-menu-item index="/app/activity">
        <i class="el-icon-medal-1"></i>
        <span slot="title">Activity</span>
    </el-menu-item>
    <el-menu-item index="/app/conversations">
        <i class="el-icon-chat-line-square"></i>
        <span slot="title">Conversations</span>
    </el-menu-item>
    <el-menu-item index="/app/profile">
        <i class="el-icon-user"></i>
        <span slot="title">Profile</span>
    </el-menu-item>
    <el-menu-item index="/app/settings">
        <i class="el-icon-setting"></i>
        <span slot="title">Settings</span>
    </el-menu-item>
    <el-menu-item v-if="$store.state.userProfile.isGod" index="/admin/admin-dashboard">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">Admin - Manage posts</span>
    </el-menu-item>
    <el-menu-item v-if="$store.state.userProfile.isGod" index="/admin/admin-reports">
        <i class="el-icon-s-release"></i>
        <span slot="title">Admin - Manage reports</span>
    </el-menu-item>
    <el-menu-item @click="logout()">
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
      this.$store.dispatch('logout').then(res => {
        this.$router.push({ name: 'login' })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
