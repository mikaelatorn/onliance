<template>
    <el-row>
      <TopBar name="Dashboard" />
      <div class="inner-row">
        <el-row :gutter="10" class="justify-center">
          <el-col :xs="24" :sm="14" :md="16">
            <el-card shadow="never">
              <h1>Hello &amp; Welcome to Onliance!</h1>
              <p>This is a alpha application, dashboard information will pop up continuously</p>
              <p><strong>Bare with us and enjoy!</strong></p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-row>
</template>
<script>
import TopBar from '../components/TopBar'
export default {
  components: {
    TopBar
  }
}
</script>
