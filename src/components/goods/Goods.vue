<template>
    <div class="goods_parameter">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
                <el-collapse-item :title="item" :name='index+1' v-for="(item, index) of title_list" :key="index" @click="getStyleList(index)">
                    <el-table :data="style_list" style="width: 100%">
                        <el-table-column align='center' prop="h_title" width='250px' label="标题"></el-table-column>
                        <el-table-column align='center' prop="h_price" label="价格"></el-table-column>
                        <el-table-column align='center' prop="h_brand" label="品牌"></el-table-column>
                        <el-table-column align='center' prop="h_weight" label="重量"></el-table-column>
                        <el-table-column align='center' prop="h_mold" label="类型"></el-table-column>
                        <el-table-column align='center' prop="h_goods_number" label="货号"></el-table-column>
                        <el-table-column align='center' prop="h_season" label="上架时间"></el-table-column>
                        <el-table-column align='center' prop="h_size" label="尺寸"></el-table-column>
                        <el-table-column align='center' prop="h_color" label="颜色"></el-table-column>
                        <el-table-column align='center' prop="h_collar" label="肩型"></el-table-column>
                        <el-table-column align='center' prop="h_component" label="材质成分"></el-table-column>
                        <el-table-column align='center' prop="h_fabric" label="面料"></el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
import axios from "axios";
export default {
    created() {
        this.getDataList();
    },
    methods: {
        async getDataList() {
            const { data: result } = await axios.get("/api/goods/good_all");
            // console.log(result.data);
            this.data_list = result.data;
        },
        async handleChange(){
            if(this.activeNames){
                const { data: result } = await axios.get(`/api/goods/good_style/${this.activeNames}`);
                console.log(result);
                this.style_list = result.data;
            }
        }
    },
    data() {
        return {
            data_list: [],
            activeNames: ["1"],
            title_list: ['童话民国风', '甜美韩系风', '宫廷复古风', '传统中国风', '西装'],
            style_list: []
        };
    },
};
</script>

<style>
</style>