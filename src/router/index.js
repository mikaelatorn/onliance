import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import(
      /* webpackChunkName: "outer" */
      '@/views/OuterView.vue'
    ),
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "outer" */ '../pages/Login.vue')
      },
      {
        path: '/register',
        name: 'signup',
        component: () => import(/* webpackChunkName: "outer" */ '../pages/Signup.vue')
      },
      {
        path: '/request-reset-password',
        name: 'request-reset',
        component: () => import(/* webpackChunkName: "outer" */ '../pages/RequestResetPassword.vue')
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import(/* webpackChunkName: "outer" */ '../pages/ResetPassword.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "outer" */ '../pages/About.vue')
      }
    ]
  },
  {
    path: '/app',
    component: () => import(
      /* webpackChunkName: "inner" */
      '@/views/InnerView.vue'
    ),
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
    children: [
      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "about" */ '../pages/Settings.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../pages/Profile.vue')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import(/* webpackChunkName: "search" */ '../pages/Search.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
