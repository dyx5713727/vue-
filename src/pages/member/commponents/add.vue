<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- <el-button type="primary" @click="add" v-if="info.title == '添加菜单'"
          >添 加</el-button
        > -->
        <el-button type="primary" @click="update" >修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { indexRouters } from "../../../router/index";
import {
  reqMenuAdd,
  reqMenuList,
  reqMenberUpdate,
  reqMenberDetail,
} from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info", "list"],
  components: {},
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",

        status: 1,
      },
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
    },
    // changePid() {
    //   if (this.form.pid == 0) {
    //     this.form.type = 1;
    //   } else {
    //     this.form.type = 2;
    //   }
    
    empty() {
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",

        status: 1,
      };
    },
    // add() {
    //   reqMenuAdd(this.form).then((res) => {
    //     console.log(res);
    //     if (res.data.code == 200) {
    //       this.cancel();
    //       alertSuccess(res.data.msg);
    //       //重置form
    //       this.empty();
    //       //刷新list数据
    //       this.$emit("init");
    //     } else {
    //       alertwaring(res.data.msg);
    //     }
    //   });
    // },
    //获取一条的数据
    getOne(uid) {
      //发起获取一条数据的请求
      reqMenberDetail(uid).then((res) => {
        //目前form上是没有id字段
        this.form = res.data.list;
        // console.log(res);
        //补id
        // this.form.id = id;
      });
    },
    update() {
      // console.log(this.form);
      reqMenberUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //弹成功
          alertSuccess(res.data.msg);
          //刷新list
          this.$emit("init");
        } else {
          alertwaring(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>