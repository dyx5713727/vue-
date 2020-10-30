<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
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
          <el-select v-model="form.second_cateid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>

            <el-option
              v-for="item in secondCatelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <div class="myUpload">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeFile"
            />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="form.specsid" @change="changeSpec">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性" label-width="120px">
          <!-- multiple 表单中下拉菜单、input的type是file ,想要多选，设置 -->
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="S" value="1"></el-option>
            <el-option label="M" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="120px">
          <el-input
            type="textarea"
            v-model="form.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加分类'"
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
  reqGoodsAdd,
  reqCateList,
  reqGoodsUpdate,
  reqGoodsDetail,
} from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //分类列表
      list: "classify/list",
      specslist: "spces/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //发起请求之前需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      //二级分类的list
      secondCatelist: [],
      //规格属性的list
      attrlist: [],
    };
  },
  methods: {
    ...mapActions({
      //请求分类的list
      getClassifyList: "classify/requestClaList",
      //获取的规格的列表
      getSpecList: "spces/reqlistAction",
    }),
    cancel() {
      this.info.isshow = false;
    },
    //一级分类发生修改
    changeOne(id) {
      //二级分类的ID应该置空
      this.form.second_cateid = "";
      //g根据一级分类ID获取二级分类展示的列表数据
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCatelist = res.data.list;
      });
    },
    //商品规格发生改变
    changeSpec() {
      form.specsid=specslist
      //取出this.speclist里面的ID是form.specsid的那条数据
    },
    changeFile(e) {
      let file = e.target.files[0];
      // console.log(file);
      if (file.size > 2 * 1024 * 1024) {
        alertwaring("文件大小不能超过2m");
        return;
      }
      let arr = [".jpg", ".png", ".gif", ".jpeg"];
      if (!arr.includes(file.name.slice(file.name.lastIndexOf(".")))) {
        alertwaring("请上传正确的图片格式");
      }
      //将文件file转为一个地址
      this.imgUrl = URL.createObjectURL(file);

      //给form的img赋值文件
      this.form.imgUrl = file;
    },
    // changePid() {
    //   if (this.form.pid == 0) {
    //     this.form.type = 1;
    //   } else {
    //     this.form.type = 2;
    //   }

    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //发起请求之前需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
    },
    add() {
      console.log(this.form);
    },
    //获取一条的数据
    getOne(id) {
      //发起获取一条数据的请求
      reqCateDetail(id).then((res) => {
        //目前form上是没有id字段
        this.form = res.data.list;
        // console.log(res);
        //补id
        this.form.id = id;
        //给图片赋值
        this.imgUrl = this.$imgPre + this.form.img;
      });
    },
    update() {
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      // console.log(this.form);
      reqCateUpdate(data).then((res) => {
        if (res.data.code === 200) {
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //弹成功
          alertSuccess(res.data.msg);
          //刷新list
          this.reqList();
        } else {
          alertwaring(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 一进来就发起分类请求
    this.getClassifyList();
    //规格请求
    this.getSpecList(true);
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