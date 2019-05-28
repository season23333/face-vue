<template>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px" :before-close="handleClose">
        <el-form :model="profileForm" label-width="80px" :rules="rules" ref="ruleForm">
            <el-form-item label="当前密码" prop="password">
                <el-input :type="pwdType" v-model="profileForm.password" placeholder="请输入内容" autofocus="autofocus">
                    <template slot="append">
                        <i class="el-icon-view" style="color: #008080" @click="showPwd"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="新的密码" prop="newPassword">
                <el-input :type="pwdType1" v-model="profileForm.newPassword" placeholder="请输入内容">
                    <template slot="append">
                        <i class="el-icon-view" style="color: #008080" @click="showPwd1"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input :type="pwdType2" v-model="profileForm.checkPassword" placeholder="请输入内容">
                    <template slot="append">
                        <i class="el-icon-view" style="color: #008080" @click="showPwd2"></i>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="submit('ruleForm')">提 交</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {passwordReset} from '../api/user'
    export default {
        props: ['passwordDialogVisible'],
        name: "Password_reset",
        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.profileForm.newPassword) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                rules: {
                    password: [{required: true, message: "请输入密码"},
                    ],
                    newPassword: [{required: true, message: "请输入新密码"}, {
                        pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,15}$/,
                        message: '密码为数字,大写字母,小写字母,特殊符号,至少包含三种,长度6-15位'
                    }],
                    checkPassword: [{required: true, validator: validatePass2, trigger: "blur"}]
                },
                dialogFormVisible: true,
                profileForm: {
                    newPassword: '',
                    checkPassword: '',
                    password: ''
                },
                formLabelWidth: '120px',
                pwdType: 'password',
                pwdType1: 'password',
                pwdType2: 'password',
                count:"",//倒计时
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.$emit('passwordSuccess', false);
                        done();
                    })
                    .catch(_ => {
                    });
            },
            submit(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var pw = this.$md5(this.profileForm.password);
                        var newpw = this.$md5(this.profileForm.newPassword);
                        console.log('点击'+pw+newpw);
                        passwordReset(pw,newpw).then(res =>{
                            if (res.status === 0) {
                                const TIME_COUNT = 3;
                                if(!this.timer){
                                    this.count = TIME_COUNT;
                                    this.$message({
                                        message: '修改密码成功，请重新登录,3秒钟后将跳转到登录页面',
                                        duration:3000,
                                        type: 'success'
                                    });
                                    this.timer = setInterval(()=>{
                                        if(this.count > 0 && this.count <= TIME_COUNT){
                                            this.count--;
                                        }else{
                                            clearInterval(this.timer);
                                            this.timer = null;
                                            //跳转的页面写在此处
                                            this.$store.dispatch('LogOut').then(() => {
                                                location.reload() // 为了重新实例化vue-router对象 避免bug
                                            })
                                        }
                                    },1000)
                                }
                            }
                        })
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
                // if (this.profileForm.password !== '') {
                //     this.profileForm.password = this.$md5(this.profileForm.password);
                // }
                // //后端判断密码还是前端判断？这个接口还没写
            },
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            showPwd1() {
                if (this.pwdType1 === 'password') {
                    this.pwdType1 = ''
                } else {
                    this.pwdType1 = 'password'
                }
            },
            showPwd2() {
                if (this.pwdType2 === 'password') {
                    this.pwdType2 = ''
                } else {
                    this.pwdType2 = 'password'
                }
            },
        }
    }
</script>
<style>
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