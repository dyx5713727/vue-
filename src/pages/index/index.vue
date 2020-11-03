<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
               
              </el-menu-item-group>
            </el-submenu>

            <!-- 没有目录 -->
            <el-menu-item :index="item.url" v-else>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>

        
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="a">
            <p>欢迎用户 {{ userInfo.username }} 登录</p>
          </div>

          <el-button type="danger" @click="logOut">退出登录</el-button>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    //退出登录
    logOut() {
      this.changeUserInfoAction({});
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  /* padding-top: 10px; */
}
.el-header el-button {
  margin-bottom: 10px;
}
.con {
  padding-top: 20px;
}
.a {
  height: 50px;
  font-size: 16px;

  margin-top: 15px;
}
</style>