<template>
    <div class="myblock">
        <h1 class="myheader">
            个人资料
        </h1>
        <ul style="padding: 0">
            <li class="myitem">
                <span class="mytitle">姓名</span>
                <div class="myprofile-input">
                    <input placeholder="请输入姓名" class="myinput">
                </div>
                <div class="myaciton-box">
                    <button class="mybtn">
                        <i class="el-icon-edit" style="margin-right: 10px"></i>
                    </button>
                    <span style="font-size: 14px">修改</span>
                </div>
            </li>
            <li class="myitem">
                <span class="mytitle">姓名</span>
            </li>
        </ul>
        <!--<div class="myname">-->
            <!--<h1>姓名</h1>-->
        <!--</div>-->
        <!--<div class="mypadding">-->
            <!--<div class="myline">-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {};
        },
        methods: {}
    }
</script>

<style >
    /*.mytitle {*/
        /*font-family: 微软雅黑;*/
        /*font-weight: 400;*/
        /*font-size: 1.75rem;*/
        /*color: #202124;*/
        /*text-align: center;*/
        /*margin: 0 0 20px 0;*/
    /*}*/

    /*.myblock {*/
    /*margin-left: 100px;*/
    /*border: #dadce0 solid 1px;*/
    /*border-radius: 8px;*/
    /*width: 1050px;*/
    /*height: 300px;*/
    /*}*/
    .myblock {
        position: relative;
        padding: 2.7rem 4rem 7rem;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        width: 750px;

    }

    /*.myline {*/
        /*border-top: #dadce0 1px solid;*/
    /*}*/

    .myheader {
        font-weight: 600;
        font-size: 1.4rem;
        color: #202124;
        text-align: left;
        margin-bottom: 20px;
    }

    /*.mypadding {*/
        /*padding-top: 24px;*/
        /*padding-left: 24px;*/
        /*padding-right: 24px;*/
        /*padding-bottom: 8px;*/
    /*}*/

    /*.myname {*/
        /*padding-bottom: 16px;*/
        /*padding-top: 15px;*/
        /*padding-left: 24px;*/
        /*padding-right: 24px;*/
    /*}*/
    .myitem{
        display: flex;
        align-items: center;
        padding: 2rem 0;
        border-top: 1px solid #f1f1f1;
        margin-bottom: 0;
    }
    .mytitle{
        font-size: 16px !important;
        color: #333;
        width: 10rem;
        text-align: left;
    }
    .myprofile-input{
        display: flex;
        justify-content: flex-end;
        flex: 1;
    }
    .myinput{
        flex: 1;
        display: inline-block;
        color: #909090;
        font-size: 16px;
        border: none;
        outline: none;
    }
    .myaciton-box{
        margin-left: 1rem;
    }
    .mybtn{
        font-size: 12px;
    }
</style>