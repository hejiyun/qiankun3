import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { registerMicroApps, start } from "qiankun"
Vue.config.productionTip = false
Vue.use(ElementUI);

let apps = [
  {
    name: "qiankun-testchild1",
    entry: '//localhost:9725', 
    container: "#subapp",
    activeRule: "/qiankun-testchild1",
    props: {
      name: "kuitos"
    }
  },
  {
    name: "qiankun-testchild2",
    entry: '//localhost:9726', 
    container: "#subapp",
    activeRule: "/qiankun-testchild2",
    props: {
      name: "kuitos"
    }
  }
]
registerMicroApps(apps, 
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },);
  

// 设置默认子应用,与 genActiveRule中的参数保持一致
// setDefaultMountApp("/app1");
//https://github.com/hejiyun/qiankun.git   git地址
// 启动
start();

new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");