<template>
  <el-row class="left-align-container">
    <TopBar name="Profile" />
    <div class="wrapper-container">
        <ProfileDescription />
        <!-- <Media />
        <Products />
        <SpecialOffers /> -->
    </div>
  </el-row>
</template>
<script>
import TopBar from '../components/TopBar'
import ProfileDescription from '@/components/profile/ProfileDescription.vue'
export default {
  components: {
    TopBar,
    ProfileDescription
  }
}
</script>
