<template>
    <div id="app">
        <router-view></router-view>
        <!--<el-container>-->
            <!--<el-header id="header">-->
                <!--<Header></Header>-->
            <!--</el-header>-->
            <!--<el-container>-->
                <!--<el-aside width="16%">-->
                    <!--<Aside></Aside>-->
                <!--</el-aside>-->
                <!--<el-main>-->
                    <!--<router-view></router-view>-->
                <!--</el-main>-->
            <!--</el-container>-->
        <!--</el-container>-->
    </div>
</template>

<script>
    import Header from './components/comman/Header'
    import Aside from './components/comman/Aside'

    export default {
        name: 'app',
        components: {
            Header,
            Aside
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    body {
        margin: 0;
    }

    #header {
        padding: 0;
    }
</style>
