<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-container>
                    <section class="panel">
                        <el-container>
                            <div class="symbol terques" >
                                <el-container >
                                    <img src="../../assets/icon/user.png" class="icon-user" style="height: 50% ; width: 50%">
                                </el-container>
                            </div>
                            <div class="value" style="padding-top: 10px">
                                <h3 style="font-size: 45px ">5</h3>
                                <p style="margin-top: 2px">空闲会议室</p>
                            </div>
                        </el-container>
                    </section>
                </el-container>
            </el-col>
            <el-col :span="6">
                <el-container>
                    <section class="panel">
                        <el-container>
                            <div class="symbol red">
                                <el-container>
                                    <img src="../../assets/icon/meeting.png" class="icon-meeting" style="height: 70% ; width:70%">
                                </el-container>
                            </div>
                            <div class="value" style="padding-top: 10px">
                                <h3 style="font-size: 45px ">1</h3>
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
                            <div class="symbol yellow">
                                <el-container>
                                    <img src="../../assets/icon/telephone.png" class="icon-telephone" style="height: 55% ; width:55%">
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
                            <div class="symbol blue">
                                <el-container>
                                    <i class="iconfont icon-user" style="font-size: 60px"></i>
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
        <el-row :gutter="35">
            <el-col :span="10">
                <el-row :gutter="0">
                    <el-col :span="2">
                        <i class="el-icon-tickets" style="margin-top: 20px"></i>
                    </el-col>
                    <el-col :span="21">
                        <h3 style="text-align: left">最新公告</h3>
                    </el-col>
                </el-row>

                <el-card class="box-card" style="width: 100%">
                    <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>
            </el-col>

            <el-col :span="14">
                <el-row :gutter="0">
                    <el-col :span="2">
                        <i class="el-icon-tickets" style="margin-top: 20px"></i>
                    </el-col>
                    <el-col :span="21">
                        <h3 style="text-align: left">待审核预约</h3>
                    </el-col>
                </el-row>

                <el-card class="box-card" style="width: 100%">
                    <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <br>
        <el-row :gutter="40">
            <el-col :span="10">
                <div class="grid-content">
                    <el-card class="box-card" style="width: 100% ; height: 455px">
                        <div slot="header" class="clearfix" style="text-align: left">
                            <i class="el-icon-edit-outline" ></i>&nbsp;
                            <span style="font-size: 1.2em ; font-weight: bold ">会议安排</span>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="14">
                <div >



                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Card",
    }
</script>

<style scoped>
    .icon-user{

        margin-top: 20%;
        margin-left: 25%;
    }
    .icon-meeting{

        margin-top: 10%;
        margin-left: 16%;
    }
    .icon-telephone{

        margin-top: 19%;
        margin-left: 24%;
    }
    .panel{
        background-color: #FFFFFF;
        margin-bottom: 0;
        border-radius: 4px;
        height: 100%;
        width: 100%;
    }

    .symbol{
        width: 40%;
        padding: 2px 1px;
        border-radius: 4px 0px 0px 4px;
        display: inline-block;
        text-align: center;
        height: 100px;
    }

    .terques{
        background: #6ccac9;
    }

    .red{
        background: #ff6c60;
    }

    .yellow{
        background: #f8d347;
    }

    .blue{
        background: #57c8f2;
    }
    .value{
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



















