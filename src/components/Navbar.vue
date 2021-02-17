<template>
  <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
   <div>
    <img
      src="../assets/img/logo-02.svg"
      class="onliance-logomark-nav"
      type="image/svg+xml"
      alt="Onliance Logomark"
    >
   </div>
   <div v-for="item in menuItems" :key="item.name">
    <el-menu-item
        v-if="(item.isGod && $store.state.userProfile.isGod ) || !item.isGod"
        :index="item.path"
      >
        <i :class="'el-icon-' + item.icon" ></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </div>
    <el-menu-item @click="logout()">
        <i class="el-icon-d-arrow-right"></i>
        <span slot="title">Logout</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
import { menuItems } from '@/config/menuItems.js' 
export default {
  data () {
    return {
      isCollapse: true,
      menuItems: menuItems
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
