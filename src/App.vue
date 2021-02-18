<template>
  <transition
      name="fade"
      mode="out-in"
    >
    <div id="app" :class="theme">
      <!-- <el-tooltip class="item" effect="dark" content="Toggle dark/light theme" placement="bottom">
          <el-button  @click="setTheme" class="theme-button" circle>
            <i v-if="theme === 'theme--light'" class="el-icon-sunrise"></i>
            <i v-if="theme === 'theme--dark'" class="el-icon-moon-night"></i>
          </el-button>
        </el-tooltip> -->
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState([
      'theme'
    ])
  },
  methods: {
    setTheme () {
      let theme;
      this.theme === 'theme--light' ? theme = 'theme--dark' : theme = 'theme--light'
      this.$store.commit('setTheme', theme)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
