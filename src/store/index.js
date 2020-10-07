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
    updateProfile ({ commit, state, dispatch }, form) {
      console.log(form)
      fb.usersCollection.doc(state.currentUser.uid).update({
        profile: {
          avatar: form.image,
          slogan: form.slogan,
          description: form.description
        }
      }).then(res => {
        dispatch('fetchUserProfile')
      }).catch(err => {
        console.log(err)
      })
    }
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
