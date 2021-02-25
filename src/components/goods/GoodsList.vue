<template>
    <div class="goods_list">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <!-- 搜索添加区域 -->
            <div class="el_search">
                <el-input placeholder="请输入内容 - 回车查询" v-model="searchInput" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
                <!-- 添加用户的对话框 -->
                <template>
                    <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="600px" :show-close="false" destroy-on-close :close-on-click-modal="false">
                    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                        <el-form-item prop="h_title" label="名称：">
                            <el-input v-model="addForm.h_title" prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <el-form-item prop="h_price" label="价格：">
                            <el-input v-model="addForm.h_price" prefix-icon="el-icon-chat-dot-round"></el-input>
                        </el-form-item>
                        <el-form-item prop="h_brand" label="品牌：">
                            <el-input v-model="addForm.h_brand" prefix-icon="el-icon-mobile-brand"></el-input>
                        </el-form-item>
                        <el-form-item prop="h_weight" label="重量：">
                            <el-input v-model="addForm.h_weight" prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>
                        <el-form-item prop="h_color" label="颜色：">
                            <el-input v-model="addForm.h_color" prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>
                        <el-form-item prop="h_size" label="尺寸：">
                            <el-input v-model="addForm.h_size" prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>
                        <el-form-item prop="h_season" label="上市时间：">
                            <el-input v-model="addForm.h_season" prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="clearValidate()">取 消</el-button>
                        <el-button type="primary" @click="addGoods()">确 定</el-button>
                    </span>
                    </el-dialog>
                </template>
            </div>
            <!-- 表格区域 -->
            <template>
                <el-table border :data="goodList" stripe>
                    <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form
                            label-position="left"
                            inline
                            class="demo-table-expand"
                        >
                        <!-- {{ props.row }} -->
                            <el-form-item label="商品名称">
                                <span>{{ props.row.h_title }}</span>
                            </el-form-item>
                            <el-form-item label="风格">
                                <span v-if="props.row.h_style == 1">童话民国风</span>
                                <span v-else-if="props.row.h_style == 2">甜美韩系风</span>
                                <span v-else-if="props.row.h_style == 3">宫廷复古风</span>
                                <span v-else-if="props.row.h_style == 4">传统中国风</span>
                                <span v-else-if="props.row.h_style == 5">西装</span>
                            </el-form-item>
                            <el-form-item label="所有尺寸">
                                <span>{{ props.row.h_size }}</span>
                            </el-form-item>
                            <el-form-item label="所有颜色">
                                <span>{{ props.row.h_color }}</span>
                            </el-form-item>
                            <el-form-item label="品牌">
                                <span>{{ props.row.h_brand }}</span>
                            </el-form-item>
                            <el-form-item label="所有身高">
                                <span>{{ props.row.h_height }}</span>
                            </el-form-item>
                            <el-form-item label="面料">
                                <span>{{ props.row.h_fabric }}</span>
                            </el-form-item>
                            <el-form-item label="领型">
                                <span>{{ props.row.h_collar }}</span>
                            </el-form-item>
                            <el-form-item label="类型">
                                <span>{{ props.row.h_mold }}</span>
                            </el-form-item>
                            <el-form-item label="流行">
                                <span>{{ props.row.h_popular }}</span>
                            </el-form-item>
                            <el-form-item label="腰型">
                                <span>{{ props.row.h_waist }}</span>
                            </el-form-item>
                            <el-form-item label="摆型">
                                <span>{{ props.row.h_pend }}</span>
                            </el-form-item>
                            <el-form-item label="货号">
                                <span>{{ props.row.h_goods_number }}</span>
                            </el-form-item>
                            <el-form-item label="服饰细节">
                                <span>{{ props.row.h_minutia }}</span>
                            </el-form-item>
                            <el-form-item label="上市季节">
                                <span>{{ props.row.h_season }}</span>
                            </el-form-item>
                            <el-form-item label="服饰工艺">
                                <span>{{ props.row.h_technology }}</span>
                            </el-form-item>
                            <el-form-item label="材质成分">
                                <span>{{ props.row.h_component }}</span>
                            </el-form-item>
                            <el-form-item label="重量">
                                <span>{{ props.row.h_weight }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                    <el-table-column align="center" type="index" label="#" width="50"></el-table-column>
                    <el-table-column align="center" prop="h_title" label="名称" width="550"></el-table-column>
                    <el-table-column align="center" prop="h_brand" label="品牌"></el-table-column>
                    <el-table-column align="center" prop="h_price" label="价格/元"></el-table-column>
                    <el-table-column align="center" prop="h_weight" label="重量"></el-table-column>
                    <el-table-column align="center" prop="h_season" label="上市季节"></el-table-column>
                    <el-table-column align="center" label="操作" width="150">
                        <template slot-scope="scope">
                            <!-- 修改 -->
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateUserBtn(scope.row.hid)"></el-button>
                            <!-- 删除 -->
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.hid)"></el-button>
                            <el-dialog title="修改商品信息" :visible.sync="updateDialogVisible" width="500px" style="text-align: left !important" :close-on-click-modal="false">
                                <el-form :model="updateForm" :rules="addFormRules" ref="updateFormRef" label-width="100px">
                                    <el-form-item prop="h_title" label="名称：">
                                        <el-input v-model="updateForm.h_title" prefix-icon="el-icon-user"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="h_weight" label="重量：">
                                        <el-input v-model="updateForm.h_weight" prefix-icon="el-icon-lock"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="h_price" label="价格：">
                                        <el-input v-model="updateForm.h_price" prefix-icon="el-icon-chat-dot-round"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="h_brand" label="品牌：">
                                        <el-input v-model="updateForm.h_brand" prefix-icon="el-icon-mobile-brand"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="h_season" label="上市季节：">
                                        <el-input v-model="updateForm.h_season" prefix-icon="el-icon-mobile-season"></el-input>
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
            goodList: [],
            queryInfo: {
                query: '',
                // 当前页数
                pagenum: 1,
                // 当前每页显示多少条数据
                pagesize: 5
            },
            // 用户数据量
            total: 0,
            // 点击切换添加商品的对话框
            addDialogVisible: false,
            // 点击切换商品修改的对话框
            updateDialogVisible: false,
            // 添加商品绑定的数据对象
            addForm: {
                h_title: '2020最新版一字肩式雪白色婚纱',
                h_price: '3699',
                h_weight: '2.1kg',
                h_brand: '蕾丝若',
                h_season: '2020年冬季',
                h_color: '红色',
                h_size: 'L'
            },
            // 添加用户的验证规则
            addFormRules: {
                h_title: [
                    { required: true, message: '请输入商品名', trigger: 'blur' },
                    { min: 2, message: '长度在 2 个字符以上', trigger: 'blur' }
                ],
                h_weight: [
                    { required: true, message: '请输入商品重量', trigger: 'blur' },
                    { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
                ],
                h_price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' }
                ],
                h_brand: [
                    { required: true, message: '请输入商品品牌', trigger: 'blur' },
                    { min: 1, max: 11, message: '长度在 11 个字节以内', trigger: 'blur' }
                ],
                h_season: [
                    { required: true, message: '请输入上市季节', trigger: 'blur' }
                ],
                h_size: [
                    { required: true, message: '请输入商品尺寸', trigger: 'blur' }
                ],
                h_color: [
                    { required: true, message: '请输入商品颜色', trigger: 'blur' }
                ]
            },
            updateForm: {
                hid: '',
                title: '',
                weight: '',
                price: '',
                brand: '',
                gender: '',
                season: ''
            },
        }
    }, 
    created() {
        this.getGoodsList();
        this.getPageNum();
    },
    methods: {
        async getGoodsList() {
            const { data: res } = await axios.get(`/api/goods/goods_limit/${this.queryInfo.pagenum}&${this.queryInfo.pagesize}`);
            console.log(res.data);
            if(res.meta.state != 200) return;
            // if(res.meta.state != 200) return this.$message.error('获取用户失败');
            this.goodList = res.data;
        },
        // 监听 pagesize 改变的事件 
        handleSizeChange (newSize) {
            console.log(newSize);
            // 监听到 pagesize 的值改变  就将 queryInfo.pagesize
            this.queryInfo.pagesize = newSize;
            this.getGoodsList();
        },
        // 监听 页码值的改变
        handleCurrentChange (newPage) {
            // console.log(newPage);
            // 监听到 pagenum 的值改变  就将 queryInfo.pagenum
            this.queryInfo.pagenum = newPage;
            this.getGoodsList();
        },
        // 获取用户数量
        async getPageNum () {
            const {data: res} = await axios.get('/api/goods/goods_pagenum');
            // console.log(res);
            if(res.meta.state != 200) return this.$message.error('用户数据量获取失败');
            this.total = res.data.pagenum;
        },
        // 添加商品
        addGoods () {
            // console.log(this.addForm);
            this.$refs.addFormRef.validate(async valid => {
                if(!valid) return this.$message.error('请完善信息');
                // console.log(this.addForm);
                const { data: result } = await axios.post('/api/goods/add_goods',qs.stringify(this.addForm));
                console.log(result);
                // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                this.$refs.addFormRef.resetFields();
                // 移除表单项的校验结果
                this.$refs.addFormRef.clearValidate();
                if(result.code == 400){
                    this.$message.error(result.msg);
                } else {
                    // 提示成功的信息
                    this.$message.success(result.meta.msg);
                }
                this.addDialogVisible = false;
                this.getGoodsList();
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
        // 修改用户信息按鈕
        async updateUserBtn(hid) {
            // console.log(uid);
            this.hid = hid;
            const { data: result } = await axios.get(`/api/goods/search_goods_hid/${hid}`);
            // console.log(result);
            if(result.meta.state != 200) return this.$message.error(result.meta.msg);
            var data = result.data; 
            this.updateForm = data[0];
            this.updateDialogVisible = true;
        },
        // 修改用户信息
        async updateUser() {
        // updateUser() {
            this.updateDialogVisible = false;
            const { data: result } = await axios.put('/api/goods/update_goods_hid', qs.stringify(this.updateForm));
            console.log(result);
            if(result.meta.state != 200) return this.$message.error(result.meta.msg);
            this.$message.success(result.meta.msg);
            this.getGoodsList();
            this.getPageNum();
        },
        // 点击删除按钮  删除用户
        async deleteUser(hid) {
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            // 如果用户确认删除，则返回值为字符串 confirm
            // 如果用户没有确认，则返回值为字符串 cancel
            if(confirmResult != 'confirm'){
                this.$message.error('删除商品操作已取消');
                return;
            }
            // console.log(uid);
            const { data: result } = await axios.delete(`/api/goods/delete_goods_hid/${hid}`);
            // console.log(result.meta.state);
            if(result.meta.state != 200) return this.$message.error(result.meta.msg);
            this.$message.success(result.meta.msg);
            // 由于删除最后一页的最后一个用户时，会出现删除成功 但 获取用户列表失败的情况
            // 在这里 先获取 total 的值 在通过 定义 监听属性 total 来更新用户列表
            // this.getGoodsList();
            if(this.total % this.queryInfo.pagesize == 1){
                this.queryInfo.pagenum = parseInt(this.total / this.queryInfo.pagesize);
            }
            this.getGoodsList();
            this.getPageNum();
        },
        // setUser(uid) {
        //     console.log(uid);
        // },
    },
    watch: {
        // 监听 search 属性  只要改变 就进行获取对应的数据
        async searchInput (search) {
            if(search.trim() != ''){
                const { data: result } = await axios.get(`/api/goods/search_like/${search}`);
                // console.log(result)
                if(!(result.meta.code == 200)) return this.$message.error('查无此商品');
                this.goodList = result.data;
                this.total = result.pagenum; 
            } else {
                this.getGoodsList();
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
.el-card{
    margin-top: 15px;
}
.demo-table-expand {
font-size: 0;
}
.demo-table-expand label {
width: 100px;
color: #99a9bf;
text-align: right !important;
margin-right: 15px;
}
.demo-table-expand .el-form-item {
margin-right: 0px;
margin-bottom: 0;
width: 50%;
}
</style>








