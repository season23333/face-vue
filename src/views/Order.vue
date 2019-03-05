<template>
    <div id="order">
        <el-container>
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
