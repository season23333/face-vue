<template>
    <el-dialog title="个人信息" :visible.sync="dialogFormVisible" width="500px" :before-close="handleClose">
        <el-form :model="profileForm" label-width="80px">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="姓名" prop="realName">
                        <el-input v-model="profileForm.realName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item label="工号" prop="userID">
                        <el-input v-model="profileForm.userID" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="部门" prop="department">
                <el-input v-model="profileForm.department" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNumber">
                <el-input v-model="profileForm.phoneNumber" @focus="changeFlag()" @blur="changeFlag()">
                    <template v-if="flag===true" slot="append">
                        <i class="el-icon-edit" style="color: #008080"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="email" prop="email">
                <el-input v-model="profileForm.email" @focus="changeFlag1()" @blur="changeFlag1()">
                    <template v-if="flag1===true" slot="append">
                        <i class="el-icon-edit" style="color: #008080"></i>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <!--v-if="canSubimt === true"-->
            <el-button type="primary" @click="submit()">提 交</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {getUserInfo, updateUserInfo} from '../api/user'

    export default {
        props: ['dialogVisible'],
        name: "Profile",
        //watch不需要了，无论修改不修改，只要点保存就向后端发请求更新
        // watch: {
        //     profileForm: {//深度监听，可监听到对象、数组的变化
        //         handler(val, oldVal) {
        //             this.canSubimt = true;
        //         },
        //         deep: true
        //     }
        // },
        data() {
            return {
                canSubimt: false,
                flag: false,
                flag1: false,
                dialogFormVisible: true,
                profileForm: {
                    realName: '',
                    userID: '',
                    phoneNumber: '',
                    email: '',
                    department: '',
                },
                formLabelWidth: '120px',
                pwdType: 'password',
                phone:'',
                count:""
            }
        },
        created() {
            this.getProfile()
        },
        methods: {
            //获取用户信息
            getProfile() {
                getUserInfo().then(res => {
                    this.profileForm = res.data;
                    this.phone = res.data.phoneNumber;
                })
            },
            changeFlag() {
                if (this.flag === true) {
                    this.flag = false;
                } else {
                    this.flag = true;
                }
            },
            changeFlag1() {
                if (this.flag1 === true) {
                    this.flag1 = false;
                } else {
                    this.flag1 = true;
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.$emit('success', false);
                        done();
                    })
                    .catch(_ => {
                    });
            },
            submit() {
                updateUserInfo(this.profileForm.email, this.profileForm.phoneNumber).then(res => {
                    if (res.status === 0 && this.profileForm.phoneNumber === this.phone) {
                        this.$message({
                            message: '个人信息修改成功',
                            duration: 2000,
                            type: 'success'
                        })
                    }else if(res.status === 0 && this.profileForm.phoneNumber !== this.phone){
                        const TIME_COUNT = 3;
                        if(!this.timer){
                            this.count = TIME_COUNT;
                            this.$message({
                                message: '手机号修改成功，请重新登录,3秒钟后将跳转到登录页面',
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
            }
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


<!--<template>-->
<!--<div class="myblock">-->
<!--<h1 class="myheader">-->
<!--个人资料-->
<!--</h1>-->
<!--<ul style="padding: 0">-->
<!--<li class="myitem">-->
<!--<span class="mytitle">姓名</span>-->
<!--<div class="myprofile-input">-->
<!--<input placeholder="请输入姓名" class="myinput">-->
<!--</div>-->
<!--<div class="myaciton-box">-->
<!--<button class="mybtn">-->
<!--<i class="el-icon-edit" style="margin-right: 10px"></i>-->
<!--</button>-->
<!--<span style="font-size: 14px">修改</span>-->
<!--</div>-->
<!--</li>-->
<!--<li class="myitem">-->
<!--<span class="mytitle">姓名</span>-->
<!--</li>-->
<!--</ul>-->
<!--&lt;!&ndash;<div class="myname">&ndash;&gt;-->
<!--&lt;!&ndash;<h1>姓名</h1>&ndash;&gt;-->
<!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--&lt;!&ndash;<div class="mypadding">&ndash;&gt;-->
<!--&lt;!&ndash;<div class="myline">&ndash;&gt;-->
<!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--name: "Profile",-->
<!--data() {-->
<!--return {};-->
<!--},-->
<!--methods: {}-->
<!--}-->
<!--</script>-->

<!--<style >-->
<!--/*.mytitle {*/-->
<!--/*font-family: 微软雅黑;*/-->
<!--/*font-weight: 400;*/-->
<!--/*font-size: 1.75rem;*/-->
<!--/*color: #202124;*/-->
<!--/*text-align: center;*/-->
<!--/*margin: 0 0 20px 0;*/-->
<!--/*}*/-->

<!--/*.myblock {*/-->
<!--/*margin-left: 100px;*/-->
<!--/*border: #dadce0 solid 1px;*/-->
<!--/*border-radius: 8px;*/-->
<!--/*width: 1050px;*/-->
<!--/*height: 300px;*/-->
<!--/*}*/-->
<!--.myblock {-->
<!--position: relative;-->
<!--padding: 2.7rem 4rem 7rem;-->
<!--background-color: #fff;-->
<!--border-radius: 2px;-->
<!--box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);-->
<!--width: 750px;-->

<!--}-->

<!--/*.myline {*/-->
<!--/*border-top: #dadce0 1px solid;*/-->
<!--/*}*/-->

<!--.myheader {-->
<!--font-weight: 600;-->
<!--font-size: 1.4rem;-->
<!--color: #202124;-->
<!--text-align: left;-->
<!--margin-bottom: 20px;-->
<!--}-->

<!--/*.mypadding {*/-->
<!--/*padding-top: 24px;*/-->
<!--/*padding-left: 24px;*/-->
<!--/*padding-right: 24px;*/-->
<!--/*padding-bottom: 8px;*/-->
<!--/*}*/-->

<!--/*.myname {*/-->
<!--/*padding-bottom: 16px;*/-->
<!--/*padding-top: 15px;*/-->
<!--/*padding-left: 24px;*/-->
<!--/*padding-right: 24px;*/-->
<!--/*}*/-->
<!--.myitem{-->
<!--display: flex;-->
<!--align-items: center;-->
<!--padding: 2rem 0;-->
<!--border-top: 1px solid #f1f1f1;-->
<!--margin-bottom: 0;-->
<!--}-->
<!--.mytitle{-->
<!--font-size: 16px !important;-->
<!--color: #333;-->
<!--width: 10rem;-->
<!--text-align: left;-->
<!--}-->
<!--.myprofile-input{-->
<!--display: flex;-->
<!--justify-content: flex-end;-->
<!--flex: 1;-->
<!--}-->
<!--.myinput{-->
<!--flex: 1;-->
<!--display: inline-block;-->
<!--color: #909090;-->
<!--font-size: 16px;-->
<!--border: none;-->
<!--outline: none;-->
<!--}-->
<!--.myaciton-box{-->
<!--margin-left: 1rem;-->
<!--}-->
<!--.mybtn{-->
<!--font-size: 12px;-->
<!--}-->
<!--</style>-->
