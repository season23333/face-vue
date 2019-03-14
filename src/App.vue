<template>
    <div id="app" style="position:absolute; left:0; top:0; width:100%;height:100%;">
        <router-view></router-view>
        <!--<el-container style="background: red;height: 100%">-->
            <!--<el-header id="header" style="background: white">-->
                <!--<Header></Header>-->
            <!--</el-header>-->
            <!--<el-container>-->
                <!--<el-aside width="16%" style="background: yellow">-->
                    <!--<Aside></Aside>-->
                <!--</el-aside>-->
                <!--<el-main style="background: green">-->
                    <!--<router-view></router-view>-->
                <!--</el-main>-->
            <!--</el-container>-->
        <!--</el-container>-->
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {

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

    html {
        height: 100%;
    }

    body {
        margin: 0;
        height: 100%;
    }

    #header {
        padding: 0;
    }
</style>
