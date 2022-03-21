<template>
	<div class="wrapper">
		<el-card>
			<div style="padding: 10px 0">
				昵称：
				<el-input class="mrb" style="width: 200px" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="nickName" clearable @keydown.enter.native="searchEnterFun"></el-input>
				<el-button class="mrb" type="primary" @click="getUserInfo">搜索</el-button>
				<el-button class="mrb" @click="reset">重置</el-button>
			</div>
			<div style="margin-bottom: 10px">
				<el-button type="primary" @click="addUser"><i class="el-icon-circle-plus"></i>添加</el-button>
				<el-button type="danger" slot="reference"><i class="el-icon-delete-solid"></i>批量删除</el-button>
			</div>
			<el-table :data="userData" stripe style="width: 100%" ref="multipleTable">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="id" label="序号" width="80" align="center">
				</el-table-column>
				<el-table-column prop="nickName" label="用户昵称" width="150" align="center">
				</el-table-column>
				<el-table-column prop="userAvatar" label="用户头像" width="140" align="center">
					<template slot-scope="scope">
						<img :src="scope.row.userAvatar" width="50" height="50" />
					</template>
				</el-table-column>
				<el-table-column prop="email" label="用户邮箱" width="185" align="center"></el-table-column>
				<el-table-column prop="phone" label="用户号码" width="150" align="center"></el-table-column>
				<el-table-column prop="sex" label="用户性别" width="104" align="center">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.sex == 0">男</el-tag>
						<el-tag v-else type="success">女</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="userType" label="用户类型" width="104" align="center">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.userType == 0">管理员</el-tag>
						<el-tag v-else type="success">普通用户</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="roleName" label="用户角色" width="130" align="center"></el-table-column>
				<el-table-column prop="status" label="用户状态" width="140" align="center">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.status == 0">正常</el-tag>
						<el-tag v-else type="danger">禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="con" label="操作" width="400" align="center">
					<template slot-scope="scope">
						<el-button type="warning" icon="el-icon-edit">修改分类状态</el-button>
						<el-button type="success" icon="el-icon-edit">编辑</el-button>
						<el-popconfirm style="margin-left: 8px" confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="你真的确定要删除该数据吗？">
							<el-button type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="pagina">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="this.pageSize"
					layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
			<!-- 添加用户 -->
			<el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd" width="30%">
				<el-form label-width="80px" size="small">
					<el-form-item label="用户名">
						<el-input v-model.trim="addForm.userName" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model.trim="addForm.password" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="角色">
						<el-select clearable v-model="addForm.roleName" @change="changeRoles" filterable allow-create default-first-option placeholder="请选择角色" style="width: 100%">
							<el-option v-for="item in roles" :key="item.name" :label="item.name" :value="item.flag"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model.trim="addForm.email" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input v-model.trim="addForm.phone" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-input v-model.trim="addForm.sex" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
					<el-button type="primary" @click="saveUser">确 定</el-button>
				</div>
				<div v-show="isChange">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span>卡片名称</span>
							<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
						</div>
						<div v-for="o in 4" :key="o" class="text item">
							{{'列表内容 ' + o }}
						</div>
					</el-card>
				</div>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>

export default {
	name: 'User',
	components: {},
	props: {},
	data () {
		return {
			pageNum: 1,
			pageSize: 5,
			total: 0,
			nickName: '',
			userData: [],
			dialogFormVisibleAdd: false,
			addForm: {},
			roles: [{
				name: 'HTML',
				flag: 'HTML'
			}, {
				name: 'CSS',
				flag: 'CSS'
			}, {
				name: 'JavaScript',
				flag: 'JavaScript'
			}],
			isChange: false
		};
	},
	watch: {},
	computed: {},
	methods: {
		// 当每页数据发生改变时触发
		handleSizeChange (val) {
			this.pageSize = val
			this.getUserInfo()
		},
		// 当当前页码发生改变时触发
		handleCurrentChange (val) {
			this.pageNum = val
			this.getUserInfo()
		},
		// 重置输入框
		reset () {
			this.nickName = ''
			this.getUserInfo()
		},
		// 回车搜索
		searchEnterFun (e) {
			//which 和 keyCode 属性提供了解决浏览器的兼容性的方法。
			//keyCode属性返回onkeypress事件触发的键的值的字符代码，或者 onkeydown 或 onkeyup 事件的键的代码
			var keyCode = window.event ? e.keyCode : e.which;
			if (keyCode == 13) {
				//搜索事件
			}
		},
		// 获取用户信息
		getUserInfo () {
			if (this.pageSize <= 0 || this.pageNum <= 0) {
				this.$message.error("请输入正确的分页数据")
				return
			}
			this.http.get("/sysUser/page", {
				params: {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					nickName: this.nickName
				}
			}).then(res => {
				if (res.data.code == 200) {
					// console.log(res)
					this.userData = res.data.data.records
					this.total = res.data.data.total
				}
			})
		},
		// 提交数据
		saveUser () {
			console.log(121212)
			console.log(this.addForm);
		},
		// 添加用户弹窗
		addUser () {
			this.dialogFormVisibleAdd = true
			this.addForm = {}
		},
		changeRoles (e) {
			console.log(222222);
			this.isChange = true
      if(e == ''){
        this.isChange = false
      }
		}
	},
	created () {
		this.getUserInfo()
	},
	mounted () { }
};
</script>
<style lang="less" scoped>
.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
.clearfix:after {
	clear: both;
}

.box-card {
	width: 480px;
}
</style>