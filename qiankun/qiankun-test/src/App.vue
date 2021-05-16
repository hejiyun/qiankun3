<template>
  <div id="app">
      <el-container class="main-container">
        <el-header class="main-header">
            <div class="main-logo">qiankun</div>
            <el-dropdown>
            <span class="el-dropdown-link">
              用戶信息<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">首頁</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">退出登錄</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-container class="conten-container">
          <el-aside width="200px">
            <el-menu
              :default-active="activeName"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-menu-item index="2" @click="go('/')">
                <span slot="title" >首頁</span>
              </el-menu-item>
              <el-menu-item index="1" @click="go('/qiankun-testchild1')">
                <span slot="title" >在線商品</span>
              </el-menu-item>
              <el-menu-item index="3" @click="go('/qiankun-testchild2')">
                <span slot="title" >購物車</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main style="padding:0  0 0 10px">
              <keep-alive>
                <router-view/>
              </keep-alive>
              <!-- 子应用盒子 -->
              <div id="subapp" class="app-view-box"></div>
          </el-main>
        </el-container>
      </el-container>
    <!-- loading -->
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    loading: Boolean,
  },
  data() {
    return {
      activeName: '0'
    }
  },
   methods: {
    go(subapp) {
      history.pushState(null, subapp, subapp);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0
}
 #app {
   height: 100%;
   width: 100%;
 }
 .app-view-box, .app-view-box >div, .app-view-box >div #app3,  .app-view-box >div .app2 {
   height: 100%;
   overflow-x:hidden;
   overflow-y:auto ;
 }
 .main-container{
   width: 100%;
   height: 100%;
 }
 .conten-container {
   height: 100%;
   overflow-x: hidden;
   overflow-y: auto;
 }
 .main-header {
   position: relative;
   background-image: linear-gradient(#64a1e6, #9198e5);
   text-align: right;
 }
 .main-header .el-dropdown-link {
   line-height: 60px;
 }
 .main-logo {
   position: absolute;
   top: 50%;
   left:20px;
   transform: translate(0, -50%);
 }
 .el-menu-vertical-demo {
   height: 100%;
   overflow-x:hidden ;
   overflow-y: auto;
 }
</style>
