var publicRoutes = {
  pages: [{
    path: '/',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "outer" */ '@/pages/Auth/Login.vue')
  }, {
    path: '/register',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "outer" */ '@/pages/Auth/Signup.vue')
  }, {
    path: '/request-reset-password',
    name: 'request-reset',
    component: () =>
      import(/* webpackChunkName: "outer" */ '@/pages/Auth/RequestResetPassword.vue')
  }, {
    path: '/signup-success',
    name: 'signup-success',
    component: () =>
      import(/* webpackChunkName: "outer" */ '@/pages/Auth/SignupSuccess.vue')
  }, {
    path: '/reset-password',
    name: 'reset-password',
    component: () =>
      import(/* webpackChunkName: "outer" */ '@/pages/Auth/ResetPassword.vue')
  }, {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "outer" */ '@/pages/About.vue')
  }]
}

export default publicRoutes