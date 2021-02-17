<template>
   <el-card class="forum-card" shadow="never">
      <div class="title-container">
        <div>
          <h3 @click="goToPage(post)">{{ post.title }} </h3>
        </div>
        <div class="flex-container post-details">
          <el-button @click="callChangeCategory()" size="mini" class="category-btn" plain :type="getColor.tag(post.category)">{{ post.category }}</el-button>
          <div class="align-right">
            <span> 
              <div class="flex-container inline-block"><i class="el-icon-s-comment"></i> {{ comments.length }}</div>
              <i class="el-icon-user-solid"></i>
              {{ post.currentParticipants.length }}
              /
              <span>{{ post.totalParticipants }}</span>
              <span v-if="fullView">
                <el-button v-if="isAmongCurrentParticipants()" class="join-btn" size="mini" @click="leavePost()">Leave</el-button>
                <el-button v-else :disabled="post.currentParticipants.length === post.totalParticipants" class="join-btn" size="mini" @click="joinPost()">Join</el-button>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="time">
        <p>{{ formatDate.full(post.timestamp.toDate())}}</p>
      </div>
  </el-card>
</template>
<script>
import { getColor } from '@/config/colorPicker.js'
import { formatDate } from '@/config/formatDate.js'
export default {
  props: {
    post: {
      type: Object,
      default: () => {}
    },
    changeCategory: {
      type: Function,
      default: () => {}
    },
    fullView: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      comments: [],
      getColor: getColor,
      formatDate: formatDate
    }
  },
  beforeMount () {
    this.getComments()
  },
  methods: {
    getComments () {
      this.$store.dispatch('getCommentsByPostId', this.post.id).then(res => {
        console.log('comments', res)
        this.comments = res
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    },
    goToPage(post) {
      console.log(post)
      this.$router.push({ name: 'post', params: { id: post.id }})
    },
    isAmongCurrentParticipants () {
      for (var i in this.post.currentParticipants) {
        if (this.post.currentParticipants[i] === this.$store.state.currentUser.uid) return true
      }
      return false
    },
    callChangeCategory () {
      this.$emit('change-category', this.post.category);
    },
    joinPost () {
      console.log(this.post)
      this.$store.dispatch('joinPost', this.post).then(res => {
        console.log(res)
        this.$root.$emit('create-alert', { title: 'Successfully joined posting!', type: 'success'})
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    },
    leavePost () {
      this.$store.dispatch('leavePost', this.post).then(res => {
        console.log(res)
        this.$root.$emit('create-alert', { title: 'Successfully left posting!', type: 'success'})
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    }
  }
}
</script>

