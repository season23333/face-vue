<template>
    <el-container id="container" style="background: #008080">
        <el-col :span="2">
            <img src="../../assets/icon/logo-meeting.png" style="margin-left: 32%">
        </el-col>
        <el-col :span="18" id="col-18">
            <h3 style="font-size: 1.7em;margin-top: 1.4%">会议室管理系统</h3>
        </el-col>
        <el-col :span="1">
            <br/>
            <!--联系客服-->
            <el-dropdown>
                <el-badge is-dot class="item">
                    <i class="el-icon-message"></i>
                </el-badge>
                <el-dropdown-menu slot="dropdown">
                    <a href="">
                        <el-dropdown-item>
                            未读消息(1)
                        </el-dropdown-item>
                    </a>
                    <!--<a href="">-->
                    <!--<el-dropdown-item>-->
                    <!--狮子头(2)-->
                    <!--</el-dropdown-item>-->
                    <!--</a>-->
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        <el-col :span="1">
            <br/>
            <!--系统消息-->
            <el-dropdown>
                <el-badge is-dot class="item">
                    <i class="el-icon-bell"></i>
                </el-badge>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >
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
        <el-col :span="1">
            <br/>
            <!--用户设置-->
            <el-dropdown>
                <el-badge is-dot class="item">
                    <i class="el-icon-setting"></i>
                </el-badge>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <span style="display:block;" @click="logout">登出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        <el-col :span="1">
            <a href="/test">
                <img style="height: 50%;margin-top: 27%" src="../../assets/icon/return.png"/>
            </a>
        </el-col>
    </el-container>
</template>

<script>
    export default {
        name: "Header.vue",
        methods: {
            //登出后端接口未测试
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            },
            //系统通知页面跳转
            sysMessage(){
                this.$router.push('/notification');
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
