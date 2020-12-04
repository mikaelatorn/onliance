<template>
  <el-drawer
    :visible.sync="drawer"
    direction="ltr"
  >
    <el-menu default-active="1" class="el-menu-vertical-demo mobile-menu" :collapse="false" :router="true">
      <el-menu-item index="/dashboard">
          <i class="el-icon-menu"></i>
          <span slot="title">Dashboard</span>
      </el-menu-item>
      <!-- <el-menu-item index="/search">
          <i class="el-icon-search"></i>
          <span slot="title">Search</span>
      </el-menu-item> -->
      <el-menu-item index="activity">
        <i class="el-icon-medal-1"></i>
        <span slot="title">Activity</span>
    </el-menu-item>
    <el-menu-item index="conversations">
        <i class="el-icon-chat-line-square"></i>
        <span slot="title">Conversations</span>
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
    this.$root.$on('update-drawer', () => {
      this.drawer = !this.drawer
    })
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
