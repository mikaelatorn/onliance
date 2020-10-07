<template>
  <el-alert
    :title="title"
    :type="type"
    show-icon
  >
  </el-alert>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  }
}
</script>