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
              <el-button @click="createPostDialog = true">Create Post</el-button>
            </div>
            <el-table
              :data="posts.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column
                label="Title"
                prop="title">
              </el-table-column>
              <el-table-column
                label="Current Participants"
                prop="currentParticipants.length">
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.currentParticipants.length }}
                    /
                    {{ scope.row.totalParticipants }}  
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="Status"
                prop="status">
              </el-table-column>
              <el-table-column
                label="Category"
                prop="category">
                <template slot-scope="scope">
                  <el-button size="mini" class="category-btn" plain :type="getColor(scope.row.category)">{{ scope.row.category }}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="Created"
                prop="timestamp">
                <template slot-scope="scope">
                  {{ formatDate(scope.row.timestamp.toDate())}}
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
                      <el-dropdown-item command="email" icon="el-icon-message">Email participants</el-dropdown-item>
                      <el-dropdown-item command="complete" icon="el-icon-success">Set to complete</el-dropdown-item>
                      <el-dropdown-item command="view" icon="el-icon-view">View post</el-dropdown-item>
                      <el-dropdown-item command="delete" icon="el-icon-delete">Delete post</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <el-dialog title="Create Post" :visible.sync="createPostDialog">
        <el-form :model="form">
          <el-form-item label="Title">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Text/Description">
            <el-input
              v-model="form.text"
              type="textarea"
              :rows="3"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="Category">
            <el-select v-model="form.category" placeholder="Select">
              <el-option
                v-for="item in categories"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Number of participants">
            <el-input-number size="small" v-model="form.totalParticipants"></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createPostDialog = false">Cancel</el-button>
          <el-button type="primary" @click="createPost()">Save</el-button>
        </span>
    </el-dialog>
    </el-row>
</template>
<script>
import TopBar from '@/components/TopBar'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  components: {
    TopBar
  },
  computed: {
    ...mapState([
      'posts'
    ])
  },
  data () {
    return {
      createPostDialog: false,
      categories: [
        {
          value: 'Marketing',
          label: 'Marketing'
        },
        {
          value: 'Consignment',
          label: 'Consignment'
        },
        {
          value: 'Sales',
          label: 'Sales'
        },
        {
          value: 'Other',
          label: 'Other'
        }
      ],
      category: 'All-categories',
      form: {
        title: '',
        description: '',
        totalParticipants: null,
        category: ''
      },
      search: '',
    }
  },
  beforeMount () {
    this.getPosts()
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
    },
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY HH:mm') 
    },
    getPosts () {
      this.$store.dispatch('getPosts').then(res => {
        console.log(res)
      }, err => {
        console.error(err)
      })
    },
    createPost () {
      this.$store.dispatch('createPosts', this.form).then(res => {
        console.log(res)
        this.createPostDialog = false
      }, err => {
        console.error(err)
      })
    },
    handleCommand (command, index, row) {
      if (command === 'complete') this.handleCompleted(index, row)
      else if (command === 'email') this.handleEdit(index, row)
      else if (command === 'delete') this.handleDelete(index, row)
      else if (command === 'view') this.handleView(index, row)
    },
    handleDelete(index, row) {
      // delete post
      console.log('in delete')
      this.$store.dispatch('deletePost', row).then(res => {
        this.$root.$emit('create-alert', { title: 'Post deleted!', type: 'success'})
        console.log(res)
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    },
    handleEdit(index, row) {
      // email participants that the post is full and what to do for the next steps
      console.log('in edit')
    },
    handleCompleted(index, row) {
      // set post to completed
      console.log('in complete')
      this.$store.dispatch('setPostToCompleted', row).then(res => {
        console.log(res)
        this.$root.$emit('create-alert', { title: 'Post status updated!', type: 'success'})
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    },
    handleView(index, row) {
      // set post to completed
      this.$router.push({ name: 'post', params: { id: row.id }})
      console.log('in view')
    }
  }
}
</script>
