<template>
  <div class="products-container">
    <el-row :gutter="10" class="title-row">
      <el-col :xs="24">
        <div class="flex-container">
          <h3>Products</h3>
          <i v-if="products && products.length" class="el-icon-circle-plus edit-profile-icon"></i>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col v-if="!media || media.length === 0" :span="24">
        <el-card class="media-card" shadow="never">
          <h3 v-if="showEdit">+ Add Products</h3>
          <h3 v-else>No special offers</h3>
          <div class="card-overlay">
            <i class="el-icon-circle-plus media-icon" id="first-media-icon"></i>
            <i class="el-icon-circle-plus media-icon" id="second-media-icon"></i>
          </div>
        </el-card>
      </el-col>
      <el-col v-for="p in products" :key="p.id" :xs="12" :sm="6" :md="4" :lg="3">
        <!-- put shit here -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Products',
  props: {
    showEdit: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      products: []
    }
  }
}
</script>
