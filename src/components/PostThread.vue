<template>
   <el-card class="forum-card" shadow="never">
      <div class="title-container">
        <h3>{{ post.title }}</h3>
        <p>{{ post.text }}</p>
        <div class="flex-container">
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

