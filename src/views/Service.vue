<template>
    <!--<div class="outContainer">-->
    <!--<div class="inContainer">-->
    <div id="service" style="height: 100%">
        <el-container style="height: 100%">
            <el-header id="header">
                <Header></Header>
            </el-header>
            <el-scrollbar>
                <el-container style="height: 100%">
                    <el-aside width="16%">
                        <Aside></Aside>
                    </el-aside>
                    <el-main style="background: #F6F7FA"  v-bind:style="{height: height}">
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-scrollbar>
        </el-container>
    </div>
    <!--</div>-->
    <!--</div>-->
</template>

<script>
    import Aside from "../components/comman/Aside"
    import Header from "../components/comman/Header"

    export default {
        name: "Service",
        components: {
            Aside,
            Header
        },
        data() {
            return {
                height: '',
                msg: 'aaa'
            }
        },
        methods: {
            getHeight() {
                this.height = window.innerHeight - 60 + 'px';
                // console.log(this.height);
            }
        },
        created() {
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        }

    }
</script>

<style>
    html {
        height: 100%;
    }

    body {
        height: 100%;
    }

    /*.outContainer {*/
    /*width:100%;*/
    /*height:100%;*/
    /*!* border:2px solid orangered; *!*/
    /*overflow: hidden;*/
    /*position: relative;*/
    /*}*/
    /*.inContainer {*/
    /*overflow-x:hidden;*/
    /*overflow-y:scroll;*/
    /*position: absolute;  !*不能使用relative和fixed定位*!*/
    /*top:0;*/
    /*bottom:0;   !*相当于height:100%时的高度*!*/
    /*left: 0;*/
    /*right:-17px;  !*图层宽度大于width:100%,滚动条的宽度刚刚好被隐藏 *!*/
    /*}*/
    ::-webkit-scrollbar {
        display: none
    }
</style>
