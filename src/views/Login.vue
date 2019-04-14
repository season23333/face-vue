<template>
    <div class="fullscreen">
        <div class="login-box">
            <div style="text-align: center">
                <img src="../assets/logo1.png" alt="" class="logo">
            </div>
            <p class="text-tips" style="font-size: medium;">你好，欢迎登录</p>
            <form action="" class="login-form">
                <div class="m-list-group">
                    <div class="m-list-group-item">
                        <input type="text" placeholder="手机号" class="m-input" v-model="loginForm.username">
                    </div>
                    <div class="m-list-group-item">
                        <input :type="pwdType" placeholder="密码" class="m-input" v-model="loginForm.password"
                               @keyup.enter.native="handleLogin"/>
                        <span class="show-pwd" @click="showPwd">
                            <i class="el-icon-view"></i>
                        </span>
                    </div>
                </div>
                <button class="m-btn sub select-none" @click.prevent="handleLogin" v-loading="isLoging">登录</button>
                <a href="" class="text-tips" @click="$router.push({name: 'password_reset'})">忘记密码</a>
            </form>

            <div style="margin-top: 50px"></div>
            <p class="text-tips">
                <span class="footer-text">会议室预定管理系统 &nbsp;<el-tag size="mini">0.0.1</el-tag> <br>©make by <a
                        href="https://github.com/unamedgroup" target="_blank">https://github.com/unamedgroup</a>
  </span>
            </p>
        </div>
    </div>
</template>
<script>


    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    username: '17685590508',
                    password: '123456',
                },
                isLoging: false,
                pwdType: 'password',
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },


            handleLogin() {
                if (!this.loginForm.username || !this.loginForm.password) {
                    return this.$message.warning('用户名和密码不能为空')
                } else {
                    if(!(/^1[34578]\d{9}$/.test(this.loginForm.username))){
                        return this.$message.warning('请输入正确的手机号');
                    }
                }
                this.isLoging = true;
                //md5加密，等后端改好后修改
                console.log('MD5:' + this.$md5(this.loginForm.password));
                this.$store.dispatch('Login', this.loginForm).then(() => {
                    this.isLoging = false;
                    console.log('Jump');
                    this.$router.push({path: this.redirect || '/index'});
                    console.log('End Jump')
                }).catch(() => {
                    this.isLoging = false;
                })
            }
        }
    }
</script>
<style type="text/css">
    .m-list-group {
        border-radius: 3px;
        padding: 0;
        margin: 0 0 20px;
    }

    .m-list-group .m-list-group-item {
        position: relative;
        display: block;
        padding: 6px 10px;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #e7ecee;
    }

    .m-list-group .m-list-group-item:first-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

    .m-list-group .m-list-group-item:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    .fullscreen {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #F4F5F5;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-box {
        position: relative;
        width: 330px;
        margin: 0 auto;
        padding: 0px 15px;
    }

    .login-box .logo {
        max-width: 40%;
        margin-bottom: 30px;
    }

    .login-box .text-tips {
        text-align: center;
        color: #909DB7;
    }

    .login-box .m-input {
        width: 100%;
        padding: 10px;
        border: none;
        outline: none;
        box-sizing: border-box;
    }

    .login-box .m-btn {
        font-size: 18px;
        width: 100%;
        color: #fff;
        background-color: #ACD392;
        display: inline-block;
        padding: 10px 12px;
        margin-bottom: 10px;
        line-height: 1.42857143;
        text-align: center;
        cursor: pointer;
        outline: none;
        border-radius: 2px;
        border: 1px solid #ACD392;
        box-sizing: border-box;
        text-decoration: none;
    }

    .login-box .m-btn.m-btn-text {
        background: #fff;
        color: #36C1FA;
    }

    .login-box .m-btn:hover {
        background-color: #99CC66;
    }

    .login-box .m-btn.m-btn-text:hover {
        background-color: #F4F5F5;
    }

    .login-box .m-btn:active {
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        .login-box {
            width: auto;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 15px;
        font-size: 16px;
        color: darkgrey;
        cursor: pointer;
        user-select: none;
    }
</style>