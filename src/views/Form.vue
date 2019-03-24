<template>
    <div class="vol-data" style="width: 100% ; height: 100%">

        <div class="charts" style="width:100% ; height:100%">
            <el-row>
                <el-col :span="10">
                    <div id="myChart" :style="{width:'100%',height:'300px'}">
                    </div>
                    <h3>
                        这是一个统计图
                    </h3>
                </el-col>
                <el-col :span="14">
                    <div id="anotherChart" :style="{width:'100%',height:'300px'}">
                    </div>
                    <h3>
                        这是另一个统计图
                    </h3>
                </el-col>
            </el-row>
            <!--<el-row>-->
                <!--<el-col :span="10">-->
                    <!--<div id="pieChart" :style="{width:'100%',height:'300px'}">-->
                    <!--</div>-->
                    <!--<h3>-->
                        <!--这还是一个统计图-->
                    <!--</h3>-->
                <!--</el-col>-->
                <!--<el-col>-->

                <!--</el-col>-->
            <!--</el-row>-->


        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: 'Form',
        data() {
            return {}
        },
        mounted() {
            /*ECharts图表*/
            var myChart = echarts.init(document.getElementById('myChart'));
            myChart.setOption({
                // title: {
                //     text: '一个统计图',
                //     x: '15%'
                // },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: false, readOnly: false},
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: {show: false},
                        saveAsImage: {show: false}
                    }
                },
                calculable: true,
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['50%', '50%'],
                        roseType: 'area',

                        data: [
                            {value: 10, name: 'rose1'},
                            {value: 5, name: 'rose2'},
                            {value: 15, name: 'rose3'},
                            {value: 25, name: 'rose4'},
                            {value: 20, name: 'rose5'},
                            {value: 35, name: 'rose6'},
                            {value: 30, name: 'rose7'},
                            {value: 40, name: 'rose8'}
                        ]
                    }
                ]
            });
            var anotherChart = echarts.init(document.getElementById('anotherChart'));
            anotherChart.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            });
            // var pieChart = echarts.init(document.getElementById('pieChart'));
            // pieChart.setOption({
            // })
        }
    }

</script>

<style scoped>

</style>