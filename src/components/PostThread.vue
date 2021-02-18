<template>
   <el-card class="forum-card" shadow="never">
      <div class="title-container">
        <h3>{{ post.title }}</h3>
        <p>{{ post.text }}</p>
        <div class="flex-container post-details">
          <div class="align-right">
            <span> 
              <div class="flex-container inline-block"><i class="el-icon-s-comment"></i> {{ comments ? comments.length : 0  }}</div>
              <!-- <i class="el-icon-user-solid"></i> -->
              <!-- {{ post.currentParticipants.length }}
              /
              <span>{{ post.totalParticipants }}</span> -->
              <!-- <el-button v-if="isAmongCurrentParticipants()" size="small" @click="leavePost()">Leave</el-button>
              <el-button v-else :disabled="post.currentParticipants.length === post.totalParticipants" size="small" @click="joinPost()">Join</el-button> -->
            </span>
          </div>
        </div>
      </div>
      <div class="time">
        <p>{{ formatDate.full(post.timestamp.toDate()) }}</p>
      </div>
  </el-card>
</template>
<script>
import { formatDate } from '@/config/formatDate.js'
export default {
  data () {
    return {
      formatDate: formatDate
    }
  },
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

