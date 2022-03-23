<template>
	<div class="wrapper">
    <el-tabs  v-model="activeName" type="border-card" @tab-click="handleClick" >
      <el-tab-pane v-for="item in typeList" :key="item.name" :label="item.label" :name="item.name">
        <JPG v-if="activeName == 'jpg'"></JPG>
        <PNG v-if="activeName == 'png'"></PNG>
        <Mp4 v-if="activeName == 'mp4'"></Mp4>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import JPG from '@/views/files/Jpg.vue'
import PNG from '@/views/files/Png.vue'
import Mp4 from '@/views/files/Mp4.vue'
export default {
	name: 'Files',
	components: {
    JPG,PNG,Mp4
  },
	props: {},
	data () {
		return {
      activeName: 'png',
      typeList:[],
		};
	},
	watch: {},
	computed: {},
	methods: {
    handleClick(tab, event) {
        this.activeName = tab.name
    },
    getTypeList(){
      this.http.get("/sysFiles/getTypeList").then((result) => {
          this.typeList = result.data.data
      }).catch((err) => {
        this.$message.error("获取列表失败",err);
      });
    },
	},
	created () {
    this.getTypeList()
  },
	mounted () { }
};
</script>
<style lang="less" scoped>
/deep/ .el-tabs--border-card>.el-tabs__content{
  padding: 20px;
}
</style>