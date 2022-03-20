<template>
	<div class="wrapper">
		<div class="header">
			<img src="../../assets/image/logo.png" alt="" class="img">
			<span class="title">xxxx后台管理系统</span>
		</div>
		<el-menu :default-active="$route.path" background-color="#333744" text-color="#fff" style="overflow-x: hidden" :collapse="isCollapse" :collapse-transition="false" router >
			<el-menu-item index="/">
				<i class="iconfont icon-youxiang"></i>
				<span slot="title"><span style="margin-left: 5px">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span></span>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">
					<i class="iconfont icon-youxiang"></i>
					<span style="margin-left: 5px">系统管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/system/user">
						<i class="iconfont icon-youxiang"></i>
						<span style="margin-left: 5px">用户管理</span>
					</el-menu-item>
					<el-menu-item index="/system/role">
						<i class="iconfont icon-youxiang"></i>
						<span style="margin-left: 5px">角色管理</span>
					</el-menu-item>
					<el-menu-item index="/system/menu">
						<i class="iconfont icon-youxiang"></i>
						<span style="margin-left: 5px">权限管理</span>
					</el-menu-item>
					<el-menu-item index="/system/setting">
						<i class="iconfont icon-youxiang"></i>
						<span style="margin-left: 5px">系统设置</span>
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
		</el-menu>
	</div>
</template>

<script>

export default {
	name: 'Aside',
	components: {},
	props: {},
	data () {
		return {
			isCollapse: false,
			icon: 'el-icon-d-arrow-left'
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
.wrapper {
	height: 100vh;
}
.header {
	height: 60px;
	background-color: #333744;
}
.img {
	width: 40px;
	margin: 10px 12px;
	border-radius: 50%;
	box-shadow: 0 0 10px #757575;
	line-height: 60px;
	vertical-align: middle;
}
.el-menu {
	border-right: none !important;
}
.title{
  color: aliceblue;
}
/deep/ .el-menu-item-group__title{
  padding: 0;
}
</style>