import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../pages/Home.vue') },
    { path: '/CreateTask', component: () => import('../pages/CreateTask.vue') },
    { path: '/EditTask/:id', component: () => import('../pages/EditTask.vue') }
  ]
})

export default router