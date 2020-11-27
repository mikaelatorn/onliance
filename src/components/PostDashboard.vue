<template>
   <el-card class="forum-card" shadow="never">
      <div class="title-container">
        <h3 @click="goToPage(post)">{{ post.title }}</h3>
        <div class="flex-container">
          <el-button size="mini" class="category-btn" plain :type="getColor(post.category)">{{ post.category }}</el-button>
          <div class="align-right">
            <span> 
              {{ post.currentParticipants.length }}
              /
              <span>{{ post.totalParticipants }} People have joined</span>
              <el-button size="small">Join</el-button>
            </span>
          </div>
        </div>
      </div>
      <div class="time">
        <p>{{ post.createdAt }}</p>
      </div>
  </el-card>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goToPage(post) {
      console.log(post)
      this.$router.push({ name: 'post', params: { id: post.id }})
    },
    getColor(category) {
      if (category === 'Marketing') {
        return 'primary'
      } else if (category === 'Sales') {
        return 'success'
      } else if (category === 'Consignment') {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  }
}
</script>

