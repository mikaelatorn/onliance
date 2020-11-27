<template>
    <el-row>
      <TopBar name="Dashboard" />
      <div class="inner-row">
        <el-row :gutter="10" class="justify-center">
          <el-col :xs="24" :sm="14" :md="16">
            <el-button @click="createPostDialog = true">Create Post</el-button>
            <transition-group name="list-complete" tag="div">
              <Post v-for="post in posts" :key="post.title" :post="post" />
            </transition-group>
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
import Post from '@/components/PostDashboard'
import { mapState } from 'vuex'
export default {
  components: {
    TopBar,
    Post
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
      form: {
        title: '',
        description: '',
        totalParticipants: null,
        category: ''
      }
    }
  },
  beforeMount () {
    this.getPosts()
  },
  methods: {
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
    }
  }
}
</script>
