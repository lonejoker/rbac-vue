<template>
	<div class="wrapper">
		<div class="header">
			<el-row :gutter="24">
				<el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
					<div class="col">
						<img src="../../assets/image/fangwentongji.png" alt="">
						<div>
							<div class="data" style="color: #6d4dd0;">
								访客
							</div>
							<div class="number">
								<el-tag style="color: #6d4dd0;background-color: #d7cdf6;border-color: #d7cdf6;">
									{{visit}}
								</el-tag>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
					<div class="col">
						<img src="../../assets/image/wenzhang.png" alt="">
						<div>
							<div class="data" style="color: #0068ff;">
								文章
							</div>
							<div class="number">
								<el-tag style="color: #0068ff;background-color: #c0d9fd;border-color: #c0d9fd;">
									{{article}}
								</el-tag>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
					<div class="col">
						<img src="../../assets/image/lilixiangce.png" alt="">
						<div>
							<div class="data" style="color: #ff9ed0">
								相册
							</div>
							<div class="number">
								<el-tag style="color: #ff9ed0;background-color: #ffeaf5;border-color: #ffeaf5;">
									{{picture}}
								</el-tag>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
					<div class="col">
						<img src="../../assets/image/liuyan.png" alt="">
						<div>
							<div class="data" style="color: #fe752e;">
								留言
							</div>
							<div class="number">
								<el-tag type="warning" style="color: #fe752e;background-color: #f4e2da;border-color: #f4e2da;">
									{{message}}
								</el-tag>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
					<div class="col">
						<img src="../../assets/image/user.png" alt="">
						<div>
							<div class="data" style="color: #d81e06;">
								用户
							</div>
							<div class="number">
								<el-tag type="warning" style="color: #d81e06;background-color: #ffcdc6;border-color: #ffcdc6;">
									{{user}}
								</el-tag>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Index',
	components: {},
	props: {},
	data () {
		return {
			visit: 99999,
			article: 99999,
			picture: 99999,
			message: 99999,
			user: 99999,
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
.el-row {
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}
}
.el-col-lg-4-8 {
	width: 20%;
}
.el-col {
	border-radius: 4px;
}
.bg-purple-dark {
	background: #99a9bf;
}

.bg-purple-light {
	background: #e5e9f2;
}
.col {
	border-radius: 10px;
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 0;
	padding: 45px;
  box-shadow: 8px 8px 10px #adadadc4;
}
.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}
.data {
	font-size: 20px;
}
.number {
	font-size: 18px;
	margin-top: 3px;
}
</style>