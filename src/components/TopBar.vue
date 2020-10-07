<template>
  <div class="title">
    <el-button @click="changeDrawer()" class="topbar-button hidden-sm-and-up">
      <i class="el-icon-s-fold" ></i>
    </el-button>
    <h2>{{ name }}</h2>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String
    }
  },
  methods: {
    changeDrawer () {
      this.$root.$emit('update-drawer')
    }
  }
}
</script>
