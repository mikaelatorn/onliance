import * as firebase from 'firebase/app';
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: 'AIzaSyAoLGw0Sp5lM3tePc9_DIY6wRPV39MaDkE',
  authDomain: 'onliance-2aa0b.firebaseapp.com',
  databaseURL: 'https://onliance-2aa0b.firebaseio.com',
  projectId: 'onliance-2aa0b',
  storageBucket: 'onliance-2aa0b.appspot.com',
  messagingSenderId: '23668773382',
  appId: '1:23668773382:web:52646ba9fec4edf40f6987',
  measurementId: 'G-G9JQF37VWQ'
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const storage = firebase.storage().ref();
// firebase collections
const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  storage,
  firebase
  // postsCollection,
  // commentsCollection,
  // likesCollection
}
