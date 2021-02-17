import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import { store } from '@/store';
import publicRoutes from '@/config/publicRoutes';
import privateRoutes from '@/config/privateRoutes';
import adminRoutes from '@/config/adminRoutes';

Vue.use(VueRouter)

const routes = [{
  path: '',
  component: () =>
    import(
      /* webpackChunkName: "outer" */
      '@/views/OuterView.vue'
    ),
  children: publicRoutes.pages
}, {
  path: '/app',
  component: () =>
    import(
      /* webpackChunkName: "inner" */
      '@/views/InnerView.vue'
    ),
  children: privateRoutes.pages
}, {
  path: '/admin',
  component: () =>
    import(
      /* webpackChunkName: "inner" */
      '@/views/InnerView.vue'
    ),
  children: adminRoutes.pages
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
  const requiresAdmin = to.matched.some(x => x.meta.requiresAdmin)

  if (requiresAuth && requiresAdmin && store.state.userProfile.isGod) {
    next()
  } else if (requiresAuth && !currentUser) {
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
