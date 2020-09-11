<template>
<el-row class="left-align-container">
    <TopBar name="UserNames Profile" />
    <el-row class="wrapper-container">
      <ProfileDescription :showEdit="false" />
      <Media :showEdit="false" />
      <Products :showEdit="false" />
      <SpecialOffers :showEdit="false" />
    </el-row>
  </el-row>
</template>
<script>
import TopBar from '../components/TopBar'
import ProfileDescription from '@/components/profile/ProfileDescription.vue'
import Media from '@/components/profile/Media.vue'
import Products from '@/components/profile/Products.vue'
import SpecialOffers from '@/components/profile/SpecialOffers.vue'
export default {
  name: 'PublicProfile',
  components: {
    TopBar,
    ProfileDescription,
    Media,
    Products,
    SpecialOffers
  }
}
</script>
