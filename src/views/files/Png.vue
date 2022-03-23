<template>
	<div class="wrapper">
		<!-- <el-card> -->
			<div style="padding: 10px 0">
				文件名：
				<el-input style="width: 200px" class="mrb"  placeholder="请输入内容" suffix-icon="el-icon-search" v-model.trim="name" clearable @keydown.enter.native="searchEnterFun"></el-input>
				<el-button  class="mrb" type="primary" @click="getFilesInfo">搜索</el-button>
				<el-button class="mrb" @click="reset">重置</el-button>
			</div>
			<div style="margin-bottom: 10px">
				<el-upload action="http://localhost:9999/sysFiles/uploadFile" :show-file-list="false" accept=".png" :on-success="handleFileUploadSuccess" style="display: inline-block">
					<el-button type="primary" class="ml-5">上传文件 <i class="el-icon-top"></i></el-button>
				</el-upload>
				<el-popconfirm style="margin-left: 8px" confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="你真的确定要删除该数据吗？" @confirm="delAll">
					<el-button type="danger" slot="reference"><i class="el-icon-delete-solid"></i>批量删除</el-button>
				</el-popconfirm>
			</div>
			<el-table :data="filesInfo" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" border>
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="序号" width="90" align="center">
				</el-table-column>
				<el-table-column prop="name" label="文件名" width="300" align="center" :formatter="stateFormat">
				</el-table-column>
				<el-table-column prop="type" label="文件类型" width="170" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="上传时间" width="220" align="center">
				</el-table-column>
				<el-table-column prop="size" label="文件大小(kb)" width="210" align="center"></el-table-column>
				<el-table-column prop="download" label="下载" width="180" align="center">
					<template slot-scope="scope">
						<el-button type="primary" @click="download(scope.row.url)">下载</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="enable" label="状态" align="center">
					<template slot-scope="scope">
						<!-- 开0：true，关1：false -->
						<el-switch v-model="scope.row.enable" active-color="#13ce66"  inactive-color="#ff4949" active-value="0" inactive-value="1" @change="filesStateChaged($event,scope.row)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="con" label="操作" width="220" align="center">
					<template slot-scope="scope">
						<el-popconfirm style="margin-left: 8px" confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="你真的确定要删除该数据吗？" @confirm="filesdel(scope.row.id)">
							<el-button type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagina">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.pageNum" :page-size="this.pageSize" :page-sizes="[5, 10, 15, 20]"
					layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		<!-- </el-card> -->
	</div>
</template>

<script>

export default {
	name: 'Png',
	components: {},
	props: {},
	data () {
		return {
			multipleSelection: [], //用于存储选中行数据的集合
			value: true,
			pageNum: 1,
			pageSize: 5,
			type: 'png',
			filesInfo: [],
      name: '',
			total: 0,
		};
	},
	watch: {},
	computed: {},
	methods: {
		getFilesInfo () {
			this.http.get('/sysFiles/getFilesByType', {
				params: {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					name: this.name,
					type: this.type
				}
			}).then(res => {
				this.filesInfo = res.data.data.records
				this.total = res.data.data.total
			})
		},
		filesdel (id) {
			this.http.delete('/sysFiles/delSysFiles/' + id)
				.then(res => {
					if (res.data.code == 200) {
						this.$message.success("删除文件成功");
						this.getFilesInfo()
					} else {
						this.$message.error("删除文件失败");
					}
				})
		},
		handleSelectionChange (val) {
			this.multipleSelection = val
		},
		searchEnterFun (e) {
			//which 和 keyCode 属性提供了解决浏览器的兼容性的方法。
			//keyCode属性返回onkeypress事件触发的键的值的字符代码，或者 onkeydown 或 onkeyup 事件的键的代码
			var keyCode = window.event ? e.keyCode : e.which;
			if (keyCode == 13) {
				this.getFilesInfo()  //搜索事件
			}
		},
		// 格式化表格消息内容
		stateFormat (row, column, cellValue) {
			// console.log(row , column , cellValue)
			if (!cellValue) return "";
			if (cellValue.length > 25) {
				//最长固定显示4个字符
				return cellValue.slice(0, 25) + "...";
			}
			return cellValue;
		},
		delAll () {
			let ids = this.multipleSelection.map(v => v.id) 
			if (ids == "" || ids == null) {
				this.$message.error("请选择要删除的图片");
				return
			}
			this.http.post('/sysFiles/delSysFilesAll/' + ids)
				.then(res => {
					if (res.data.code == 200) {
						this.$message.success("批量删除文件成功");
						this.getFilesInfo()
					} else {
						this.$message.error("批量删除文件失败");
					}
				})
		},
		// 当每页数据发生改变时触发
		handleSizeChange (val) {
			this.pageSize = val
			this.getFilesInfo()
		},
		// 当当前页码发生改变时触发
		handleCurrentChange (val) {
			this.pageNum = val
			this.getFilesInfo()
		},
		reset () {
			this.name = ''
			this.getFilesInfo()
		},
		handleFileUploadSuccess (res) {
			this.$message.success("文件上传成功");
			this.getFilesInfo()
		},
		download (url) {
			window.open(url)
		},
		// 切换状态
		filesStateChaged (e, fileInfo) {
			this.http.put(`/sysFiles/updateStatus?id=${fileInfo.id}&enable=${fileInfo.enable}`)
				.then(res => {
					if (res.data.code == 200) {
						this.$message.success("修改状态成功");
					} else {
						fileInfo.status = !fileInfo.enable;
						return this.$message.error("修改状态失败---原因：", res.data.msg);
					}
				})
		},
	},
	created () {
    this.getFilesInfo()
  },
	mounted () { }
};
</script>
<style lang="less" scoped>
</style>