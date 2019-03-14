<template>
    <div id="service" style="height: 100%">
        <el-container style="height: 100%">
            <el-header id="header">
                <Header></Header>
            </el-header>
            <el-container style="height: 100%">
                <el-aside width="16%">
                    <Aside></Aside>
                </el-aside>
                <el-main style="background: #F6F7FA;height: 100%">
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

<style>
    html{
        height: 100%;
    }
    body{
        height: 100%;
    }
</style>
