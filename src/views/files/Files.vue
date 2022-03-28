<template>
	<div class="wrapper">
		<el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
			<el-tab-pane v-for="item in typeList" :key="item.name" :label="item.label" :name="item.name">
				<Demo v-if="activeName == item.name" :types="activeName" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import Demo from '@/views/files/demo.vue'
export default {
	name: 'Files',
	components: {
		Demo
	},
	props: {},
	data () {
		return {
			activeName: 'jpg',
			typeList: [],
		};
	},
	watch: {},
	computed: {},
	methods: {
		handleClick (tab, event) {
			this.activeName = tab.name
		},
		getTypeList () {
			this.http.get("/sysFiles/getTypeList").then((result) => {
				this.typeList = result.data.data
			}).catch((err) => {
				this.$message.error("获取列表失败", err);
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
/deep/ .el-tabs--border-card > .el-tabs__content {
	padding: 20px;
}
</style>