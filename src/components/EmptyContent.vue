<template>
   <el-card shadow="never" class="comment-card">
     <div class="title-container empty-container">
        <h2>No {{ contentType }} yet!</h2>
        <p v-if="contentType === 'Conversations'">Start a conversation in a thread or write a post of your own! Then you'll find your {{ contentType }} here</p>
        <p v-if="contentType === 'Activities'">On this page you will see the activities you've joined! Create your own event or find one you like on the dashboard</p>
     </div>
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