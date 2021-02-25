<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="" />
                <span>微微新娘后台管理</span>
            </div>
            <el-button type="primary" @click="secede()">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleButton()">···</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu text-color="#fff" background-color="#3d8581" active-text-color="#ffd04b" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="isNavActive">
                    <!-- 一级菜单 -->
                    <!-- index 只接收字符串  所以 需要将 item.id 转换为字符串 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsList[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item v-for="childItem in item.children" :index="'/' + childItem.path" :key="childItem.id" @click="saveNavState('/' + childItem.path)">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{ childItem.authName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主题 -->
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import axios from 'axios';
export default {
    // 生命周期函数
    created(){
        this.getMenuList();
        this.isNavActive = window.sessionStorage.getItem('addr') || '/users';
    },
    data() {
        return {
            // 左侧菜单数据
            menuList: [],
            iconsList: { 100: 'el-icon-user', 200: 'el-icon-edit', 300: 'el-icon-goods', 400: 'el-icon-tickets', 500: 'el-icon-monitor'},
            isCollapse: false,
            isNavActive: '/users'
        };
    },
    methods: {
        secede () {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        async getMenuList () {
            const {data: res} = await axios.get('/api/menu/menuList');
            if(res.meta.state != 200) return this.$message.error('获取用户列表失败');
            this.menuList = res.list;
        },
        // 点击按钮 切换菜单的折叠与展开
        toggleButton() {
            this.isCollapse = !this.isCollapse;
        },
        // 保存激活的菜单的地址
        saveNavState(address) {
            this.isNavActive = address;
            window.sessionStorage.setItem('addr', address);
        }
    },
};
</script>

<style>
.el-header {
    background-color: #1370ad;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    align-items: center;
    color: #fff;
    font-size: 20px;
}
.el-header div img {
    height: 40px;
    margin-right: 10px;
}
.el-header div {
    display: flex;
    align-items: center;
}
.el-aside {
    background-color: #3d8581;
}
.el-main {
    background-color: #e1e4e7;
}
.home-container {
    height: 100%;
}
.el-submenu__title i,
.el-menu-item i {
    color: #fff;
}
.toggle-button{
    line-height: 30px;
    background-color: #3a807b;
    font-size: 30px;
    text-align: center;
    color: #fff;
    cursor: pointer;
}
</style>