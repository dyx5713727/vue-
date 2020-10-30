<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input v-model="input" placeholder="请输入用户名" class="ipt"></el-input>
      <el-input v-model="input" placeholder="请输入密码" class="ipt"></el-input>
      <div>
        <el-button type="primary" class="btn" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      input: "",
    };
  },
  methods: {
    login(){
      // this.$router.push('/index')
       this.$router.push('/')
    }
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563443, #2f3d60);
}
.con {
  width: 300px;
  height: 250px;
  background: #fff;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
}
.ipt {
  margin-top: 20px;
 
}
.btn{
  margin-top: 20px;
   width: 200px;
}
/* input{
    margin: 10px;
    width: 260px;
    height: 30px;
    padding-left: 4px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    color: #D2CBD2;
} */

/* .btn{
    background: #409EFF;
    color: #fff;
}

.inp1::placeholder{
        color: #C2C6CF;
} */
</style>