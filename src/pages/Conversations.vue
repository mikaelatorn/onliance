<template>
    <el-row>
      <TopBar name="My Conversations" />
      <Loading v-if="loading" />
      <div class="inner-row">
        <el-row :gutter="10" class="justify-center">
          <el-col :xs="24" :sm="14" :md="16">
            <div class="flex-container">
              <div class="align-right">
                <!-- <el-tooltip class="item" effect="dark" content="This page contains threads you've commented on" placement="top">
                  <i class="el-icon-info info-icon"></i>
                </el-tooltip> -->
              </div>
            </div>
            <transition-group name="list-complete" tag="div">
              <Post v-for="post in posts" :key="post.title" :post="post" :fullView="false" />
            </transition-group>
            <EmptyContent v-if="posts.length === 0 && loaded" contentType="Conversations" />
          </el-col>
        </el-row>
      </div>
    </el-row>
</template>
<script>
import TopBar from '@/components/TopBar'
import Post from '@/components/PostDashboard'
import Loading from '@/components/Loading'
import EmptyContent from '@/components/EmptyContent'
import { setTimeout } from 'timers';
export default {
  components: {
    TopBar,
    Post,
    EmptyContent,
    Loading
  },
  data () {
    return {
      posts: [],
      loading: true
    }
  },
  beforeMount () {
    this.getPostsByComments()
  },
  methods: {
    getPostsByComments () {
      this.$store.dispatch('getPostsByCommentsFromUserId').then(res => {
        setTimeout(() => {
          this.sanitizePosts(res)
        }, 500)
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: err.message, type: 'error'})
      })
    },
    sanitizePosts (posts) {
      let result = posts.filter((post, index, self) =>
        index === self.findIndex((t) => (
          t.id === post.id
        ))
      )
      this.posts = result
      this.loading = false
    }
  }
}
</script>
