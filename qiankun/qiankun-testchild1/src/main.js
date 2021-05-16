import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import actions from "../src/shared/action";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  // console.log(instance)
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
Vue.config.productionTip = false;

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
let instance = null;
function render(props={}) {
  if (props) {
    // 注入 actions 实例
    actions.setActions(props);
  }
  const { container } = props;
  console.log(container,props,888)
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector("#app2") : "#app2");
}

