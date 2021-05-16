<template>
  <div class="hello">
    <span>这是返回的信息: {{ sendMsg }}</span>
    <button @click="delCount">点击减少</button>
    <span>{{count}}</span>
    <button @click="$router.push('/qiankun-testchild2')">跳轉3</button>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="電器" name="0">
      </el-tab-pane>
      <el-tab-pane label="食品" name="1" >
      </el-tab-pane>
      <el-tab-pane label="服裝" name="2">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import actions from "../shared/action";
export default {
  name: 'HelloWorld',
  data () {
    return {
      sendMsg:'',
      count: 0,
      activeName: '0'
    }
  },
   mounted() {
    // 注册观察者函数
    // onGlobalStateChange 第二个参数为 true，表示立即执行一次观察者函数
    if (window.__POWERED_BY_QIANKUN__) {
      actions.onGlobalStateChange(state => {
        console.log(state)
        const { token } = state;
        // 未登录 - 返回主页
        this.sendMsg = token
      }, true);
    }
    this.curTab()
  },
  methods: {
    delCount() {
      if (!this.sendMsg) return
      this.sendMsg --
      this.count++
      const token1 = this.sendMsg
      // actions.setGlobalState({ token: '项目99'})//改变全局状态
      actions.setGlobalState({ token: token1 });
    },
    curTab() {
      // tab标签栏,初始化时, 调整正确展示位置
      this.activeName = `${ parseInt(this.$router.currentRoute.name.charAt(this.$router.currentRoute.name.length-1)) - 1}`
    },
    handleClick(tab) {
      switch (tab.index) {
        case '0': 
          this.$router.push('/qiankun-testchild1/test1')
          break;
        case '1':
          this.$router.push('/qiankun-testchild1/test2')
          break;
        case '2':
          this.$router.push('/qiankun-testchild1/test3')
          break;
        default:
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>