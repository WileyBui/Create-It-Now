import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import ProjectSpecific from '../views/ProjectSpecific.vue'
import AllJournalsFromProject from '../views/AllJournalsFromProject.vue'
import SingleTask from '../views/SingleTask.vue'
import PageNotFound from '../views/PageNotFound.vue'
import { auth } from "@/firebaseConfig"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { // connects with the function later in this file.
      requiresAuth: true
    }
  },
  {
    path: '/project/:project_id',
    name: 'ProjectSpecific',
    component: ProjectSpecific,
    meta: { // connects with the function later in this file.
      requiresAuth: true
    }
  },
  {
    path: '/journals/:project_id',
    name: 'AllJournalsFromProject',
    component: AllJournalsFromProject,
    meta: { // connects with the function later in this file.
      requiresAuth: true
    }
  },
  {
    path: '/todo/:id',
    name: 'SingleTask',
    component: SingleTask,
    meta: { // connects with the function later in this file.
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "*",
    name: 'PageNotFound',
    component: PageNotFound
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
    next('/')
  } else {
    next()
  }
})

export default router