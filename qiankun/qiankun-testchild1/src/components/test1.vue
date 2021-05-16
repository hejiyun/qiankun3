<template>
  <div class="hello">
    <el-row>
      <el-col :span="8" v-for="(item, index) in buyList" :key="index">
        <el-card class="card-box" :body-style="{ padding: '0px' }">
          <span class="pos-span" v-if="idsList.includes(item.id)">已添加</span>
          <img :src="item.img" class="image">
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
            <div class="bottom clearfix">
              <time class="time"> ¥{{item.price}}</time>
              <el-button type="text" class="button" @click="openBuyDialog(item)">添加购物车</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="targetItem.name"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%">
      <img style="width:100%; height: 188.53px" :src="targetItem.img" alt="">
      <p>单价: ¥{{targetItem.price}}</p>
      <el-input-number v-model="targetItem['Num']" :min="1"></el-input-number>
      <p>总价: ¥{{targetItem.price * targetItem['Num']}} </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendBuy(targetItem)">{{idsList.includes(targetItem.id) ? '确认修改' : '加入购物车'}}</el-button>
        <el-button  @click="close">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import actions from "../shared/action";
export default {
  name: 'Test1',
  data () {
    return {
      sendMsg:'',
      currentDate: new Date(),
      dialogVisible: false,
      targetItem: {
        name: '',
        price: '',
        Num: 1,
        img: ''
      },
      buyList: [
        {
          name: '好吃的汉堡',
          price: '500',
          id: 1,
          img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        },
        {
          name: '蠢驴',
           id: 2,
          price: '5000',
          img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        },
        {
          name: '普通马',
          price: '1500',
           id: 3,
          img: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
        },
        {
          name: '非洲豹',
          price: '50000',
           id: 4,
          img: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
        },
        {
          name: '不知道啥玩意',
          price: '20',
           id: 5,
          img: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
        },
        {
          name: '狐狸',
          price: '4000',
           id: 6,
          img: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
        },
        {
          name: '九尾狐(绝对不是白狐)',
          price: '50000000',
           id: 7,
          img: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
        },
        {
          name: '小悟空',
          price: '9999999999',
          id: 8,
          img: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        },
      ],
      proList: [],
      idsList: [] // 渲染已添加
    }
  },
   mounted() {
    // 注册观察者函数
    // onGlobalStateChange 第二个参数为 true，表示立即执行一次观察者函数
    if (window.__POWERED_BY_QIANKUN__) {
      actions.onGlobalStateChange(state => {
        const { token, buyList } = state;
        // 未登录 - 返回主页
        this.sendMsg = token
        this.proList = buyList
      }, true);
    }
    console.log(this.proList, '商品列表')
    // idsList用于获取当前商品是否被添加
    this.idsList = this.proList.map(e => {return e.id}) 
  },
  methods: {
    openBuyDialog(item) {
      this.dialogVisible = true
      const arr = this.proList.filter(e => e.id === item.id)
      // 判断一下, 当打开添加弹窗时, 已经添加过的, 就提取数据, 没有就初始化
      arr.length ? this.targetItem = {...this.targetItem, ...arr[0]} : this.targetItem = {...this.targetItem, ...item}
    },
    sendBuy(item) {
      let idx
      const arr = this.proList.filter((e, index) => {if(e.id === item.id) {
        idx = index
        return e
      }} )
      // 这里传送存储数据时, 依然判断, 有就修改, 没有则添加
      arr.length ? this.proList.splice(idx,1, item) : this.proList.push(item)
      // 然后把当前商品id添加进标签数组中
      this.idsList.push(item.id)
      actions.setGlobalState({ buyList: this.proList });
      this.close()
    },
    close() {
      this.dialogVisible = false
      // 关闭弹窗清除一下数据
      this.targetItem = {
        name: '',
        price: '',
        Num: 1,
        img: ''
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.targetItem = {
            name: '',
            price: '',
            Num: 1,
            img: ''
          }
          done();
        })
        .catch(() => {});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .card-box {
    position: relative;
  }
  .card-box .pos-span {
    position: absolute;
    top:0;
    right:0;
    display: block;
    width: 50px;
    height: 20px;
    font-size: 14px;
    z-index:999;
    background-color: red;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 188.53px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
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