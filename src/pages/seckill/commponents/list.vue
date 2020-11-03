<template>
  <div>
    <el-table
      :data="list"
      style="width: 70%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="活动名称"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <del-btn @confirm="del2(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqSeckillDel } from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
      
    }),
  },
  methods: {
    ...mapActions({
      reqlistAction: "seckill/reqlistAction",
      
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del2(id) {
      //发起请求删除数据
      reqSeckillDel(id).then((res) => {
        if (res.data.code === 200) {
          alertSuccess("删除成功");
          this.reqlistAction();
          
        }
      });
    },
  },
  mounted() {
    this.reqlistAction();
    
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>