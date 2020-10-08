import Vue from 'vue'
import Vuex from 'vuex'
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
    userProfile: {}
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
  },
  mutations: {
    setCurrentUser (state, val) {
      state.currentUser = val
    },
    setUserProfile (state, val) {
      console.log(val)
      state.userProfile = val
    }
  },
  modules: {
  }
})
