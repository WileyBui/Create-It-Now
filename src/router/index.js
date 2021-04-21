import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import ProjectSpecific from '../views/ProjectSpecific.vue'
import SingleTask from '../views/SingleTask.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
