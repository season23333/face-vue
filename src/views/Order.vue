<template>
    <div id="order" style="height: 100%">
        <el-container style="height: 100%">
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <Main></Main>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Header from "@/components/order/Header";
    import Main from "@/components/order/Main";

    export default {
        name: "Order",
        components: {
            Header,
            Main,
        },
    }
</script>

<style scoped>

</style>
