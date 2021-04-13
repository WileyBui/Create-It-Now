import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../views/Store.vue'
import Files from '../views/Files.vue'
import Auth from '../views/Auth.vue'
import UseAuth from '../views/UseAuth.vue'

import {auth} from '../firebaseConfig.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/files',
    name: 'Files',
    component: Files,
    meta: { // connects with the function later in this file.
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/useauth',
    name: 'UseAuth',
    component: UseAuth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// this makes the router check each change in routes -- if their "meta" says it requires auth, it will check for auth.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/auth')
  } else {
    next()
  }
})

export default router
