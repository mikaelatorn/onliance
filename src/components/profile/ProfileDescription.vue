<template>
  <div class="profile-card">
    <el-row :gutter="10" class="title-row">
      <el-col :xs="24">
        <div class="flex-container">
          <h3>About</h3>
          <i
            v-if="showEdit"
            @click="editAboutDialog = true"
            class="el-icon-circle-plus edit-profile-icon"
          ></i>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="14" :md="16">
        <el-card shadow="never">
          <div class="flex profile-container">
            <div class="img-container">
              <img v-if="userProfile.profile && userProfile.profile.avatar" :src="userProfile.profile.avatar" class="profile-img" />
              <img v-else class="profile-img" />
            </div>
            <div class="title-container">
              <h2 v-if="userProfile.company" class="shop-name">{{ userProfile.company }}</h2>
              <h2 v-else class="shop-name">Company Name</h2>
              <h4 v-if="userProfile.profile && userProfile.profile.slogan" class="shop-slogan">{{ userProfile.profile.slogan }}</h4>
              <h4 v-else class="shop-slogan">Company slogan</h4>
            </div>
          </div>
          <p v-if="userProfile.profile && userProfile.profile.description">
            {{ userProfile.profile.description }}
          </p>
          <p v-else>Company description</p>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="10" :md="8" class="location-card">
        <LocationCard />
      </el-col>
    </el-row>
    <!-- Edit dialog -->
    <el-dialog title="Company Information" :visible.sync="editAboutDialog">
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
        <el-form-item label="Slogan">
          <el-input v-model="form.slogan" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Company description">
          <el-input
            v-model="form.description"
            textarea
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAboutDialog = false">Cancel</el-button>
        <el-button type="primary" @click="save()">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import LocationCard from "@/components/profile/LocationCard.vue";
import { mapState } from 'vuex'
export default {
  name: "ProfileDescription",
  props: {
    showEdit: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    ...mapState([
      'userProfile'
    ])
  },
  components: {
    LocationCard,
  },
  data() {
    return {
      editAboutDialog: false,
      form: {
        image: "",
        slogan: "",
        description: "",
      },
      fileList: [],
      disabled: false,
    };
  },
  methods: {
    handleRemove() {
      this.fileList = [];
      this.disabled = false;
    },
    newPic(file) {
      this.fileList = [];
      this.fileList[0] = file;
      this.form.image = file.url;
      this.disabled = true;
    },
    save () {
      console.log(this.form.image)
      this.$store.dispatch('updateProfile', this.form).then((res) => {
        this.$root.$emit('create-alert', { title: 'Information successfully saved!', type: 'success'})
        this.editAboutDialog = false
      }).catch((err) => {
        this.$root.$emit('create-alert', { title: 'Something went wrong!', type: 'error'})
        console.error(err)
      })
    },
  },
};
</script>
