<template>
  <div class="media-container">
    <el-row :gutter="10" class="title-row">
      <el-col :xs="24">
        <div class="flex-container">
          <h3>Media</h3>
          <i v-if="media && media.length" class="el-icon-circle-plus edit-profile-icon"></i>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col v-if="!media || media.length === 0" :span="24">
        <el-card class="media-card" shadow="never">
          <h3 v-if="showEdit">+ Add Media</h3>
          <h3 v-else>No special offers</h3>
          <div class="card-overlay">
            <i class="el-icon-circle-plus media-icon" id="first-media-icon"></i>
            <i class="el-icon-circle-plus media-icon" id="second-media-icon"></i>
          </div>
        </el-card>
      </el-col>
      <el-col v-for="m in media" :key="m.id" :xs="12" :sm="6" :md="4" :lg="3">
        <!-- put shit here -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Media',
  props: {
    showEdit: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      media: []
    }
  }
}
</script>
