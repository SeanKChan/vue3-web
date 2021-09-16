import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/demo'
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import(/* webpackChunkName: "Demo" */ '@/views/demo/List.vue')
  },
  {
    path: '/demo/:id',
    name: 'DemoEdit',
    component: () => import(/* webpackChunkName: "DemoEdit" */ '@/views/demo/Edit.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
