import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
const fb = require('@/firebaseConfig.js')

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: []
  },
  actions: {
    fetchUserProfile ({ commit, state }) {
      fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    },
    clearData ({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
    },
    updateProfileImage ({ state, dispatch }, form) {
      console.log(form)
      if (form.image) {
        fb.storage.child('images/'+ form.image.raw.name).put(form.image.raw).then(res => {
          res.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL)
            form.image = downloadURL
            dispatch('updateProfileNoImage', form)
          })
        }).catch(err => console.log('ERROR', err))
      } else {
        dispatch('updateProfileNoImage', form)
      }
    },
    updateProfileNoImage ({ state, dispatch}, form) {
      fb.usersCollection.doc(state.currentUser.uid).update({
        profile: {
          avatar: form.image,
          slogan: form.slogan,
          description: form.description
        }
      }).then(() => {
        dispatch('fetchUserProfile')
      }).catch(err => {
        console.log(err)
      })
    },
    updateProducts ({ state, dispatch }, form) {
      console.log('form', form)
      fb.storage.child('images/'+ form.image.raw.name).put(form.image.raw).then(res => {
        res.ref.getDownloadURL().then((downloadURL) => {
        form.image = downloadURL
        fb.usersCollection.doc(state.currentUser.uid).update({
            products: fb.firebase.firestore.FieldValue.arrayUnion({
              image: form.image,
              name: form.name,
              description: form.description,
              price: form.price
            })
          }).then(() => {
            dispatch('fetchUserProfile')
          }).catch(err => {
            console.log(err)
          })
        })
      }).catch(err => console.log('ERROR', err))
    },
    deleteProduct ({ state, dispatch }, formVal) {
      console.log(formVal)
      fb.usersCollection.doc(state.currentUser.uid).update({
        products: fb.firebase.firestore.FieldValue.arrayRemove(formVal)
      }).then(() => {
        dispatch('fetchUserProfile')
      }).catch(err => {
        console.log(err)
      })
    },
    createPosts ({ state, dispatch }, form) {
      return new Promise((resolve, reject) => {
        fb.postsCollection.add({
          title: form.title,
          text: form.text,
          userId: state.currentUser.uid,
          postId: '',
          category: form.category,
          totalParticipants: form.totalParticipants,
          currentParticipants: [],
          status: 'active',
          createdAt: moment().format('DD-MM-YYYY HH:mm')
        }).then(res => {
          dispatch('getPosts')
          resolve(res)
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      })
    },
    getPosts ({ commit, state }) {
      return new Promise((resolve, reject) => {
        fb.postsCollection.get()
        .then(function(querySnapshot) {
          let posts = []
          querySnapshot.forEach(function(doc) {
            let tempPost = doc.data()
            tempPost.id = doc.id
            posts.push(tempPost)
          });
          resolve(posts)
          commit('setPosts', posts)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getPostById ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        fb.postsCollection.doc(id).get()
        .then(function(res) {
          resolve(res.data())
        }).catch(err => {
          reject(err)
        })
      })
    },
    getCommentsByPostId ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        fb.commentsCollection.where("parentId", "==", id).get()
        .then(function(querySnapshot) {
          let comments = []
          querySnapshot.forEach(function(doc) {
            let tempComment = doc.data()
            tempComment.id = doc.id
            comments.push(tempComment)
          });
          resolve(comments)
        }).catch(err => {
          reject(err)
        })
      })
    },
    createComment ({ state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        fb.commentsCollection.add({
          text: data.comment,
          userId: state.currentUser.uid,
          parentId: data.parentId,
          author: state.userProfile.fullName,
          createdAt: moment().format('DD-MM-YYYY HH:mm')
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  mutations: {
    setPosts (state, val) {
      state.posts = val
    },
    setCurrentUser (state, val) {
      state.currentUser = val
    },
    setUserProfile (state, val) {
      state.userProfile = val
    }
  },
  modules: {
  }
})
