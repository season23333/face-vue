<template>
    <div style="height: 100%                                                                                                                                                                                                                                                                                                                                               ">
        <el-row :gutter="20" style="height: 15%;margin-bottom: 3.2%">
            <el-col :span="6">
                <el-container>
                    <section class="panel">
                        <el-container>
                            <div>
                                <div class="symbol" style="background: #6CCAC9">
                                    <el-container>
                                        <img src="../assets/icon/user.png" class="icon-user"
                                             style="height: 50% ; width: 50%">
                                    </el-container>
                                </div>
                                <div class="value" style="padding-top: 10px">
                                    <h3 style="font-size: 45px ">{{free_num}}</h3>
                                    <p style="margin-top: 2px">空闲会议室</p>
                                </div>
                            </div>

                        </el-container>
                    </section>
                </el-container>
            </el-col>
            <el-col :span="6">
                <el-container>
                    <section class="panel">
                        <el-container>
                            <div class="symbol" style="background: #FF6C60">
                                <el-container>
                                    <img src="../assets/icon/meeting.png" class="icon-meeting"
                                         style="height: 70% ; width:70%">
                                </el-container>
                            </div>
                            <div class="value" style="padding-top: 10px">
                                <!--页面跳转传参测试-->
                                <h3 style="font-size: 45px ">{{this.$route.query.orderId}}</h3>
                                <p style="margin-top: 2px">正在召开会议</p>
                            </div>
                        </el-container>
                    </section>
                </el-container>
            </el-col>
            <el-col :span="6">
                <el-container>
                    <section class="panel">
                        <el-container>
                            <div class="symbol" style="background: #F8D347">
                                <el-container>
                                    <img src="../assets/icon/telephone.png" class="icon-telephone"
                                         style="height: 57% ; width:57%">
                                </el-container>
                            </div>
                            <div class="value" style="padding-top: 10px">
                                <h3 style="font-size: 45px ">2</h3>
                                <p style="margin-top: 2px">电话会议</p>
                            </div>
                        </el-container>
                    </section>
                </el-container>
            </el-col>
            <el-col :span="6">
                <el-container>
                    <section class="panel">
                        <el-container>
                            <div class="symbol" style="background: #57C8F2">
                                <el-container>
                                    <img src="../assets/icon/label.png" class="icon-telephone"
                                         style="height: 55% ; width:55%">
                                </el-container>
                            </div>
                            <div class="value" style="padding-top: 10px">
                                <h3 style="font-size: 45px ">5</h3>
                                <p style="margin-top: 2px">我的会议</p>
                            </div>
                        </el-container>
                    </section>
                </el-container>
            </el-col>

        </el-row>
        <el-row :gutter="40" style="margin-top: 0.8%;height: 45%">
            <el-col :span="10">
                <div class="grid-content">
                    <el-card class="box-card" style="width: 100% ; height: 295px " shadow="always">
                        <div slot="header" class="clearfix" style="text-align: left">
                            <i class="el-icon-tickets"></i>&nbsp;
                            <span style="font-size: 1.5em ; font-weight: bold ">最新公告</span>
                        </div>
                        <!--<div v-for="o in 4" :key="o" class="text item">-->
                        <!--{{'列表内容 ' + o }}-->
                        <!--</div>-->
                        <div style="text-align: left ; padding-top: 2%">
                            <span style="font-size: 17px ; color: grey ">我们要隆重召开第一次会议了! <small
                                    style="margin-left: 33%">2019.3.1</small></span><br><br>
                            <span style="font-size: 17px ; color: grey">我们要隆重召开第一次会议了! <small
                                    style="margin-left: 33%">2019.3.1</small></span><br><br>
                            <span style="font-size: 17px ; color: grey">我们要隆重召开第一次会议了! <small
                                    style="margin-left: 33%">2019.3.1</small></span><br><br>
                            <span style="font-size: 17px ; color: grey">我们要隆重召开第一次会议了! <small
                                    style="margin-left: 33%">2019.3.1</small></span><br><br>
                            <span style="font-size: 17px ; color: grey">我们要隆重召开第一次会议了! <small
                                    style="margin-left: 33%">2019.3.1</small></span><br><br>
                        </div>

                    </el-card>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content">
                    <el-card class="box-card" style="width: 100% ; height: 295px" shadow="always">
                        <div slot="header" class="clearfix" style="text-align: left">
                            <i class="el-icon-edit-outline"></i>&nbsp;
                            <span style="font-size: 1.5em ; font-weight: bold ">常见问题</span>
                        </div>
                        <div style="text-align: left">
                            <el-tag size="small">Q</el-tag>
                            <span style="font-size: 16px">
                                会议室预约管理系统能干什么?
                            </span>
                            <br>
                            <el-tag size="small" type="info" style="margin-top: 1% ">A</el-tag>
                            <span style="font-size: 16px ; color: darkgrey">
                                可以按时间或日期快速预约会议，也可以通过向导推荐准确预约会议。支持临时会议...
                            </span>
                            <br><br>
                            <el-tag size="small">Q</el-tag>
                            <span style="font-size: 16px">
                                会议室预约管理系统能干什么?
                            </span>
                            <br>
                            <el-tag size="small" type="info" style="margin-top: 1% ">A</el-tag>
                            <span style="font-size: 16px ; color: darkgrey">
                                可以按时间或日期快速预约会议，也可以通过向导推荐准确预约会议。支持临时会议...
                            </span>
                            <br><br>
                            <el-tag size="small">Q</el-tag>
                            <span style="font-size: 16px">
                                会议室预约管理系统能干什么?
                            </span>
                            <br>
                            <el-tag size="small" type="info" style="margin-top: 1% ">A</el-tag>
                            <span style="font-size: 16px ; color: darkgrey">
                                可以按时间或日期快速预约会议，也可以通过向导推荐准确预约会议。支持临时会议...
                            </span>
                            <br><br>
                        </div>
                    </el-card>
                </div>

            </el-col>
        </el-row>
        <div style="width: 80%;margin-left: 10%;margin-top: 2.8%">
            <blockquote style="font-size: 1.83em ; text-align: left ">
                <span style="font-family: 微软雅黑 ; font-style: italic ; margin-left: 6%">
                    字典里最重要的三个词，就是意志、工作、等待。<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我将要在这三块基石上建立我成功的金字塔。——巴斯德

                </span>
            </blockquote>
        </div>
    </div>
</template>

<script>
    import {getFreeRoom} from '../api/room'
    import {formatDate} from "../util/formatDate";

    export default {
        name: "Card",
        data() {
            return {
                free_num: 0,
                timer: null,
                date: new Date()
            }
        },
        created() {
            // console.log(formatDate(this.date, 'yyyy-MM-dd hh:mm:ss'));
            this.getList();
            this.timer = setInterval(() =>{
                this.getList()
            },1000* 20);

        },
        methods: {
            getList() {
                getFreeRoom().then(response => {
                    this.free_num = response.data.data;
                    console.log(response.data);
                })
            }
        }
    }
</script>

<style scoped>

    .shadow {
        -webkit-box-shadow: #666 0px 0px 10px;
        -moz-box-shadow: #666 0px 0px 10px;
        box-shadow: #666 0px 0px 10px;
    }

    .icon-user {

        margin-top: 20%;
        margin-left: 25%;
    }

    .icon-meeting {

        margin-top: 10%;
        margin-left: 16%;
    }

    .icon-telephone {

        margin-top: 16%;
        margin-left: 23%;
    }

    .panel {
        background-color: white;
        margin-bottom: 0;
        border-radius: 4px;
        height: 100%;
        width: 100%;
    }

    .symbol {
        width: 40%;
        padding: 2px 1px;
        border-radius: 4px 0px 0px 4px;
        display: inline-block;
        text-align: center;
        height: 100px;
    }

    .terques {
        background: #6CCAC9;
    }

    .red {
        background: #FE8D84;
    }

    .yellow {
        background: #6CCAC9;
    }

    .blue {
        background: #6CCAC9;
    }

    .value {
        width: 58%;;
        padding-top: 0;
        float: right;
        display: inline-block;
        text-align: center;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }

    span:hover {
        color: darkcyan;
    }

    @import url(https://fonts.googleapis.com/css?family=Roboto);
    blockquote {
        color: darkgrey;
        /*background-color: #eae6f3;*/
        /*border-left: 1em solid #5236a0;*/
        padding: 1em 1.5em 1em 1.5em;
        position: relative;
        font-family: 'Roboto', sans-serif;
        line-height: 150%;
        text-indent: 35px;
    }

    blockquote:before {
        color: lightgrey;
        content: "\201C";
        font-size: 5em;
        position: absolute;
        left: -15px;
        top: 40px;
        line-height: 0.1em;
    }

    blockquote:after {
        color: lightgray;
        content: "\201D";
        font-size: 5em;
        position: absolute;
        right: 15px;
        bottom: 0em;
        line-height: 0.1em;
    }
</style>
