<template>
    <el-col :span="24">
        <!--:default-active="$route.path"-->
        <el-menu
                :default-active="activeMenuIndex()"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                active-text-color="#008080"
                mode="vertical"
                router>
            <el-menu-item index="/index">
                <i class="el-icon-menu"></i>
                <span slot="title">主页 &nbsp; &nbsp; &nbsp;</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>会议预定</span>
                </template>
                <el-menu-item index="/order">快速预定</el-menu-item>
                <el-menu-item index="/guide">向导预定</el-menu-item>
            </el-submenu>
            <el-menu-item index="/managemeeting" v-show="$store.state.roles === 2||$store.state.roles === 0">
                <i class="el-icon-setting"></i>
                <span slot="title" >会议管理</span>
            </el-menu-item>
            <el-menu-item index="/Form">
                <i class="el-icon-menu"></i>
                <span slot="title">数据统计</span>
            </el-menu-item>
            <el-submenu index="3" v-show="$store.state.roles === 0">
                <template slot="title">
                    <i class="el-icon-view"></i>
                    <span>系统管理</span>
                </template>
                <el-menu-item index="/manageroom">会议室管理</el-menu-item>
                <el-menu-item index="/managepeople">用户管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="/hide" style="visibility: hidden">
            </el-menu-item>
            <!--<el-submenu index="4">-->
            <!--<template slot="title">-->
            <!--<i class="el-icon-edit"></i>-->
            <!--<span>个人中心</span>-->
            <!--</template>-->
            <!--<el-menu-item index="/mymeeting">我的会议</el-menu-item>-->
            <!--<el-menu-item index="/notification">查看消息</el-menu-item>-->
            <!--<el-menu-item index="/profile">修改资料</el-menu-item>-->
            <!--</el-submenu>-->
        </el-menu>
    </el-col>
</template>

<script>
    export default {
        name: "Aside.vue",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            activeMenuIndex() {
                if (this.$route.path === '/mymeeting' || this.$route.path === '/notification') {
                    return '/hide';
                } else {
                    return this.$route.path;
                }
            }
        }
    }
</script>

<style scoped>

</style>
