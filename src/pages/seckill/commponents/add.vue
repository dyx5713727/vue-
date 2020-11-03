<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="change"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px">
          <el-select
            v-model="form.first_cateid"
            @change="changeOne"
            placeholder="请选择活动区域"
          >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择活动区域"
            @change="changeTwo"
          >
            <el-option label="--请选择--" value disabled></el-option>

            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="120px">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
        <el-button type="primary" @click="add" v-if="info.title == '添加活动'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqSeckillAdd,
  reqSeckillUpdate,
  reqSeckillDetail,
  reqCateList,
  reqGoodsList,
} from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //分类列表
      list: "classify/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      //二级分类的list
      secondCateList: [],
      //规格属性的list
      goodsList: [],

      value1: [],
    };
  },
  methods: {
    ...mapActions({
      getclassify: "classify/requestClaList",
      getseckillList: "seckill/reqlistAction",
    }),
    change() {
      // console.log(this.value1)
      this.begintime = this.value1[0];
      this.endtime = this.value1[1];
    },
    cancel() {
      this.info.isshow = false;
    },

    //一级分类发生修改
    changeOne() {
      //二级分类的id应该置空
      this.form.second_cateid = "";
      this.getSecondList();
    },
    //根据一级的id来获取二级分类展示列表数据
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
        // console.log(this.secondCateList);
      });
    },
    //根据二级的id来获取商品列表数据
    changeTwo() {
      this.form.goodsid = "";
      this.getgoodList();
    },
    getgoodList() {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goodsList = res.data.list;
        console.log(res);
      });
    },

    empty() {
      (this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      }),
        (this.secondCateList = []);
      //规格属性的list
      this.goodsList = [];

      this.value1 = [];
    },
    //验证
    checked() {
      return new Promise((resolve, reject) => {
        //验证数据是否均不为空
        if (this.form.title === "") {
          alertwaring("活动名称不能为空");
          return;
        }
        if (this.value1.length===0) {
          alertwaring("活动期限不能为空");
          return;
        }
      
         if (this.form.first_cateid === "") {
          alertwaring("一级分类不能为空");
          return;
        }
        if (this.form.second_cateid === "") {
          alertwaring("二级分类不能为空");
          return;
        }
        if (this.form.goodsid === "") {
          alertwaring("商品名字不能为空");
          return;
        }

       
        resolve();
      });
    },
    add() {
      // console.log(this.form);
      //ajax
       this.checked().then(()=>{
      reqSeckillAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.empty();
          this.cancel();
          alertSuccess(res.data.msg);
          //刷list
          this.getseckillList();
        }
      })
      });
    },
    //获取一条的数据
    getOne(id) {
      //发起获取一条数据的请求
      reqSeckillDetail(id).then((res) => {
        //目前form上是没有id字段
        //form上没有id
        // console.log(this.form);
        // console.log(res.data.list);
        // console.log(typeof(res.data.list.begintime));
        let time1 = new Date(res.data.list.begintime * 1);
        let time2 = new Date(res.data.list.endtime * 1);
        this.value1 = [time1, time2];
        this.form = res.data.list;
        // 1.补id
        this.form.id = id;

        // 2.根据一级分类的id 获取二级分类展示的列表
        this.getSecondList();
        //4. 根据规格，获取属性值的列表
        this.getgoodList();
      });
    },
    update() {
      reqSeckillUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          this.empty();
          alertSuccess(res.data.msg);
          this.getseckillList();
        }
      });
    },
  },
  mounted() {
    // 一进来就发起分类请求
    this.getclassify();
  },
};
</script>
<style scoped>
.myUpload {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  position: relative;
}
.myUpload h3 {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
  color: #666;
}
.myUpload .ipt {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
}
.myUpload img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
</style>