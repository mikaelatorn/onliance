var publicRoutes = {
  pages: [{
    path: '',
    redirect: 'dashboard'
  }, {
    path: 'dashboard',
    name: 'dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/pages/Dashboard.vue'),
    meta: { requiresAuth: true }
  }, {
    path: 'posts/:id',
    name: 'post',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/pages/Post.vue'),
    meta: { requiresAuth: true }
  }, 
  // {
  //   path: 'activity',
  //   name: 'activity',
  //   component: () =>
  //     import(/* webpackChunkName: "dashboard" */ '@/pages/Activity.vue'),
  //   meta: { requiresAuth: true }
  // },
  {
    path: 'conversations',
    name: 'conversations',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/pages/Conversations.vue'),
    meta: { requiresAuth: true }
  }, {
    path: 'settings',
    name: 'settings',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/pages/Settings.vue'),
    meta: { requiresAuth: true }
  }]
}

export default publicRoutes