<template>
    <el-container style="height: 100%">
        <div>
            <el-button plain @click="dialogVisible = true">新增预定</el-button>
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">

                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" prop="region">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-row>
                        <el-form-item label="活动日期" prop="date1">

                            <el-date-picker default-value="" type="date" placeholder="选择日期"
                                            :picker-options="pickerOptions1" v-model="form.date1"
                                            style="width: 80%; "></el-date-picker>

                        </el-form-item>
                        <el-form-item label="活动时间" prop="date2">

                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"
                                            style="width: 80%;"></el-time-picker>

                        </el-form-item>
                    </el-row>

                    <el-form-item label="活动形式" prop="desc">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-form>


                <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary"
                                           @click="dialogVisible = false ; onSubmit(form)">确 定</el-button>
                            </span>
            </el-dialog>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%"
                height="400"
                border
                id="table"
                :cell-class-name="cellClassName"
                :header-cell-style="{background:'#E6F2F2'}">


            <el-table-column
                    label="详情"
                    fixed
                    width="60"
                    type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="会议室借用时间段">
                            <span>{{ props.row.time }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    fixed
                    prop="id"
                    label="会议室编号"
                    width="150"
                    align="center">
            </el-table-column>
            <el-table-column label="08:00" align="center">
                <el-table-column
                        prop="time0800"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0800 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0815"
                        label="15"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0815 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0830"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time0845"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
            <el-table-column label="09:00" align="center">
                <el-table-column
                        prop="time0900"
                        label="00"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time0915"
                        label="15"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time0930"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time0945"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
            <el-table-column label="10:00" align="center">
                <el-table-column
                        prop="time1000"
                        label="00"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1015"
                        label="15"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1030"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1045"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
            <el-table-column label="11:00" align="center">
                <el-table-column
                        prop="time1100"
                        label="00"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1115"
                        label="15"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1130"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1145"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
            <el-table-column label="12:00" align="center">
                <el-table-column
                        prop="time1200"
                        label="00"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1215"
                        label="15"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1230"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1245"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
            <el-table-column label="13:00" align="center">
                <el-table-column
                        prop="time1300"
                        label="00"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1315"
                        label="15"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1330"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1345"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
            <el-table-column label="14:00" align="center">
                <el-table-column
                        prop="time1400"
                        label="00"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1415"
                        label="15"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1430"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1445"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
            <el-table-column label="15:00" align="center">
                <el-table-column
                        prop="time1500"
                        label="00"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1515"
                        label="15"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1530"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1545"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
            <el-table-column label="16:00" align="center">
                <el-table-column
                        prop="time1600"
                        label="00"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1615"
                        label="15"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1630"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1645"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
            <el-table-column label="17:00" align="center">
                <el-table-column
                        prop="time1700"
                        label="00"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1715"
                        label="15"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1730"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1745"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
            <el-table-column label="18:00" align="center">
                <el-table-column
                        prop="time1800"
                        label="00"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1815"
                        label="15"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1830"
                        label="30"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="time1845"
                        label="45"
                        width="40">
                </el-table-column>
            </el-table-column>
        </el-table>

    </el-container>
</template>

<script>
    import '@/util/mock'
    import axios from 'axios';

    export default {
        name: "Order",
        // components: {
        //     // Header,
        //     Main,
        // },
        data() {
            return {
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                dialogVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                tableData: []

            };
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {
                    });
            },
            onSubmit(form) {
                console.log(form.date1);
                this.$refs.form.resetFields();
            },
            cellClassName({row, column, rowIndex, columnIndex}) {
                if (columnIndex > 1) {
                    return 'test'
                } else {
                    return 'xiaowangshixiaoshazi'
                }
            }

        },
        mounted() {
            // axios.get('/list').then(res => {
            //     this.text = res.data.tableData;
            //     console.log(res);
            // })
            axios.get('/list').then(res => {
                this.tableData = res.data.tableData;
            })
        }
    }
</script>

<style>
    .el-tabs {
        width: 100%;
    }

    #el-col-2 {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: right;
        font-size: 15px;
        margin: 8px 0;
    }

    #table {
        margin-top: 20px;
    }

    .el-table .used {
        background: #FAEECC;
        width: 100%;
        height: 100%;
        /*width: 9px;*/
        /*height: 18px;*/
        /*border-right:2px solid #EA7669;*/
        /*border-bottom:2px solid #EA7669;*/
        /*transform: rotate(40deg);*/
        /*margin-left: 30%;*/

    }

    #table .test {
        padding: 0;
    }

    .el-table .test .cell {
        padding: 0;
        width: 100%;
        height: 40px;
    }

    .el-table .xiaowangshixiaoshazi {
        padding: 8px;
        background: #E6F2F2;
    }
</style>
