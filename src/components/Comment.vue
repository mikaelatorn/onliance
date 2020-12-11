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
        console.error(err)
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    },
    sendReport () {
      let hasReported = false
      if (this.comment.reports && this.comment.reports.length) {
        for (var i in this.comment.reports) {
          if (this.comment.reports[i].userId === this.$store.state.currentUser.uid) {
            hasReported = true
            this.$root.$emit('create-alert', { title: 'Comment reported, an Administrator will evaluate the reports as soon as possible!', type: 'success'})
            console.log('we made it here')
            break;
          }
        }
      }
      if (hasReported === false) {
        this.$store.dispatch('reportComment', this.comment).then(res => {
          this.$root.$emit('create-alert', { title: 'Comment reported, an Administrator will evaluate the reports as soon as possible!', type: 'success'})
        }, err => {
          console.error(err)
          this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
        })
      }
    }
  }
}
</script>

