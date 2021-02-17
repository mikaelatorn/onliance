<template>
    <el-row>
      <TopBar name="Admin Dashboard" />
      <div class="inner-row">
        <el-row :gutter="10" class="justify-center">
          <el-col :xs="24" :sm="24" :md="20">
            <div class="button-container">
              <el-input
                v-model="search"
                width="200"
                placeholder="Type to search"
                class="search-input"
              />
            </div>
                 <el-table
                  :data="reports.filter(data => !search || data.text.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
                  <el-table-column
                    label="Comment"
                    prop="text">
                  </el-table-column>
                  <el-table-column
                    label="Author"
                    prop="author">
                  </el-table-column>
                  <el-table-column
                    label="Comment created"
                    prop="timestamp">
                    <template slot-scope="scope">
                      {{ formatDate(scope.row.timestamp.toDate())}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Reports"
                    prop="reports.length">
                  </el-table-column>
                  <el-table-column
                    label="Latest report">
                    <template slot-scope="scope">
                      {{ formatDate(scope.row.reports[scope.row.reports.length - 1].timestamp)}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="right">
                    <template slot-scope="scope">
                      <el-dropdown @command="handleCommand($event, scope.$index, scope.row)">
                        <span class="el-dropdown-link">
                          <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="view" icon="el-icon-view">View post</el-dropdown-item>
                          <el-dropdown-item command="delete" icon="el-icon-delete">Delete comment</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                </el-table>
          </el-col>
        </el-row>
      </div>
    </el-row>
</template>
<script>
import TopBar from '@/components/TopBar'
import moment from 'moment'
export default {
  components: {
    TopBar
  },
  data () {
    return {
      search: '',
      reports: []
    }
  },
  beforeMount () {
    this.getReports()
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY HH:mm') 
    },
    getReports () {
      this.$store.dispatch('getComments').then(res => {
        console.log(res)
        this.reports = res
      }, err => {
        console.error(err)
      })
    },
    handleCommand (command, index, row) {
      if (command === 'delete') this.handleDelete(index, row)
      else if (command === 'view') this.handleView(index, row)
    },
    handleDelete(index, row) {
      // delete post
      console.log('in delete')
      this.$store.dispatch('deleteComment', row).then(res => {
        this.$root.$emit('create-alert', { title: 'Comment deleted!', type: 'success'})
        this.getReports()
        console.log(res)
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    },
    handleView(index, row) {
      // set post to completed
      this.$router.push({ name: 'post', params: { id: row.parentId }})
      console.log('in view')
    }
  }
}
</script>
