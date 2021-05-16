import './App.css';
import actions from "./shared/action";
import { withRouter } from "react-router-dom";
import {createBrowserHistory} from "history";
import React, { Component } from 'react';
import { List, Avatar, Button } from 'antd';
class App extends Component {
  state = {
    proList: []
  } 
  componentDidMount () {
    // 這裡共享數據, 加上判斷, 便於獨立啟動
    if (window.__POWERED_BY_QIANKUN__) {
      actions.onGlobalStateChange(state => {
        const { buyList } = state;
        // 未登录 - 返回主页
        this.setState({
          proList: buyList
        })
      }, true);
    }
  }
  toChild1() {
   let history =  createBrowserHistory({
      forceRefresh: false, // 是否强制刷新整个页面
    })
    history.push('/qiankun-testchild1/test1');
  }
  delItem(item, list) {
    console.log(list)
    const arr = list.filter(e => e.id !==item.id)
    actions.setGlobalState({ buyList: arr });
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">
          購物車系列
          <List
            itemLayout="horizontal"
            dataSource={this.state.proList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.img} />}
                  title={item.name}
                  description={`单价: ¥${item.price}, 选购数量: ${item.Num} ,总金额: ¥${item.price*item.Num} `}
                />
                 <Button type="primary" danger onClick={this.delItem.bind(this, item, this.state.proList)}>删除</Button>
              </List.Item>
            )}
          />
          <button onClick={this.toChild1}>继续选购</button>  
        </header>
      </div>
    );
  }
  
}

export default withRouter(App);
