<template>
   <el-card shadow="never" class="comment-card">
    <h5>No {{ contentType }} here :(</h5>
    <p class="light-grey">Start a conversation in a thread or write a post of your own! Then you'll find your {{ contentType }} here</p>
  </el-card>
</template>
<script>
export default {
  props: {
    contentType: {
      type: String,
      default: ''
    }
  }
}
</script>