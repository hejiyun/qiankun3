import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HelloWord',
    component: HelloWorld
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: '/qiankun-testchild1',
  routes
})

export default router