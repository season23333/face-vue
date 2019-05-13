<template>
    <el-container id="container" style="background: #008080">
        <el-col :xs="4" :sm="4" :lg="2">
            <img src="../../assets/icon/logo-meeting.png" style="margin-left: 32%">
        </el-col>
        <el-col :xs="16" :sm="16" :lg="19" id="col-18">
            <h3 style="font-size: 1.7em;margin-top: 14px">会议室管理系统</h3>
        </el-col>
        <el-col :xs="2" :sm="1" :lg="1">
            <br/>
            <!--系统消息-->
            <el-dropdown>
                <!--这里要后端传数据来判断是否有未读消息-->
                <el-badge is-dot class="item">
                    <i class="el-icon-bell"></i>
                </el-badge>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <span style="display:block;" @click="sysMessage">系统通知</span>
                    </el-dropdown-item>
                    <!--<a href="">-->
                    <!--<el-dropdown-item>-->
                    <!--狮子头(2)-->
                    <!--</el-dropdown-item>-->
                    <!--</a>-->
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        <el-col :xs="2" :sm="2" :lg="1">
            <br/>
            <!--用户设置-->
            <el-dropdown>
                <el-badge class="item">
                    <i class="el-icon-setting"></i>
                </el-badge>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <span style="display:block;" @click="myMeeting">我的会议</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span style="display:block;" @click="profile">个人信息</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span style="display:block;" @click="logout">登出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        <!--<el-col :span="1">-->
        <!--<a href="/test">-->
        <!--<img style="height: 50%;margin-top: 27%" src="../../assets/icon/return.png"/>-->
        <!--</a>-->
        <!--</el-col>-->
        <Profile v-if="dialogVisible === true" v-bind:dialogVisible = "dialogVisible" v-on:success="success(res)"></Profile>
    </el-container>
</template>

<script>
    import Profile from '../../views/Profile'
    export default {
        name: "Header.vue",
        components:{
            Profile
        },
        data() {
            return {
                dialogVisible: false
            };
        },
        methods: {
            //是否弹出对话框
            success(res){
                this.dialogVisible = res;
            },
            //登出后端接口未测试
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            },
            //系统通知页面跳转
            sysMessage() {
                this.$router.push('/notification');
            },
            myMeeting() {
                this.$router.push('/mymeeting');
            },
            profile() {
                this.dialogVisible = true;
                // this.$router.push('/profile');
            }
        }
    }
</script>

<style scoped>
    #container {
        height: 100%;
        color: aliceblue;
    }

    #col-18 {
        text-align: left;
    }

    #col-18 span {
        font-size: large;
    }

    i {
        font-size: 180%;
        color: white;
    }

    img {
        height: 80%;
        margin-top: 5%;
    }

    a {
        text-decoration: none;
    }
</style>
