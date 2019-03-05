<template>
    <el-table
            :data="tableData"
            style="width: 100%"
            max-height="250"
            border
            id="table"
            :cell-class-name="cellClassName">
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
            </el-table-column>
            <el-table-column
                    prop="time0815"
                    label="15"
                    width="40">
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
</template>

<script>
    /* eslint-disable no-unused-vars */

    export default {
        name: "Table",
        methods: {
            cellClassName({row, column, rowIndex, columnIndex}) {
                if ((columnIndex === 4 || columnIndex === 2 || columnIndex === 3) && (rowIndex === 2)) {
                    return 'used'
                }
            },
        },
        data() {
            return {
                tableData: [{
                    id: '100',
                    time: '无'
                }, {
                    id: '101',
                    time: '无'
                }, {
                    id: '102',
                    time: '08:00-08:45'
                }, {
                    id: '103',
                    time: '无'
                }, {
                    id: '104',
                    time: '无'
                }, {
                    id: '105',
                    time: '无'
                }, {
                    id: '106',
                    time: '无'
                }]
            }
        }
    }
</script>

<style>
    #table {
        margin-top: 20px;
    }

    .el-table .used {
        background: #008080;
    }
</style>
