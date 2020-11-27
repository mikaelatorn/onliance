<template>
  <el-card shadow="never" class="comment-card">
    <h5>{{ comment.author }}</h5>
    <p class="light-grey">{{ comment.createdAt }}</p>
    <p>{{ comment.text }}</p>
  </el-card>
</template>
<script>
export default {
  props: {
    comment: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

