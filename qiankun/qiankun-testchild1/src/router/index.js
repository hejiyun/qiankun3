import Vue from 'vue'
import VueRouter from 'vue-router'
import Test1 from '../components/test1.vue'
import Test2 from '../components/test2.vue'
import Test3 from '../components/test3.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/qiankun-testchild1',
    redirect: '/qiankun-testchild1/test1'
  },
  {
    path: '/qiankun-testchild1/test1',
    name: 'Test1',
    component: Test1
  },
  {
    path: '/qiankun-testchild1/test2',
    name: 'Test2',
    component: Test2
  },
  {
    path: '/qiankun-testchild1/test3',
    name: 'Test3',
    component: Test3
  }
]
const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
});

export default router
