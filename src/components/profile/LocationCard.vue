<template>
  <el-card shadow="never">
    <img>
    <p>Location:
      <span v-if="userProfile.profile && userProfile.profile.location">
        {{ userProfile.profile.location }}
      </span>
    </p>
  </el-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'LocationCard',
  computed: {
    ...mapState([
      'userProfile'
    ])
  },
}
</script>
