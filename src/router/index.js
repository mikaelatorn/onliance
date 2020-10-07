import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [{
  path: '',
  component: () =>
    import(
      /* webpackChunkName: "outer" */
      '@/views/OuterView.vue'
    ),
  children: [{
    path: '/',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "outer" */ '../pages/Auth/Login.vue')
  }, {
    path: '/register',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "outer" */ '../pages/Auth/Signup.vue')
  }, {
    path: '/request-reset-password',
    name: 'request-reset',
    component: () =>
      import(/* webpackChunkName: "outer" */ '../pages/Auth/RequestResetPassword.vue')
  }, {
    path: '/reset-password',
    name: 'reset-password',
    component: () =>
      import(/* webpackChunkName: "outer" */ '../pages/Auth/ResetPassword.vue')
  }, {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "outer" */ '../pages/About.vue')
  }]
}, {
  path: '/app',
  component: () =>
    import(
      /* webpackChunkName: "inner" */
      '@/views/InnerView.vue'
    ),
  // meta: { requiresAuth: true },
  // meta: { requiresAuth: true },
  // beforeEnter: (to, from, next) => {
  //   if (store.state.authenticated) {
  //     if (to.query.redirect) {
  //       if (to.query.tab) {
  //         next({ path: to.query.redirect, query: { tab: to.query.tab }, params: { lang: i18n.locale } })
  //       } else {
  //         next({ path: to.query.redirect, params: { lang: i18n.locale } })
  //       }
  //     } else {
  //       next()
  //     }
  //   } else {
  //     checkRedirect(to, next)
  //   }
  // },
  children: [{
    path: '',
    redirect: 'dashboard'
  }, {
    path: 'dashboard',
    name: 'dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue')
    // meta: { requiresAuth: true }
  }, {
    path: 'settings',
    name: 'settings',
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/Settings.vue')
    // meta: { requiresAuth: true }
  }, {
    path: 'profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../pages/Profile.vue')
    // meta: { requiresAuth: true
  }, {
    path: 'public-profile/:id',
    name: 'public-profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../pages/PublicProfile.vue')
    // meta: { requiresAuth: true
  }, {
    path: 'search',
    name: 'search',
    component: () =>
      import(/* webpackChunkName: "search" */ '../pages/Search.vue')
    // meta: { requiresAuth: true }
  }]
}, {
  path: '*',
  redirect: '/app'
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next({
      name: 'login'
    })
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
