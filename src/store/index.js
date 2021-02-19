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
    userProfile: {},
    posts: [],
    theme: 'theme--light'
  },
  actions: {
    signup ({ commit }, data ) {
      return new Promise((resolve, reject) => {
        fb.auth.createUserWithEmailAndPassword(data.email, data.password).then(user => {
          commit('setCurrentUser', user.user)
          resolve(user)
        }, err => {
          reject(err)
        })
      })
    },
    signIn ({}, data) {
      return new Promise((resolve, reject) => {
        fb.auth.signInWithEmailAndPassword(data.email, data.password).then(user => {
          resolve(user)
        }).catch(err => {
          reject(err)
        })
      })
    },
    setupAccount({}, data) {
      return new Promise((resolve, reject) => {
        fb.usersCollection.doc(data.user.user.uid).set({
          fullName: data.form.fullName,
          company: data.form.company,
          email: data.form.email
        }).then(() => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    sendConfirmEmail({ state }) {
      return new Promise((resolve, reject ) => {
        state.currentUser.sendEmailVerification().then(function() {
          console.log('Email sent!')
          resolve()
        }).catch(err => {
          console.error(err)
          reject(err)
        });
      })
    },
    sendResetEmail({}, data) {
      return new Promise((resolve, reject) => {
        fb.auth.sendPasswordResetEmail(data).then(() => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    changePassword({}, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        fb.auth.currentUser.updatePassword(data.newPassword).then(() => {
          resolve()
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    deleteAccount({ commit }) {
      return new Promise((resolve, reject) => {
        fb.auth.currentUser.delete().then(() => {
          commit('setCurrentUser', null)
          commit('setUserProfile', {})
          resolve()
        }).catch(err => {
          reject(err)
        });
      })
    },
    validateEmail ({ dispatch }, data) {
      // change this and do it properly
      if (data.email === 'mikaelatornlund@hotmail.se') dispatch('setGod', data)
    },
    setGod ({ dispatch }, data) {
      fb.usersCollection.doc(data.uid).set({
        isGod: true 
      }, { merge: true }).then(() => {
        dispatch('fetchUserProfile')
      }).catch(err => {
        console.error(err)
      })
    },
    fetchUserProfile ({ commit, state }) {
      fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
        console.log('USerprofile', res.data())
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        fb.auth.signOut().then(res => {
          commit('setCurrentUser', null)
          commit('setUserProfile', {})
          resolve(res)
        }).catch(err => {
          reject(err)
        })
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
          timestamp: fb.firebase.firestore.FieldValue.serverTimestamp()
        }).then(res => {
          dispatch('getPosts')
          resolve(res)
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      })
    },
    getPosts ({ commit }) {
      return new Promise((resolve, reject) => {
        fb.postsCollection.orderBy('timestamp', 'desc').get()
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
    getPostById ({}, id) {
      return new Promise((resolve, reject) => {
        fb.postsCollection.doc(id).get()
        .then(function(res) {
          resolve(res.data())
        }).catch(err => {
          reject(err)
        })
      })
    },
    joinPost({ state, dispatch}, post) {
      return new Promise((resolve, reject) => {
        fb.postsCollection.doc(post.id).update({
            currentParticipants: fb.firebase.firestore.FieldValue.arrayUnion(state.currentUser.uid)
        })
        .then(function(res) {
          dispatch('getPosts')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    leavePost({ state, dispatch }, post) {
      return new Promise((resolve, reject) => {
        fb.postsCollection.doc(post.id).update({
          currentParticipants: fb.firebase.firestore.FieldValue.arrayRemove(state.currentUser.uid)
        })
        .then(function(res) {
          dispatch('getPosts')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getCommentsByPostId ({}, id) {
      return new Promise((resolve, reject) => {
        fb.commentsCollection.where("parentId", "==", id)
        .orderBy('timestamp', 'desc').get()
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
    createComment ({ state }, data) {
      return new Promise((resolve, reject) => {
        fb.commentsCollection.add({
          text: data.comment,
          userId: state.currentUser.uid,
          parentId: data.parentId,
          author: state.userProfile.fullName,
          reports: [],
          timestamp: fb.firebase.firestore.FieldValue.serverTimestamp()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getComments ({}) {
      return new Promise((resolve, reject) => {
        fb.commentsCollection.orderBy('timestamp', 'desc').get()
        .then(function(querySnapshot) {
          let comments = []
          querySnapshot.forEach(function(doc) {
            let tempComment = doc.data()
            if (tempComment.reports.length > 0) {
              tempComment.id = doc.id
              comments.push(tempComment)
            }
          });
          resolve(comments)
        }).catch(err => {
          reject(err)
        })
      })
    },
    deleteComment ({}, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        fb.commentsCollection.doc(data.id).delete()
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    reportComment ({ state }, data) {
      return new Promise((resolve, reject) => {
        fb.commentsCollection.doc(data.id).update({
          reports: fb.firebase.firestore.FieldValue.arrayUnion({
            timestamp: moment().format(),
            userId: state.currentUser.uid
          })
        }).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          console.error('we got here', err)
          reject(err)
        })
      })
    },
    getPostsByParticipation ({ state }) {
      // get posts where userid is in participation list
      return new Promise((resolve, reject) => {
        fb.postsCollection.where("currentParticipants", "array-contains", state.currentUser.uid)
        .orderBy('timestamp', 'desc').get()
        .then(function(querySnapshot) {
          let posts = []
          querySnapshot.forEach(function(doc) {
            let tempPost = doc.data()
            tempPost.id = doc.id
            posts.push(tempPost)
          });
          resolve(posts)
        }, err => {
          reject(err)
        })
      })
    },
    getPostsByCommentsFromUserId ({ state }) {
      // get comments where userId = userid
      // get posts where the results is are parent ids
      return new Promise((resolve, reject) => {
        fb.commentsCollection.where("userId", "==", state.currentUser.uid).get()
        .then(function(querySnapshot) {
          let posts = []
          querySnapshot.forEach(function(doc) {
            let id = doc.data().parentId
            fb.postsCollection.doc(id).get()
            .then(res => {
              let tempPost = res.data()
              tempPost.id = res.id
              posts.push(tempPost)
            }, err => {
              reject(err)
            })
          })
          resolve(posts)
        }, err => {
          reject(err)
        })
      })
    },
    deletePost ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        fb.postsCollection.doc(data.id).delete()
        .then(function(res) {
          dispatch('getPosts')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    setPostToCompleted ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        fb.postsCollection.doc(data.id).update({
          status: 'completed'
        }).then(function(res) {
          dispatch('getPosts')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
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
    },
    setTheme(state, theme) {
      state.theme = theme
    }
  },
  modules: {
  }
})
