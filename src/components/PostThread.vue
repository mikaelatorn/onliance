<template>
   <el-card class="forum-card" shadow="never">
      <div class="title-container">
        <h3>{{ post.title }}</h3>
        <p>{{ post.text }}</p>
        <div class="flex-container">
          <div class="flex-container">
            <i class="el-icon-s-comment"></i>
            {{ comments ? comments.length : 0  }}
          </div>
          <div class="align-right">
            <span> 
              {{ post.currentParticipants.length }}
              /
              <span>{{ post.totalParticipants }} People have joined</span>
              <el-button v-if="isAmongCurrentParticipants()" size="small" @click="leavePost()">Leave</el-button>
              <el-button v-else :disabled="post.currentParticipants.length === post.totalParticipants" size="small" @click="joinPost()">Join</el-button>
            </span>
          </div>
        </div>
      </div>
      <div class="time">
        <p>{{ formatDate(post.timestamp.toDate()) }}</p>
      </div>
  </el-card>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    post: {
      type: Object,
      default: () => {}
    },
    getPost: {
      type: Function
    },
    comments: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY HH:mm') 
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
    },
    isAmongCurrentParticipants () {
      for (var i in this.post.currentParticipants) {
        if (this.post.currentParticipants[i] === this.$store.state.currentUser.uid) return true
      }
      return false
    },
    joinPost () {
      console.log(this.post)
      this.$store.dispatch('joinPost', { id: this.$route.params.id }).then(res => {
        this.getPost()
        this.$root.$emit('create-alert', { title: 'Successfully joined posting!', type: 'success'})
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    },
    leavePost () {
      this.$store.dispatch('leavePost', { id: this.$route.params.id }).then(res => {
        this.getPost()
        this.$root.$emit('create-alert', { title: 'Successfully left posting!', type: 'success'})
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    }
  }
}
</script>

