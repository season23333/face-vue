<template>
    <div id="service">
        <el-container>
            <el-header id="header">
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="16%">
                    <Aside></Aside>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Aside from "../components/comman/Aside"
    import Header from "../components/comman/Header"

    export default {
        name: "Service",
        components: {
            Aside,
            Header
        }
    }
</script>

<style scoped>

</style>
