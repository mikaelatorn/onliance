<template>
  <el-drawer
    :visible.sync="drawer"
    direction="ltr"
  >
    <el-menu default-active="1" class="el-menu-vertical-demo mobile-menu" :collapse="false" :router="true">
      <div v-for="item in menuItems" :key="item.name">
      <el-menu-item
          v-if="(item.isGod && $store.state.userProfile.isGod ) || !item.isGod"
          :index="item.path"
        >
          <i :class="'el-icon-' + item.icon" ></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </div>
      <el-menu-item @click="logout">
        <i class="el-icon-d-arrow-right"></i>
        <span slot="title">Logout</span>
    </el-menu-item>
    </el-menu>
  </el-drawer>
</template>
<script>
import { menuItems } from '@/config/menuItems.js' 
export default {
  data () {
    return {
      drawer: false,
      menuItems: menuItems
    }
  },
  mounted () {
    this.$root.$on('update-drawer', () => {
      this.drawer = !this.drawer
    })
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
