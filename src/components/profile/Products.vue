<template>
  <div class="products-container">
    <el-row :gutter="10" class="title-row">
      <el-col :xs="24">
        <div class="flex-container">
          <h3>Products</h3>
          <i v-if="userProfile.products && userProfile.products" @click="editProductDialog = true" class="el-icon-circle-plus edit-profile-icon"></i>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col v-if="!userProfile.products || userProfile.products === 0" :span="24">
        <el-card v-if="showEdit" @click="editProductDialog = true" class="media-card cursor-pointer" shadow="never">
          <h3 @click="editProductDialog = true" >+ Add Products</h3>
          <div class="card-overlay">
            <i class="el-icon-circle-plus media-icon" id="first-media-icon"></i>
            <i class="el-icon-circle-plus media-icon" id="second-media-icon"></i>
          </div>
        </el-card>
        <el-card v-else class="media-card" shadow="never">
          <h3>No special offers</h3>
          <div class="card-overlay">
            <i class="el-icon-circle-plus media-icon" id="first-media-icon"></i>
            <i class="el-icon-circle-plus media-icon" id="second-media-icon"></i>
          </div>
        </el-card>
      </el-col>
      <transition-group name="fade" mode="out-in" tag="div">
        <el-col v-for="(p, index) in userProfile.products" v-bind:key="p.name + index" :xs="12" :sm="12" :md="6" :lg="6">
          <el-card class="product-card" :body-style="{ padding: '0px' }">
            <div class="menu-btn">
              <el-dropdown trigger="click" @command="handleCommand($event, p)">
                <el-button icon="el-icon-more" circle></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit" icon="el-icon-edit">Edit</el-dropdown-item>
                  <el-dropdown-item command="delete" icon="el-icon-delete">Delete</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </div>
            <img :src="p.image" class="image product-image">
            <div style="padding: 14px;">
              <span><strong>{{ p.name }}</strong></span>
              <br>
              <small>{{ p.description }}</small>
              <div class="bottom clearfix">
                <time class="time"><small>{{ p.price }}</small></time>
              </div>
            </div>
          </el-card>
        </el-col>
      </transition-group>
    </el-row>
     <!-- Edit dialog -->
    <el-dialog title="Add Product" :visible.sync="editProductDialog">
      <el-form :model="form">
        <el-form-item label="Company Logo/Avatar">
          <!-- <el-input v-model="form.image" autocomplete="off"></el-input> -->
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="newPic"
            :file-list="fileList"
            :disabled="disabled"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Product Name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input
            v-model="form.description"
            textarea
            :rows="2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input v-model="form.price" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editProductDialog = false">Cancel</el-button>
        <el-button type="primary" @click="save()">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Products',
  props: {
    showEdit: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    ...mapState([
      'userProfile'
    ])
  },
  data () {
    return {
      products: [],
      editProductDialog: false,
      form: {
        image: "",
        name: "",
        description: "",
        price: null
      },
      fileList: [],
      disabled: false,
    }
  },
  methods: {
    handleRemove() {
      this.fileList = [];
      this.disabled = false;
    },
    newPic(file) {
      this.fileList = [];
      this.fileList[0] = file;
      this.form.image = file;
      this.disabled = true;
    },
    save () {
      console.log(this.form.image)
      this.$store.dispatch('updateProducts', this.form).then((res) => {
        this.$root.$emit('create-alert', { title: 'Information successfully saved!', type: 'success'})
        this.editProductDialog = false
      }).catch((err) => {
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
        console.error(err)
      })
    },
    handleCommand (command, item) {
      if (command == 'edit') {
        return
      } else {
        this.deleteItem(item)
      }
    },
    deleteItem (item) {
      this.$store.dispatch('deleteProduct', item).then((res) => {
        this.$root.$emit('create-alert', { title: 'Information successfully deleted!', type: 'success'})
      }).catch((err) => {
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
        console.error(err)
      })
    }
  },
}
</script>
