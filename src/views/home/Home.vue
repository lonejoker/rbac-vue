<template>
	<el-container>
		<el-aside width="200px">
			<Aside></Aside>
		</el-aside>
		<el-container>
			<el-header>
				<Header></Header>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Aside from '@/components/aside/Aside.vue'
import Header from '@/components/header/Header.vue'
export default {
	name: 'Home',
	components: {
		Aside, Header
	},
	props: {},
	data () {
		return {

		};
	},
	watch: {},
	computed: {},
	methods: {

	},
	created () { },
	mounted () { }
};
</script>
<style lang="less" scoped>
.el-header,
.el-footer {
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	line-height: 60px;
	padding: 0;
}

.el-aside {
	background-color: #333744;
	color: #333;
	// text-align: center;
	// line-height: 200px;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	text-align: center;
	line-height: 160px;
}

body > .el-container {
	margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>