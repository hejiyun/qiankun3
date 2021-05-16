import { initGlobalState } from "qiankun";
import {buy} from './modules/buy'

const initialState = {
  // 这里添加要共享存储的基本信息
  ...buy
};
const actions = initGlobalState(initialState);

export default actions;