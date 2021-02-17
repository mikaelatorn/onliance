var adminRoutes = {
  pages: [{
    path: '',
    redirect: 'admin-dashboard'
  }, {
    path: 'admin-dashboard',
    name: 'admin-dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/pages/Admin/Posts.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }, {
    path: 'admin-reports',
    name: 'admin-reports',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/pages/Admin/Reports.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }]
}

export default adminRoutes