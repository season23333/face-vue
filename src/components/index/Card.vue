<template>
    <div style="height: 100%                                                                                                                                                                                                                                                                                                                                                    ">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-container>
                    <section class="panel">
                        <el-container>
                            <div>
                                <div class="symbol" style="background: #6CCAC9">
                                    <el-container>
                                        <img src="../../assets/icon/user.png" class="icon-user"
                                             style="height: 50% ; width: 50%">
                                    </el-container>
                                </div>
                                <div class="value" style="padding-top: 10px">
                                    <h3 style="font-size: 45px ">{{num}}</h3>
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
                                    <img src="../../assets/icon/meeting.png" class="icon-meeting"
                                         style="height: 70% ; width:70%">
                                </el-container>
                            </div>
                            <div class="value" style="padding-top: 10px">
                                <h3 style="font-size: 45px ">{{ num }}</h3>
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
                                    <img src="../../assets/icon/telephone.png" class="icon-telephone"
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
                                    <img src="../../assets/icon/label.png" class="icon-telephone"
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
        <br>
        <br>
        <el-row :gutter="40">
            <el-col :span="10">
                <div class="grid-content">
                    <el-card class="box-card" style="width: 100% ; height: 455px " shadow="always">
                        <div slot="header" class="clearfix" style="text-align: left">
                            <i class="el-icon-tickets"></i>&nbsp;
                            <span style="font-size: 1.2em ; font-weight: bold ">最新公告</span>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content">
                    <el-card class="box-card" style="width: 100% ; height: 455px" shadow="always">
                        <div slot="header" class="clearfix" style="text-align: left">
                            <i class="el-icon-edit-outline"></i>&nbsp;
                            <span style="font-size: 1.2em ; font-weight: bold ">我的会议</span>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {text} from '../../api/table'

    export default {
        name: "Card",
        data() {
            return {
                num: 0,
            }
        },
        created() {
            this.getList();
            console.log(text);
        },
        methods:{
            getList(){
                text().then(response=>{
                    this.num = response.data;
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
</style>



















