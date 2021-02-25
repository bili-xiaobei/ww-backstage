<template>
    <div class="el_main">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <!-- 搜索添加区域 -->
            <div class="el_search">
                <el-input placeholder="请输入内容 - 回车查询" v-model="searchInput" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                <!-- 添加用户的对话框 -->
                <template>
                    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="600px" :show-close="false" destroy-on-close :close-on-click-modal="false">
                    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item prop="username" label="用户：">
                            <el-input v-model="addForm.username" prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码：">
                            <el-input v-model="addForm.password" prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>
                        <el-form-item prop="qq" label="QQ：">
                            <el-input v-model="addForm.qq" prefix-icon="el-icon-chat-dot-round"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone" label="电话：">
                            <el-input v-model="addForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
                        </el-form-item>
                        <el-form-item prop="sex" label="性别：">
                            <el-radio-group v-model="addForm.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="role" label="权限：">
                            <el-select v-model="addForm.role" placeholder="请选择用户权限">
                                <el-option label="超级管理员" value="超级管理员"></el-option>
                                <el-option label="管理员" value="管理员"></el-option>
                                <el-option label="特权用户" value="特权用户"></el-option>
                                <el-option label="普通用户" value="普通用户"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="isOnLine" label="在线：">
                            <el-switch v-model="addForm.isOnLine"></el-switch>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="clearValidate()">取 消</el-button>
                        <el-button type="primary" @click="addUser()">确 定</el-button>
                    </span>
                    </el-dialog>
                </template>
            </div>
            <!-- 表格区域 -->
            <template>
                <el-table border :data="userList" stripe>
                    <el-table-column align="center" type="index" label="#" width="50"></el-table-column>
                    <el-table-column align="center" prop="username" label="姓名"></el-table-column>
                    <el-table-column align="center" prop="sex" label="性别"></el-table-column>
                    <el-table-column align="center" prop="phone" label="电话"></el-table-column>
                    <el-table-column align="center" prop="qq" label="QQ"></el-table-column>
                    <el-table-column align="center" prop="role" label="角色"></el-table-column>
                    <el-table-column align="center" prop="isOnLine" label="状态">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isOnLine" @change="changeOnLint(scope.row.uid, scope.row.isOnLine)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="150">
                        <template slot-scope="scope">
                            <!-- 修改 -->
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateUserBtn(scope.row.uid)"></el-button>
                            <!-- 删除 -->
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.uid)"></el-button>
                            <!-- 分配权限 -->
                            <!-- <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                                <el-button type="success" icon="el-icon-setting" size="mini" @click="setUser(scope.row.uid)"></el-button>
                            </el-tooltip> -->
                            <el-dialog title="修改用户信息" :visible.sync="updateDialogVisible" width="500px" style="text-align: left !important" :close-on-click-modal="false">
                                <el-form :model="updateForm" :rules="addFormRules" ref="updateFormRef" label-width="70px">
                                    <el-form-item prop="username" label="用户：">
                                        <el-input v-model="updateForm.username" prefix-icon="el-icon-user"></el-input>
                                    </el-form-item>
                                    <!-- <el-form-item prop="password" label="密码：">
                                        <el-input v-model="updateForm.password" prefix-icon="el-icon-lock"></el-input>
                                    </el-form-item> -->
                                    <el-form-item prop="qq" label="QQ:">
                                        <el-input v-model="updateForm.qq" prefix-icon="el-icon-chat-dot-round"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="phone" label="电话：">
                                        <el-input v-model="updateForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="sex" label="性别：">
                                        <el-radio-group v-model="updateForm.sex">
                                            <el-radio label="男"></el-radio>
                                            <el-radio label="女"></el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item prop="role" label="权限：">
                                        <el-select v-model="updateForm.role" placeholder="请选择用户权限">
                                            <el-option label="超级管理员" value="超级管理员"></el-option>
                                            <el-option label="管理员" value="管理员"></el-option>
                                            <el-option label="特权用户" value="特权用户"></el-option>
                                            <el-option label="普通用户" value="普通用户"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="isOnLine" label="在线：">
                                        <el-switch v-model="updateForm.isOnLine"></el-switch>
                                    </el-form-item>
                                </el-form>
                                <span slot="footer">
                                    <el-button @click="updataClearValidate()">取 消</el-button>
                                    <el-button type="primary" @click="updateUser()">确 定</el-button>
                                </span>
                            </el-dialog>
                        </template>
                    </el-table-column>
                    
                </el-table>
            </template>

            <!-- 分页区域 -->
            <div class="block" style="margin-top: 15px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    data() {
        return {
            // 输入框   搜索
            searchInput: '',
            // 表格数据
            userList: [],
            queryInfo: {
                query: '',
                // 当前页数
                pagenum: 1,
                // 当前每页显示多少条数据
                pagesize: 5
            },
            // 用户数据量
            total: 0,
            // 点击切换添加用户的对话框
            addDialogVisible: false,
            // 点击切换用戶修改的对话框
            updateDialogVisible: false,
            // 添加用户绑定的数据对象
            addForm: {
                username: '哈哈',
                password: '425643',
                qq: '321657865',
                phone: '15463525635',
                sex: '男',
                role: '管理员',
                isOnLine: false
            },
            // 添加用户的验证规则
            addFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                ],
                qq: [
                    { required: true, message: '请输入微信', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
                ],
                role: [
                    { required: true, message: '请选择用户权限', trigger: 'change' }
                ],
                sex: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ]
            },
            updateForm: {
                uid: '',
                username: '',
                password: '',
                token: '',
                QQ: '',
                phone: '',
                gender: '',
                role: '',
                isOnLine: ''
            },


        }
    }, 
    created() {
        this.getUsetList();
        this.getPageNum();
    },
    methods: {
        async getUsetList() {
            const { data: res } = await axios.get(`/api/node_user/user_list/${this.queryInfo.pagenum}&${this.queryInfo.pagesize}`);
            console.log(res.data);
            if(res.meta.state != 200) return;
            // if(res.meta.state != 200) return this.$message.error('获取用户失败');
            var data = res.data;
            this.replace(data);
            this.userList = data;
        },
        // 监听 pagesize 改变的事件 
        handleSizeChange (newSize) {
            console.log(newSize);
            // 监听到 pagesize 的值改变  就将 queryInfo.pagesize
            this.queryInfo.pagesize = newSize;
            this.getUsetList();
        },
        // 监听 页码值的改变
        handleCurrentChange (newPage) {
            // console.log(newPage);
            // 监听到 pagenum 的值改变  就将 queryInfo.pagenum
            this.queryInfo.pagenum = newPage;
            this.getUsetList();
        },
        // 获取用户数量
        async getPageNum () {
            const {data: res} = await axios.get('/api/node_user/user_pagenum');
            // console.log(res);
            if(res.meta.state != 200) return this.$message.error('用户数据量获取失败');
            this.total = res.data.pagenum;
        },
        // 添加用户
        addUser () {
            // console.log(this.addForm);
            this.$refs.addFormRef.validate(async valid => {
                if(!valid) return this.$message.error('请完善信息');
                this.replaceStr(this.addForm);
                // console.log(this.addForm);
                const { data: result } = await axios.post('/api/user/register',qs.stringify(this.addForm));
                // console.log(result);
                // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                this.$refs.addFormRef.resetFields();
                // 移除表单项的校验结果
                this.$refs.addFormRef.clearValidate();
                if(result.code == 400){
                    this.$message.error(result.msg);
                } else {
                    this.$message.success(result.msg);
                }
                // 提示成功的信息
                this.addDialogVisible = false;
                this.getUsetList();
                this.getPageNum();
            })
        },
        // 添加用户的对话框 点击取消 清楚验证规则提示信息
        clearValidate () {
            this.$refs.addFormRef.clearValidate();
            this.$refs.addFormRef.resetFields();
            this.addDialogVisible = false;
            this.addForm = {};
        },
        updataClearValidate () {
            this.$refs.updateFormRef.clearValidate();
            this.updateDialogVisible = false;
            this.updateForm = {};
        },
        // 更新在线状态
        async changeOnLint (id, onList) {
            var obj = { uid: id, isOnLine: onList ? 1 : 0 };
            const { data: result } = await axios.put('/api/node_user/change_online', qs.stringify(obj));
            // console.log(result);
            if(result.meta.state != 200) return this.$message.error('更新失败');
            this.$message.success('更新成功')
        },

        // 修改用户信息按鈕
        async updateUserBtn(uid) {
            // console.log(uid);
            this.uid = uid;
            const { data: result } = await axios.get(`/api/node_user/search_user_uid/${uid}`);
            // console.log(result);
            if(result.meta.state != 200) return this.$message.error(result.meta.msg);
            var data = result.data; 
            this.replace(data);
            this.updateForm = data[0];
            this.updateDialogVisible = true;
        },
        // 修改用户信息
        async updateUser() {
        // updateUser() {
            this.replaceStr(this.updateForm);
            this.updateDialogVisible = false;
            const { data: result } = await axios.put('/api/node_user/update_user_uid', qs.stringify(this.updateForm));
            console.log(result);
            if(result.meta.state != 200) return this.$message.error(result.meta.msg);
            this.$message.success(result.meta.msg);
            this.getUsetList();
            this.getPageNum();
        },
        // 点击删除按钮  删除用户
        async deleteUser(uid) {
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            // 如果用户确认删除，则返回值为字符串 confirm
            // 如果用户没有确认，则返回值为字符串 cancel
            if(confirmResult != 'confirm'){
                this.$message.error('删除用户操作已取消');
                return;
            }
            // console.log(uid);
            const { data: result } = await axios.delete(`/api/node_user/delete_user_uid/${uid}`);
            // console.log(result.meta.state);
            if(result.meta.state != 200) return this.$message.error(result.meta.msg);
            this.$message.success(result.meta.msg);
            // 由于删除最后一页的最后一个用户时，会出现删除成功 但 获取用户列表失败的情况
            // 在这里 先获取 total 的值 在通过 定义 监听属性 total 来更新用户列表
            // this.getUsetList();
            if(this.total % this.queryInfo.pagesize == 1){
                this.queryInfo.pagenum = parseInt(this.total / this.queryInfo.pagesize);
            }
            this.getUsetList();
            this.getPageNum();
        },
        setUser(uid) {
            console.log(uid);
        },
        // 判断性别、角色、状态  数字 ——> 字符串
        replace (data) {
            if(Object.prototype.toString.call(data) == "[object Array]"){
                for(let i = 0; i < data.length; i ++){
                    // 判断性别
                    if(data[i].sex == 1) {
                        data[i].sex = '男';
                    } else if(data[i].sex == 0) {
                        data[i].sex = '女';
                    } else {
                        data[i].sex = '保密'
                    }
                    // 判断权限
                    if(data[i].role == 1){
                        data[i].role = '超级管理员';
                    } else if (data[i].role == 2){
                        data[i].role = '管理员';
                    } else if (data[i].role == 3){
                        data[i].role = '特权用户';
                    } else {
                        data[i].role = '普通用户';
                    }
                    // 判断是否在线
                    if(data[i].isOnLine == 1) {
                        data[i].isOnLine = true;
                    } else {
                        data[i].isOnLine = false;
                    }
                }
            } else if(Object.prototype.toString.call(data) == "[object Object]"){
                // 判断性别
                if(data.sex == 1) {
                    data.sex = '男';
                } else if(data.sex == 0) {
                    data.sex = '女';
                } else {
                    data.sex = '保密'
                }
                // 判断权限
                if(data.role == 1){
                    data.role = '超级管理员';
                } else if (data.role == 2){
                    data.role = '管理员';
                } else if (data.role == 3){
                    data.role = '特权用户';
                } else {
                    data.role = '普通用户';
                }
                // 判断是否在线
                if(data.isOnLine == 1) {
                    data.isOnLine = true;
                } else {
                    data.isOnLine = false;
                }
            } else {
                alert('类型错误');
            }
            
        },
        // 判断性别、角色、状态  字符串 ——> 数字
        replaceStr (data){
            if(Object.prototype.toString.call(data) == "[object Array]"){
                for(let i = 0; i < data.length; i ++){
                    // 判断性别
                    if(data[i].sex == '男') {
                        data[i].sex = 1;
                    } else if(data[i].sex == '女') {
                        data[i].sex = 0;
                    } else {
                        data[i].sex = -1;
                    }
                    // 判断权限
                    if(data[i].role == '超级管理员'){
                        data[i].role = 1;
                    } else if (data[i].role == '管理员'){
                        data[i].role = 2;
                    } else if (data[i].role == '特权用户'){
                        data[i].role = 3;
                    } else {
                        data[i].role = 4;
                    }
                    // 判断是否在线
                    if(data[i].isOnLine == true) {
                        data[i].isOnLine = 1;
                    } else {
                        data[i].isOnLine = 0;
                    }
                }
            } else if(Object.prototype.toString.call(data) == "[object Object]"){
                // 判断性别
                if(data.sex == '男') {
                    data.sex = 1;
                } else if(data.sex == '女') {
                    data.sex = 0;
                } else {
                    data.sex = -1;
                }
                // 判断权限
                if(data.role == '超级管理员'){
                    data.role = 1;
                } else if (data.role == '管理员'){
                    data.role = 2;
                } else if (data.role == '特权用户'){
                    data.role = 3;
                } else {
                    data.role = 4;
                }
                // 判断是否在线
                if(data.isOnLine == true) {
                    data.isOnLine = 1;
                } else {
                    data.isOnLine = 0;
                }
            } else {
                alert('类型错误');
            }
        }
    },
    watch: {
        // 监听 searchInput 属性  只要改变 就进行获取对应的数据
        async searchInput (searchInput) {
            if(searchInput.trim() != ''){
                const { data: result } = await axios.get(`/api/node_user/user_search/${searchInput}`);
                if(result.meta.state != 200) return this.$message.error('查无此人');
                this.replace(result.data);
                this.userList = result.data;
                this.total = result.pagenum;
            } else {
                this.getUsetList();
                this.getPageNum();
            }
        }
    }
}
</script>

<style>

.input-with-select{
    width: 350px;
    margin-right: 20px;
    margin-bottom: 20px;
}
.gutter{
    display: block !important;
    /* border: 0 !important; */
}
.el-dialog__body{
    padding: 30px 50px 0;
}
</style>