<template>
    <div>
        <!-- <button type="info" @click="btn()">发送POST请求</button> -->
        <div class="xb-container">
            <div class="input_box">
                <div class="input_img">
                    <img src="../assets/logo.png" alt="">
                </div>
                <el-form class="input_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
                    <el-form-item prop="username">
                        <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary" @click="login()">登录</el-button>
                        <el-button type="danger" @click="again()">重置</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    data() {
        return {
            loginForm: {
                username: '小北',
                password: '123456789'
            },
            loginFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 10, message: '用户名在 2 - 10 个字符之间', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 15, message: '秘密在 5 - 15 个字符之间', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        // 重置按钮
        again: function(){
            this.$refs.loginFormRef.resetFields();
        },
        // 登录
        login: function(){
            axios.post('/api/user/login', qs.stringify(this.loginForm)).then(res => {
                console.log(res.data.data[0]);
                var data = res.data.data[0];
                if(res.data.meta.code==200){
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    // 定义 token (自定义的 token 值)  并将其添加到 sessionStorage(临时存储) 中
                    window.sessionStorage.setItem('token', data.token);
                    // 编程式导航进行跳转
                    this.$router.push('/home');
                } else {
                    this.$message.error('登录失败');
                }
            })
        }
    }
}
</script>

<style>
.xb-container{
    background-color: #2b4b6b;
    height:100vh;
    position: relative;
}
.input_box{
    width: 500px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
}
.input_img{
    width: 120px;
    height: 120px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #eee;
    border: 10px solid #fff;
    box-shadow: 0px 0px 5px #000;
}
.input_img img{
    height: 100%;
}
.input_form{
    width: 100%;
    height: 205px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 30px;
    box-sizing: border-box;
}
.btns{
    position: absolute;
    right: 30px;
}
</style>