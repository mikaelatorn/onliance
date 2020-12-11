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
    signup ({ commit, dispatch }, data ) {
      return new Promise((resolve, reject) => {
        fb.auth.createUserWithEmailAndPassword(data.email, data.password).then(user => {
          commit('setCurrentUser', user.user)
          resolve(user)
        }, err => {
          reject(err)
        })
      })
    },
    sendConfirmEmail({ state, dispatch }) {
      return new Promise((resolve, reject ) => {
        state.currentUser.sendEmailVerification().then(function() {
          // Email sent.
          console.log('Email sent!')
          resolve()
        }).catch(function(err) {
          // An error happened.
          console.error(err)
          reject(err)
        });
      })
    },
    validateEmail ({ dispatch }, data) {
      console.log(data.email)
      if (data.email === 'mikaelatornlund@hotmail.se') dispatch('setGod', data)
    },
    setGod ({ dispatch }, data) {
      console.log('UID', data.uid)
      fb.usersCollection.doc(data.uid).set({
        isGod: true 
      }, { merge: true }).then(() => {
        console.log('complete')
        dispatch('fetchUserProfile')
      }, err => {
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
        }, err => {
          reject(err)
        })
      })
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
    getPosts ({ commit, state }) {
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
    leavePost({ state, dispatch}, post) {
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
    getCommentsByPostId ({ commit, state }, id) {
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
    createComment ({ state, dispatch }, data) {
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
    getComments ({ commit, state }, id) {
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
    deleteComment ({ state, dispatch}, data) {
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
    reportComment ({ state, dispatch }, data) {
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
    getPostsByParticipation ({ state, dispatch }) {
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
    getPostsByCommentsFromUserId ({ state, dispatch }) {
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
    }
  },
  modules: {
  }
})
