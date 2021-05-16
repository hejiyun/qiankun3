<template>
  <div class="hello">
    這是個新頁面3
  </div>
</template>

<script>
import actions from "../shared/action";
export default {
  name: 'Test3',
  data () {
    return {
      sendMsg:'',
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
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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