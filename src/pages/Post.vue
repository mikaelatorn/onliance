<template>
  <el-row>
    <TopBar name="Post" />
    <div class="inner-row">
      <el-row :gutter="10" class="justify-center">
        <el-col :xs="24" :sm="14" :md="16">
           <Post v-if="post" :post="post" :getPost="getPost" :comments="comments" />
        </el-col>
      </el-row>
      <el-row :gutter="10" class="justify-center comment-input">
        <el-col :xs="24" :sm="14" :md="16">
          <el-card shadow="never">
            <el-input placeholder="Write your comment here" v-model="form.comment">
              <el-button @click="submitComment()" slot="append" icon="el-icon-s-promotion"></el-button>
            </el-input>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="justify-center">
        <el-col :xs="24" :sm="14" :md="16">
          <transition-group name="list-complete" tag="div">
            <Comment v-for="comment in comments" :key="comment.id" :comment="comment" :getComments="getComments"/>
          </transition-group>
        </el-col>
      </el-row>
    </div>
  </el-row>
</template>
<script>
import TopBar from '@/components/TopBar'
import Post from '@/components/PostThread'
import Comment from '@/components/Comment'
import { mapState } from 'vuex'
export default {
  components: {
    TopBar,
    Post,
    Comment
  },
  computed: {
    ...mapState([
      'posts'
    ])
  },
  data () {
    return {
      post: null,
      comments: null,
      form: {
        comment: ''
      }
    }
  },
  beforeMount () {
    this.getPost()
    this.getComments()
  },
  methods: {
    getPost() {
      this.$store.dispatch('getPostById', this.$route.params.id).then(res => {
        console.log(res)
        this.post = res
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: err.message, type: 'error'})
      })
    },
    getComments () {
      this.$store.dispatch('getCommentsByPostId', this.$route.params.id).then(res => {
        console.log('comments', res)
        this.comments = res
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: err.message, type: 'error'})
      })
    },
    submitComment () {
      let object = {
        comment: this.form.comment,
        parentId: this.$route.params.id
      }
      this.$store.dispatch('createComment', object).then(res => {
        console.log(res)
        this.$root.$emit('create-alert', { title: 'Comment submitted!', type: 'success'})
        this.getComments()
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: err.message, type: 'error'})
      })
    }
  }
}
</script>
