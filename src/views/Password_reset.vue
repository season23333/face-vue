<!--<template>-->
    <!--<div class="fullscreen">-->
        <!--<div class="login-box">-->
            <!--<div style="text-align: center">-->
                <!--<img src="../assets/logo1.png" alt="" class="logo">-->
            <!--</div>-->
            <!--<p class="text-tips" style="font-size: medium;">找回密码</p>-->
            <!--<form action="" class="login-form">-->
                <!--<div class="m-list-group">-->
                    <!--<div class="m-list-group-item">-->
                        <!--<input type="text" placeholder="邮箱地址" class="m-input" v-model="email">-->
                    <!--</div>-->
                <!--</div>-->
                <!--<button class="m-btn sub select-none" @click.prevent="handleLogin" v-loading="isLoging">登录</button>-->
            <!--</form>-->

            <!--<div style="margin-top: 50px"></div>-->
            <!--<p class="text-tips">-->
                <!--<span class="footer-text">会议室预定管理系统 &nbsp;<el-tag size="mini">0.0.1</el-tag> <br>©make by <a-->
                        <!--href="https://github.com/unamedgroup" target="_blank">https://github.com/unamedgroup</a>-->
  <!--</span>-->
            <!--</p>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--import {reset} from '../api/user';-->
    <!--export default {-->
        <!--name: 'Login',-->
        <!--data() {-->
            <!--return {-->
                <!--email: '',-->
                <!--isLoging: false,-->
                <!--code: 200-->
            <!--}-->
        <!--},-->
        <!--methods: {-->
            <!--handleLogin() {-->
                <!--if (this.email === '') {-->
                    <!--return this.$message.warning('邮箱不能为空');-->
                <!--} else {-->
                    <!--if (this.email !== '') {-->
                        <!--var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;-->
                        <!--if(!reg.test(this.email)){-->
                            <!--return this.$message.warning('请输入有效的邮箱');-->
                        <!--}-->
                    <!--}-->
                <!--}-->
                <!--this.isLoging = true;-->
                <!--reset(this.email).then(res => {-->
                    <!--if (res.data.code === 200) {-->
                        <!--this.$message.success('邮件发送成功,请修改密码后登录');-->
                        <!--this.$router.push({name: 'login'});-->
                        <!--this.isLoging = false;-->
                    <!--}-->
                <!--})-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->
<!--<style type="text/css">-->
    <!--.m-list-group {-->
        <!--border-radius: 3px;-->
        <!--padding: 0;-->
        <!--margin: 0 0 20px;-->
    <!--}-->

    <!--.m-list-group .m-list-group-item {-->
        <!--position: relative;-->
        <!--display: block;-->
        <!--padding: 6px 10px;-->
        <!--margin-bottom: -1px;-->
        <!--background-color: #fff;-->
        <!--border: 1px solid #e7ecee;-->
    <!--}-->

    <!--.m-list-group .m-list-group-item:first-child {-->
        <!--border-top-left-radius: 3px;-->
        <!--border-top-right-radius: 3px;-->
    <!--}-->

    <!--.m-list-group .m-list-group-item:last-child {-->
        <!--border-bottom-left-radius: 3px;-->
        <!--border-bottom-right-radius: 3px;-->
    <!--}-->

    <!--.fullscreen {-->
        <!--position: absolute;-->
        <!--width: 100%;-->
        <!--height: 100%;-->
        <!--background: #F4F5F5;-->
        <!--display: flex;-->
        <!--justify-content: center;-->
        <!--align-items: center;-->
    <!--}-->

    <!--.login-box {-->
        <!--position: relative;-->
        <!--width: 330px;-->
        <!--margin: 0 auto;-->
        <!--padding: 0px 15px;-->
    <!--}-->

    <!--.login-box .logo {-->
        <!--max-width: 40%;-->
        <!--margin-bottom: 30px;-->
    <!--}-->

    <!--.login-box .text-tips {-->
        <!--text-align: center;-->
        <!--color: #909DB7;-->
    <!--}-->

    <!--.login-box .m-input {-->
        <!--width: 100%;-->
        <!--padding: 10px;-->
        <!--border: none;-->
        <!--outline: none;-->
        <!--box-sizing: border-box;-->
    <!--}-->

    <!--.login-box .m-btn {-->
        <!--font-size: 18px;-->
        <!--width: 100%;-->
        <!--color: #fff;-->
        <!--background-color: #ACD392;-->
        <!--display: inline-block;-->
        <!--padding: 10px 12px;-->
        <!--margin-bottom: 10px;-->
        <!--line-height: 1.42857143;-->
        <!--text-align: center;-->
        <!--cursor: pointer;-->
        <!--outline: none;-->
        <!--border-radius: 2px;-->
        <!--border: 1px solid #ACD392;-->
        <!--box-sizing: border-box;-->
        <!--text-decoration: none;-->
    <!--}-->

    <!--.login-box .m-btn.m-btn-text {-->
        <!--background: #fff;-->
        <!--color: #36C1FA;-->
    <!--}-->

    <!--.login-box .m-btn:hover {-->
        <!--background-color: #99CC66;-->
    <!--}-->

    <!--.login-box .m-btn.m-btn-text:hover {-->
        <!--background-color: #F4F5F5;-->
    <!--}-->

    <!--.login-box .m-btn:active {-->
        <!--opacity: 0.8;-->
    <!--}-->

    <!--@media (max-width: 768px) {-->
        <!--.login-box {-->
            <!--width: auto;-->
        <!--}-->
    <!--}-->
<!--</style>-->