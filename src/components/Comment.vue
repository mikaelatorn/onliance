<template>
  <el-card shadow="never" class="comment-card">
    <div class="time">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="$store.state.currentUser.uid === comment.userId" command="delete" icon="el-icon-delete">Delete</el-dropdown-item>
          <el-dropdown-item v-else command="report" icon="el-icon-warning">Report</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <h5>{{ comment.author }}</h5>
    <p class="light-grey">{{ formatDate(comment.timestamp.toDate()) }}</p>
    <p>{{ comment.text }}</p>
  </el-card>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    comment: {
      type: Object,
      default: () => {}
    },
    getComments: {
      type: Function
    }
  },
  methods: {
    formatDate (date) {
      return moment(date).format('DD-MM-YYYY HH:mm') 
    },
    handleCommand(command) {
      if (command === 'delete') this.deleteComment()
      else if (command === 'report') this.sendReport()
    },
    deleteComment () {
      this.$store.dispatch('deleteComment', this.comment).then(res => {
        this.getComments()
        this.$root.$emit('create-alert', { title: 'Comment deleted!', type: 'success'})
      }, err => {
        console.error('Something went wrong')
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    },
    sendReport () {

    }
  }
}
</script>

