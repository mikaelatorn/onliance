<template>
    <el-row>
      <TopBar name="My Activity" />
      <div class="inner-row">
        <el-row :gutter="10" class="justify-center">
          <el-col :xs="24" :sm="14" :md="16">
            <div class="flex-container">
              <div class="align-right">
                <el-select @change="changeQuery()" v-model="category" placeholder="Select Category">
                  <el-option
                    v-for="item in pageCategories"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <transition-group name="list-complete" tag="div">
              <div v-for="post in posts" :key="post.title">
                <Post v-if="isInCategory(post) || !$route.query.category || $route.query.category === 'all-activity'" :post="post" :fullView="false" />
              </div>
              <EmptyContent v-if="!posts || posts.length === 0" contentType="Activities" />
            </transition-group>
          </el-col>
        </el-row>
      </div>
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
  data () {
    return {
      pageCategories: [
        {
          value: 'all-activity',
          label: 'All activity'
        },
        {
          value: 'active-posts',
          label: 'Active joined posts'
        },
        {
          value: 'completed-posts',
          label: 'Completed joined posts'
        }
      ],
      category: 'all-activity',
      posts: []
    }
  },
  beforeMount () {
    this.getPostsByParticipation()
  },
  methods: {
    changeQuery () {
      console.log(this.category)
      this.$router.push({ name: 'activity', query: { category: this.category } })
    },
    getPostsByParticipation () {
      this.$store.dispatch('getPostsByParticipation').then(res => {
        console.log(res)
        this.posts = res
      }, err => {
        console.error(err)
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
      })
    },
    isInCategory (post) {
      if (this.category === 'completed-posts' && post.status === 'completed') return true
      else if (this.category === 'active-posts' && post.status === 'active') return true
      return false
    }
  }
}
</script>
