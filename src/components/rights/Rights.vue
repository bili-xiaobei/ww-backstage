<template>
  <div class="el_main">
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }" @click="jump">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>路径列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table :data="userList" style="width: 100%" border>
                <el-table-column type="index" label="#" width="100"></el-table-column>
                <el-table-column prop="authName" label="路径名称"></el-table-column>
                <el-table-column prop="path" label="路径"></el-table-column>
                <el-table-column prop="order" label="路径等级">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.order == '一级'">{{ scope.row.order }}</el-tag>
                        <el-tag type="success" v-if="scope.row.order == '二级'">{{ scope.row.order }}</el-tag>
                        <el-tag type="warning" v-if="scope.row.order == '三级'">{{ scope.row.order }}</el-tag>
                        <el-tag type="info" v-if="scope.row.order == '四级'">{{ scope.row.order }}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    created () {
        this.getMenuList();
    },
    data() {
        return {
            userList: [],
        }
    },
    methods: {
        async getMenuList () {
            const { data: result } = await axios.get('/api/menu/menuList');
            // console.log(result.list);
            var data = result.list;
            this.getList(data);
            console.log(this.userList);
        },
        getList(data){
            for(let i = 0; i < data.length; i++){
                var obj = {};
                obj.uid = data[i].id;
                obj.authName = data[i].authName;
                obj.path = '/' + data[i].path;
                if(data[i].order == 1){
                    obj.order = '一级';
                } else if(data[i].order == 2){
                    obj.order = '二级';
                } else if(data[i].order == 3){
                    obj.order = '三级';
                } else {
                    obj.order = '四级';
                }
                this.userList.push(obj);
                if(data[i].children){
                    this.getList(data[i].children);
                }
            }
        },
        jump(){
            // this.$router.push('/users');
            window.sessionStorage.setItem('addr', '/users');
            // this.isNavActive = window.sessionStorage.getItem('addr') || '/users';
        }
    }
}
</script>

<style>
.el-card{
    margin-top: 15px;
}
.el-table .cell{
    padding-left: 20px !important;
}
</style>