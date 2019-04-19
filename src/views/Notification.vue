<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人消息" name="first">个人消息</el-tab-pane>
        <el-tab-pane label="系统消息" name="second">系统消息</el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "Notification",
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>

</style>