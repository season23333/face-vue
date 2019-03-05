<template>
    <el-col :span="24">
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                active-text-color="#008080"
                mode="vertical"
                router>
            <el-menu-item index="/index">
                <i class="el-icon-menu"></i>
                <span slot="title">主页</span>
            </el-menu-item>
            <el-menu-item index="/order">
                <i class="el-icon-document"></i>
                <span slot="title">预定会议</span>
            </el-menu-item>
            <el-menu-item index="/check">
                <i class="el-icon-setting"></i>
                <span slot="title">查看会议</span>
            </el-menu-item>
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
            }
        }
    }
</script>

<style scoped>

</style>
