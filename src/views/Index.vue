<template>
    <div>
        <div style="height: 100%                                                                                                                                                                                                                                                                                                                                               ">
            <el-row :gutter="20" style="height: 80px">
                <el-col :xs="12" :sm="12" :lg="6" style="margin-bottom: 20px">
                    <section class="panel">
                        <el-container>
                            <div class="symbol" style="background: #6CCAC9">
                                <img src="../assets/icon/user.png" class="icon-user" style="width: 57px;height: 57px">
                            </div>
                            <div class="value" style="padding-top: 10px">
                                <!--<h3 style="font-size: 45px ">{{free_num}}</h3>-->
                                <h3 style="font-size: 30px;margin: 10px">{{free_num}}</h3>
                                <p class="myinline" style="margin-top: 2px">空闲会议室</p>
                            </div>
                        </el-container>
                    </section>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" style="margin-bottom: 20px">
                    <section class="panel">
                        <el-container>
                            <div class="symbol" style="background: #FF6C60">
                                <img src="../assets/icon/meeting.png" class="icon-meeting"
                                     style="height: 67px ; width:67px">
                            </div>
                            <div class="value" style="padding-top: 10px">
                                <!--页面跳转传参测试-->
                                <!--<h3 style="font-size: 45px ">{{this.$route.query.orderId}}</h3>-->
                                <h3 style="font-size: 30px;margin: 10px">5</h3>
                                <p class="myinline" style="margin-top: 2px">正在召开会议</p>
                            </div>
                        </el-container>
                    </section>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" style="margin-bottom: 20px">
                    <section class="panel">
                        <el-container>
                            <div class="symbol" style="background: #F8D347">
                                <img src="../assets/icon/telephone.png" class="icon-telephone"
                                     style="height: 62px ; width:62px">
                            </div>
                            <div class="value" style="padding-top: 10px">
                                <!--<h3 style="font-size: 45px ">2</h3>-->
                                <h3 style="font-size: 30px;margin: 10px">5</h3>
                                <p class="myinline" style="margin-top: 2px">电话会议</p>
                            </div>
                        </el-container>
                    </section>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" style="margin-bottom: 20px">
                    <section class="panel">
                        <el-container>
                            <div class="symbol" style="background: #57C8F2">
                                <img src="../assets/icon/label.png" class="icon-te"
                                     style="height: 57px ; width:57px">
                            </div>
                            <div class="value" style="padding-top: 10px">
                                <h3 style="font-size: 30px;margin: 10px">5</h3>
                                <p class="myinline" style="margin-top: 2px">我的会议</p>
                            </div>
                        </el-container>
                    </section>
                </el-col>

            </el-row>

            <!--<div style="width: 80%;margin-left: 10%;margin-top: 2.8%">-->
            <!--<blockquote style="font-size: 1.83em ; text-align: left ">-->
            <!--<span style="font-family: 微软雅黑 ; font-style: italic ; margin-left: 6%">-->
            <!--字典里最重要的三个词，就是意志、工作、等待。<br>-->
            <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我将要在这三块基石上建立我成功的金字塔。——巴斯德-->

            <!--</span>-->
            <!--</blockquote>-->
            <!--</div>-->
        </div>
        <el-row>
            <el-col span="11">
                <div id="myPie" ref="myPie" style="margin-top: 30px"></div>
            </el-col>
            <el-col span="13">
                <div id="myChart" ref="myChart" style="float: left;margin-top: 30px"></div>
            </el-col>

        </el-row>
    </div>

</template>

<script>
    import {getFreeRoom} from '../api/room'
    import echarts from '@/util/echarts'
    import {getFormData,getPieData} from '../api/form';
    // import {getUserGroup} from '../api/user'
    // import {formatDate} from "../util/formatDate";

    export default {
        name: "Card",
        data() {
            return {
                free_num: 0,
                timer: null,
                date: new Date(),
                test: [320, 302, 301, 334, 390, 330, 320],
                cancelList: [],
                nameList: [],
                partList: [],
                rejectList: [],
                passList: [],
                apply: {
                    value: '',
                    name: ''
                },
                pass: {
                    value: '',
                    name: ''
                },
                reject: {
                    value: '',
                    name: ''
                },
                cancel: {
                    value: '',
                    name: ''
                },
                part: {
                    value: '',
                    name: ''
                },
            }
        },
        mounted(){
            getFormData().then(res => {
                console.log(res.data.cancelList);
                // this.cancelList = [].concat(res.data.cancelList);
                this.cancelList = res.data.cancelList;
                this.nameList = res.data.nameList;
                this.partList = res.data.partList;
                this.rejectList = res.data.rejectList;
                this.passList = res.data.passList;
            }).then(() => {
                // console.log(this.cancelList)
                this.draw();
            });
            getPieData().then(res => {
                console.log(res.data);
                this.apply = res.data.apply;
                this.pass = res.data.pass;
                this.reject = res.data.reject;
                this.cancel = res.data.cancel;
                this.part = res.data.part;
            }).then(() => {
                this.drawPie();
            })
        },
        created() {
            // getUserGroup().then(res =>{
            //     console.log(res.data)
            // });
            // console.log('角色');
            // console.log( this.$store.state.roles);
            this.getList();
            this.timer = setInterval(() => {
                this.getList()
            }, 1000 * 20);

        },
        methods: {
            getList() {
                getFreeRoom().then(response => {
                    this.free_num = response.data;
                    // console.log(response.data);
                })
            },
            draw() {
                // 实例化echarts对象
                var myChart = echarts.init(this.$refs.myChart, 'walden');
                // 绘制条形图
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['申请通过', '参与', '驳回', '取消']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        boundaryGap: [0.2, 0.2],
                        scale: true,
                        data: this.nameList
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            yAxisIndex: [0],
                            left: '93%',
                            // start: 0, //数据窗口范围的起始百分比
                            // end: 100
                            startValue: 0,
                            endValue: 7,//只显示7个数据
                        },
                        {
                            type: 'inside',
                            yAxisIndex: [0],
                            start: 0,
                            end: 36
                        }
                    ],
                    series: [
                        {
                            name: '申请通过',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    formatter: function (params) {
                                        if (params.value > 0) {
                                            return params.value;
                                        } else {
                                            return '';
                                        }
                                    }
                                }
                            },
                            data: this.passList
                        },
                        {
                            name: '参与',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    formatter: function (params) {
                                        if (params.value > 0) {
                                            return params.value;
                                        } else {
                                            return '';
                                        }
                                    }
                                }
                            },
                            data: this.partList
                        },
                        {
                            name: '驳回',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    formatter: function (params) {
                                        if (params.value > 0) {
                                            return params.value;
                                        } else {
                                            return '';
                                        }
                                    }
                                }
                            },
                            data: this.rejectList
                        },
                        {
                            name: '取消',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    formatter: function (params) {
                                        if (params.value > 0) {
                                            return params.value;
                                        } else {
                                            return '';
                                        }
                                    }
                                }
                            },
                            data: this.cancelList
                        },
                    ]
                })
            },
            drawPie() {
                // 实例化echarts对象
                var myChart = echarts.init(this.$refs.myPie);

                // 绘制条形图
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['通过', '驳回', '参与', '取消']
                    },
                    series: [
                        {
                            name: '状态',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],

                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter: function (params) {
                                        if (params.value > 0) {
                                            return params.name;
                                        } else {
                                            return '';
                                        }
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: this.apply.value, name: this.apply.name},
                                {value: this.part.value, name: this.part.name, selected: true},
                                // {value:1548, name:'搜索引擎'}
                            ]
                        },

                        {
                            name: '状态',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    // shadowBlur:3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        // abg: {
                                        //     backgroundColor: '#333',
                                        //     width: '100%',
                                        //     align: 'right',
                                        //     height: 22,
                                        //     borderRadius: [4, 4, 0, 0]
                                        // },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            data: [
                                {value: this.part.value, name: this.part.name},
                                {value: this.cancel.value, name: this.cancel.name},
                                {value: this.reject.value, name: this.reject.name},
                                {value: this.pass.value, name: this.pass.name},
                                // {value: 1048, name: '百度'},
                                // {value: 251, name: '谷歌'},
                                // {value: 147, name: '必应'},
                                // {value: 102, name: '其他'}
                            ]
                        }
                    ]
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

        margin-top: 19px;
        /*margin-left: 25%;*/
    }

    .icon-meeting {

        margin-top: 16px;
        /*margin-left: 16%;*/
    }

    .icon-telephone {

        margin-top: 19px;
        /*margin-left: 23%;*/
    }

    .icon-te {
        margin-top: 21px;
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

    .myinline {
        display:block;
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    }

    /*!*@import url(https://fonts.googleapis.com/css?family=Roboto);*!*/
    /*blockquote {*/
    /*color: darkgrey;*/
    /*!*background-color: #eae6f3;*!*/
    /*!*border-left: 1em solid #5236a0;*!*/
    /*padding: 1em 1.5em 1em 1.5em;*/
    /*position: relative;*/
    /*!*font-family: 'Roboto', sans-serif;*!*/
    /**/
    /*line-height: 150%;*/
    /*text-indent: 35px;*/
    /*}*/

    /*blockquote:before {*/
    /*color: lightgrey;*/
    /*content: "\201C";*/
    /*font-size: 5em;*/
    /*position: absolute;*/
    /*left: -15px;*/
    /*top: 40px;*/
    /*line-height: 0.1em;*/
    /*}*/

    /*blockquote:after {*/
    /*color: lightgray;*/
    /*content: "\201D";*/
    /*font-size: 5em;*/
    /*position: absolute;*/
    /*right: 15px;*/
    /*bottom: 0em;*/
    /*line-height: 0.1em;*/
    /*}*/
    #myChart {
        width: 100%;
        height: 500px;
        /*margin: 20px auto;*/
        /*border: 1px solid #CCC*/
    }
    #myPie {
        width: 100%;
        height: 500px;
        /*margin: 20px auto;*/
        /*border: 1px solid #CCC*/
    }
</style>
