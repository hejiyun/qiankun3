<template>
  <div class="hello">
    <div>
      购物车当前已选购{{proList.length}}类商品,
      <button @click="go('/qiankun-testchild2')">马上下单</button>
    </div>
  </div>
</template>

<script>
import actions from "../shared/action";
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      count: 0,
      proList: []
    }
  },
  mounted() {
     actions.onGlobalStateChange((state) => {
      // state: 变更后的状态; prevState: 变更前的状态
      this.count = state.token
      this.proList = state.buyList
    });
  },
  methods: {
    go(subapp) {
      history.pushState(null, subapp, subapp);
    },
    setMsg() {
      this.count++
      const token = this.count
      actions.setGlobalState({ token });
    },
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