<template>
  <div class="el_main">
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }" @click="jump">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!-- <el-button type="primary">添加角色</el-button> -->
            <el-table :data="tags" border>
                <el-table-column type="expand" width="50">
                    <template slot-scope="scope">
                        <el-row class="one" v-for="tag in scope.row.children" :key="tag.id">
                            <el-tag type="primary">{{tag.authName}}</el-tag>
                            <!-- {{ tag }} -->
                            <div class="two">
                                <el-row v-for="tagTwo in tag.children" :key="tagTwo.id">
                                    <el-tag type="warning">{{ tagTwo.authName }}</el-tag>
                                    <!-- {{tagTwo}} -->
                                    <div class="three">
                                        <!-- <el-row v-for="tagThree in tagTwo.children" :key="tagThree.id"> -->
                                            <!-- <el-tag v-for="tagThree in tagTwo.children" type="info"> {{tagThree.authName}} </el-tag> -->
                                            <el-tag v-for="tagThree in tagTwo.children" :key="tagThree.id" type="info"> {{tagThree.authName}} </el-tag>
                                        <!-- </el-row> -->
                                    </div>
                                </el-row>
                            </div>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="#" width="80"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                <!-- <el-table-column label="操作">
                    <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
                    <el-button type="warning" icon="el-icon-setting" size="small">分配权限</el-button>
                </el-table-column> -->
            </el-table>
        </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    created () {
        this.getMenuList();
        this.getTagList();
    },
    data () {
        return {
            userList: [],
            tags: [],
        }
    },
    methods: {
         async getMenuList () {
            const { data: result } = await axios.get('/api/right/rights_user');
            // console.log(result.list);
            var data = result.list;
            this.userList = data;
            console.log(data);
        },
        async getTagList () {
            const { data: result } = await axios.get('/api/menu/menuList');
            console.log(result.powerList);
            this.tags = result.powerList;
            console.log(this.tags[0].children[0].authName)
        },
        getPower(uid){
            console.log('uid');
        },
        jump(){
            // this.$router.push('/users');
            window.sessionStorage.setItem('addr', '/users');
        }
    }
}
</script>

<style scoped>
.el-card,
.el-table{
    margin-top: 15px;
}
.gutter{
    display: block !important;
    /* border: 0 !important; */
}
.one{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #eee;
    padding: 10px 0;
}
.one:last-child{
    border-bottom: 1px solid #eee;
    position: relative;
}
.el-tag{
    position: relative;
    margin: 5px 10px;
}
.el-tag::after{
    content: '';
    display: inline-table;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-left-color: #000;
    position: absolute;
    top: 50%;
    left: 100px;
    transform: translate(-50%, -50%);
}
.two{
    width: 90%;
    margin-left: 100px;
}
.two>.el-row{
    border-top: 1px solid #eee;
    padding: 10px 0;
    display: flex;
    /* flex-direction: column; */
    /* justify-content: center; */
    align-items: center;
}
.two>.el-row:last-child{
    border-bottom: 1px solid #eee;
}
.three{
    /* width: 70%; */
    margin-left: 50px;
    display: inline-block;
}
.three .el-tag::after{
    content: '';
    display: none;
}
.three .el-row{
    display: inline-block;
}
</style>