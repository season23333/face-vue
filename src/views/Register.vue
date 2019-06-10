<template>
    <div class="fullscreen">
        <div class="login-box">
            <div style="text-align: center">
                <img src="../assets/logo1.png" alt="" class="logo">
            </div>
            <p class="text-tips" style="font-size: medium;">用户注册</p>
            <form action="" class="login-form">
                <div class="m-list-group">
                    <div class="m-list-group-item">
                        <input type="text" placeholder="姓名" class="m-input" v-model="realName" id="name"
                               @focus="showNone">
                    </div>
                    <div class="m-list-group-item">
                        <input type="text" placeholder="手机号" class="m-input" v-model="phoneNumber" @focus="showNone">
                    </div>
                    <div class="m-list-group-item">
                        <input type="text" placeholder="邮箱地址" class="m-input" v-model="email" @focus="showNone">
                    </div>
                    <div class="m-list-group-item">
                        <input :type="pwdType" placeholder="密码" class="m-input" v-model="password" @focus="showNone">
                    </div>
                    <div class="m-list-group-item">
                        <input type="text" placeholder="部门" class="m-input" v-model="department" @focus="showNone">
                        <!--<div v-loading="divLoading" v-if="show1 === true"-->
                        <!--style=" position: absolute;background-color: white;z-index:999">-->
                        <!--<el-scrollbar style="height: 100%">-->
                        <!--&lt;!&ndash;overflow-y:scroll;overflow-x:hidden;&ndash;&gt;-->
                        <!--<ul class="myul" style="height: 110px">-->
                        <!--<li v-for='(v,k) in departmentArr' :key="k" @click="selectDepartment(k)"-->
                        <!--class="myli"-->
                        <!--style="font-size: 0.9em">-->
                        <!--<span>{{v}}</span>-->
                        <!--</li>-->
                        <!--</ul>-->
                        <!--</el-scrollbar>-->
                        <!--</div>-->
                    </div>
                    <div class="m-list-group-item">
                        <input type="text" placeholder="用户组" class="m-input" v-model="userGroup" @focus="showGro">
                        <div v-loading="divLoading" v-if="show === true"
                             style=" position: absolute;background-color: white">
                            <el-scrollbar style="height: 100%">
                                <!--overflow-y:scroll;overflow-x:hidden;-->
                                <ul class="myul" style="height: 110px">
                                    <li v-for='(v,k) in arr' :key="k" @click="selectGroup(k)" class="myli"
                                        style="font-size: 0.9em">
                                        <span>{{v}}</span>
                                    </li>
                                </ul>
                            </el-scrollbar>
                        </div>
                    </div>

                </div>
                <button class="m-btn sub select-none" @click.prevent="handleLogin">注册</button>
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
    import {register} from '../api/user';
    import {getGroup} from '../api/userManage'

    export default {
        name: 'Register',
        data() {
            return {
                divLoading: false,
                arr: [],
                show: false,
                show1: false,
                password: '',
                realName: '',
                department: '',
                phoneNumber: '',
                userGroup: '',
                groupID:-1,
                email: '',
                code: 200,
                pwdType: 'password',
            }
        },
        created() {
            getGroup().then(res => {
                this.arr = res.data;
                console.log(this.arr);
                console.log(res)
            })
        },
        methods: {
            // showDep() {
            //     this.show = false;
            //     // this.show1 = true;
            // },
            showGro() {
                this.show = true;
                // this.show1 = false;
            },
            showNone() {
                this.show = false;
                // this.show1 = false;
            },
            // selectDepartment(k) {
            //     this.department = this.departmentArr[k];
            //     this.show1 = false;
            // },
            selectGroup(k) {
                this.userGroup = this.arr[k];
                this.groupID = k;
                // console.log(this.arr[k]);
                this.show = false;
            },
            handleLogin() {
                if (this.email === '') {
                    return this.$message.warning('邮箱不能为空');
                } else {
                    if (this.email !== '') {
                        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                        if (!reg.test(this.email)) {
                            return this.$message.warning('请输入有效的邮箱');
                        }
                    }
                }
                console.log(this.password);
                this.password = this.$md5(this.password);
                console.log(this.password);
                register(this.password, this.realName, this.department, this.email, this.phoneNumber, this.groupID).then(res => {
                    if (res.status === 0) {
                        this.$message.success('注册成功,请登录');
                        this.$router.push({name: 'login'});
                    }
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
        margin-bottom: 5px;
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

    .myul {
        padding: 10px 0 0;
        margin: 0;
        display: block;
        list-style-type: disc;
        scroll-snap-margin-block-start: 1em;
        scroll-snap-margin-block-end: 1em;
        scroll-snap-margin-inline-start: 0px;
        scroll-snap-margin-inline-end: 0px;
        scroll-padding-inline-start: 40px;
    }

    .myli {
        height: 30px;
        padding: 0 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        list-style-type: none;
        width: 200px;
        position: relative;
        min-height: 30px;
        color: #666;
        outline-style: none;
    }

    /*.el-scrollbar__thumb {*/
    /*display: none;*/
    /*}*/

    .el-scrollbar__wrap {
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>