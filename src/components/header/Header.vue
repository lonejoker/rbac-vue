<template>
	<div class="wrapper">
		<el-row>
			<el-col :span="24">
				<el-row>
					<el-col :span="13" style="background-color: coral;">
						<div class="crumb">
							<Breadcrumb></Breadcrumb>
						</div>
					</el-col>
					<el-col :span="11" style="background-color: #c1c7fb;">
						<div class="info">
							<el-menu mode="horizontal" background-color="#373d41" text-color="#fff" active-text-color="#ffd04b">
								<el-submenu index="1">
									<template slot="title"><img src="../../assets/image/logo.png" width="50" height="50" />1212</template>
									<el-menu-item>个人资料</el-menu-item>
									<el-menu-item @click="logout">退出</el-menu-item>
								</el-submenu>
							</el-menu>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue'
export default {
	name: 'Header',
	components: {
		Breadcrumb
	},
	props: {},
	data () {
		return {

		};
	},
	watch: {},
	computed: {},
  methods: {
    logout() {
      this.http
          .post("/user/logout")
          .then((result) => {
						this.$message.success("退出成功！！！");
            localStorage.clear();
						this.$router.push("/login");
            // resetroute()
          })
          .catch((err) => {
						this.$message.error("退出失败！！！");
						this.$message.error()
            console.log(err);
          });
    },
  },
	created () { },
	mounted () { }
};
</script>
<style lang="less" scoped>
.crumb {
	float: left;
	margin: 0 15px;
}
.info {
	float: right;
	height: 60px;
	margin: 0 25px;
}
.img {
	width: 40px;
	margin: 10px 12px;
	border-radius: 50%;
	box-shadow: 0 0 10px #757575;
	vertical-align: middle;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
	line-height: 0;
}
</style>