<template>
	<div class="wrapper">
		<div class="main">
			<!-- 整个注册盒子 -->
			<div class="loginbox">
				<!-- 左侧的注册盒子 -->
				<div class="loginbox-in">
					<div class="xblo">小白后台管理系统</div>
					<el-form :model="loginParam" :rules="rules" ref="loginForm" label-width="0px">
						<div class="userbox">
							<span class="iconfont icon-200yonghu_yonghu" style="margin-right: 6px;"></span>
							<el-form-item prop="userName">
								<el-input v-model="loginParam.userName" placeholder="用户名"></el-input>
							</el-form-item>
						</div>
						<br />
						<div class="pwdbox">
							<span class="iconfont icon-key1"></span>
							<el-form-item prop="password">
								<el-input type="password" v-model="loginParam.password" placeholder="密码"></el-input>
							</el-form-item>
						</div>
						<br />
					</el-form>
					<div class="log-box">
						<div class="log-box-text">忘记密码</div>
						<button type="primary" class="login_btn" @click="submitLoginForm('loginForm')">
							登录
						</button>
					</div>
					<br />
					<div class="warn">@zybfsyqs</div>
					<button type="primary" class="register_btn" @click="register">
						若无账号请点击注册
					</button>
				</div>

				<!-- 右侧的注册盒子 -->
				<div class="background">
					<div class="title">
						Welcome to XB System Management Center
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!--
https://gitee.com/wx_f6a2d8acc5/student-management-system/tree/main
https://www.cnblogs.com/debugf/p/13395349.html
-->
<script>
import register from '@/views/register/Register.vue'
export default {
	name: 'login',
	components: {
		register
	},
	props: {},
	data () {
		return {
			loginParam: {
				userName: 'xb',
				password: '1',
			},
			rules: {
				userName: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 2, max: 32, message: '请输入2-20位字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 1, max: 32, message: '请输入1-32位字符', trigger: 'blur' }
				]
			}
		}
	},
	watch: {},
	computed: {},
	methods: {
		open1 () {
			this.$myMsg.notify({
				content: "登录成功",
				type: 'success',
				time: 3000
			});
		},
		submitLoginForm (formName) {
			this.$refs[formName].validate(async valid => {
				if (valid) {
					// console.log(this.loginParam)
					const { data: res } = await this.http.post(
						"/user/login",
						this.loginParam
					);
					// console.log(res);
					if (res.code !== 200) {
						this.$message.error("登录失败！", res.msg)
					} else {
						localStorage.setItem("token", res.data.token)
						localStorage.setItem("userInfo", JSON.stringify(res.data.user))
						localStorage.setItem("roles", JSON.stringify(res.data.roles))
						this.open1()
						this.$router.push({ path: "/" });
					}
				} else {
					this.$message.error('请输入账号和密码')
					this.loginParam = {}
					return false
				}
			})
		},
		register () {
			this.$router.push({ path: "/register" });
		},
	},
	created () { },
	mounted () { }
}
</script>
<style lang="less" scoped>
// .wrapper {
// 	height: 100%;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// }
.wrapper {
	height: 100%;
	width: 100%;
	background-color: #becfca !important;
}
.el-input /deep/ .el-input__inner {
	width: 95%;
	background-color: #fff0 !important;
	border-radius: 50px;
	height: 30px;
}
/deep/ .el-form-item__content {
	line-height: 0;
}
.manage {
	align-items: center;
	justify-content: center;
	display: flex;
	padding-top: 130px;
	font-size: 30px;
}
.loginbox {
	display: flex;
	position: absolute;
	width: 800px;
	height: 400px;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 #4e655d;
}
.loginbox-in {
	background-color: #89ab9e;
	width: 240px;
	position: relative;
}
.userbox {
	margin-top: 120px;
	height: 30px;
	width: 228px;
	display: flex;
	margin-left: 18px;
}
.pwdbox {
	height: 30px;
	width: 228px;
	display: flex;
	margin-left: 18px;
}

.background {
	width: 570px;
	background-image: url("../../assets/image/bg.png");
	background-size: cover;
	font-family: sans-serif;
}
.title {
	margin-top: 320px;
	margin-left: 20px;
	font-weight: bold;
	font-size: 20px;
	color: #4e655d;
}
.title:hover {
	font-size: 21px;
	transition: all 0.4s ease-in-out;
	cursor: pointer;
}
.uesr-text {
	position: left;
}
input {
	outline-style: none;
	border: 0;
	border-bottom: 1px solid #e9e9e9;
	background-color: transparent;
	height: 20px;
	width: 186px;
	font-family: sans-serif;
	font-size: 15px;
	color: #445b53;
	font-weight: bold;
}
/* input::-webkit-input-placeholder{
    color:#E9E9E9;
 } */
input:focus {
	border-bottom: 2px solid #445b53;
	background-color: transparent;
	transition: all 0.2s ease-in;
	font-family: sans-serif;
	font-size: 15px;
	color: #445b53;
	font-weight: bold;
}
input:hover {
	border-bottom: 2px solid #445b53;
	background-color: transparent;
	transition: all 0.2s ease-in;
	font-family: sans-serif;
	font-size: 15px;
	color: #445b53;
	font-weight: bold;
}

input:-webkit-autofill {
	/* 修改默认背景框的颜色 */
	box-shadow: 0 0 0px 1000px #89ab9e inset !important;
	/* 修改默认字体的颜色 */
	-webkit-text-fill-color: #445b53;
}

input:-webkit-autofill::first-line {
	/* 修改默认字体的大小 */
	font-size: 15px;
	/* 修改默认字体的样式 */
	font-weight: bold;
}
.log-box {
	font-size: 12px;
	display: flex;
	justify-content: space-between;
	width: 190px;
	margin-left: 30px;
	color: #4e655d;
	// margin-top: -5px;
	align-items: center;
}
.log-box-text {
	color: #4e655d;
	font-size: 12px;
	text-decoration: underline;
}
.login_btn {
	background-color: #5f8276; /* Green */
	border: none;
	color: #fafafa;
	padding: 5px 22px;
	text-align: center;
	text-decoration: none;
	font-size: 13px;
	border-radius: 20px;
	outline: none;
}
.login_btn:hover {
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
		0 17px 50px 0 rgba(0, 0, 0, 0.19);
	cursor: pointer;
	background-color: #0b5137;
	transition: all 0.2s ease-in;
}

.warn {
	margin-top: 60px;
	/* margin-right:120px; */
	margin-left: 30px;
	margin-bottom: 5px;
	font-weight: bold;
	font-size: 17px;
}

.register_btn {
	background-color: transparent; /* Green */
	border: none;
	text-decoration: none;
	font-size: 12px;
	/* border-radius: 20px;   */
	color: #4e655d;
	font-size: 12px;
	text-decoration: underline;
	display: flex;
	margin-left: 25px;
	outline: none;
}
.register_btn:hover {
	font-weight: bold;
	cursor: pointer;
}

.iconfont {
	font-family: "iconfont" !important;
	font-size: 20px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 22px;
	color: #4e655d;
	margin-right: 5px;
	// margin-left: -10px;
	margin-top: 5px;
}

.icon-key:before {
	content: "\e775";
}

.icon-account:before {
	content: "\e817";
}
</style>
