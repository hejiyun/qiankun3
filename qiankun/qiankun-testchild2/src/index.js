import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import actions from "../src/shared/action";
import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';

function render(props={}) {
  if (props) {
    // 注入 actions 实例
    actions.setActions(props);
  }
  const { container } = props;

    ReactDOM.render( <BrowserRouter><App /></BrowserRouter>, container ? container.querySelector('#app3') : document.getElementById('app3'));
  
}
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

if(!window.__POWERED_BY_QIANKUN__) {
  console.log('123123')
  // 子应用独立执行时
  render()
}
export async function bootstrap(props) {
  console.log('react app bootstraped');
}
export async function mount(props) {
  render(props)
}
export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(props.container ? props.container.querySelector('#app3') : document.getElementById('app3'));
}
