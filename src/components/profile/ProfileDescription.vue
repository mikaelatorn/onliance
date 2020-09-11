<template>
  <div class="profile-card">
    <el-row :gutter="10" class="title-row">
      <el-col :xs="24">
        <div class="flex-container">
           <h3>About</h3>
          <i v-if="showEdit" class="el-icon-circle-plus edit-profile-icon"></i>
        </div>
      </el-col>
    </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="14" :md="16">
          <el-card shadow="never">
            <div class="flex profile-container">
              <div class="img-container">
                <img class="profile-img" />
              </div>
              <div class="title-container">
                <h2 class="shop-name">Shop name</h2>
                <h4 class="shop-slogan">Slogan here</h4>
              </div>
            </div>
            <p>The brand's playful and imaginative design is widely popular and Mini Sumac is one of Scandinavia’s fastest growing everyone’s wear brands, since 2014 with its own shop in Gothenburg.</p>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="10" :md="8" class="location-card">
          <LocationCard />
        </el-col>
      </el-row>
  </div>
</template>
<script>
import LocationCard from '@/components/profile/LocationCard.vue'

export default {
  name: 'ProfileDescription',
  props: {
    showEdit: {
      default: true,
      type: Boolean
    }
  },
  components: {
    LocationCard
  }
}
</script>
