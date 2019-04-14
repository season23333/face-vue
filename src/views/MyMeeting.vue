<template>
    <div>
        <el-table
                v-loading="loading"
                element-loading-text="Loading"
                ref="filterTable"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    sortable
                    column-key="date"
            >
                <!--:filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"-->
                <!--:filter-method="filterHandler"-->
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="会议名称"
            >
            </el-table-column>
            <el-table-column
                    prop="building"
                    label="会议楼宇"
            >
            </el-table-column>
            <el-table-column
                    prop="room"
                    label="会议室"
            >
            </el-table-column>
            <el-table-column label="详情">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="left">
                        <p>开始时间: {{ scope.row.startTime }}</p>
                        <p>结束时间: {{ scope.row.endTime }}</p>
                        与会人：
                        <span v-for="item in scope.row.people.pname">{{ item }}&nbsp;</span>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">详情</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="状态"
                    :filters="[{ text: '通过', value: '通过' }, { text: '未通过', value: '未通过' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.tag === '通过' ? 'success' : 'danger'"
                            disable-transitions>{{scope.row.tag}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            v-if="scope.row.flag === 1"
                            size="mini"
                            type="danger"
                            disabled
                            @click="handleDelete(scope.$index, scope.row)">取消会议
                    </el-button>
                    <el-button
                            v-else
                            size="mini"
                            type="success"
                            @click="handleDelete(scope.$index, scope.row)">取消会议
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 1.5%">
            <el-pagination
                    background="#F6F7FA"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    import '@/util/mock'
    import {formatDate} from '../util/formatDate'
    import {getDetails} from '../api/table'
    import axios from 'axios';

    export default {
        name: "MyMeeting",
        data() {
            return {
                loading: false,//改好前后端交互后，这里默认应该是true
                currentPage: 1,//当前页，每次到我的会议页面会定位在这一页
                total: 1000,//数据总条数
                pageSize: 9,//每页显示条目个数
                pageNum: 1,//当前页，用来记录翻页后的当前页，传参用
                tableData: [{
                    date: '2019-05-02',
                    name: '项目构思',
                    building: '综合楼A',
                    room: '417',
                    startTime: '2019-05-02 11:00',
                    endTime: '2019-05-02 12:00',
                    people: {
                        pname: ['小王', '小白']
                    },
                    tag: 1,
                    flag: 0,
                }],
            }
        },
        created() {
            this.showDetails();
            // axios.get('/details').then(res => {
            //     this.tableData = res.data.tableData;
            //     this.test();
            // });
        },
        methods: {
            showDetails() {
                this.loading = true;
                getDetails(this.pageNum, this.pageSize).then(res => {
                    if (res.data.success) {
                        this.total = res.data.data.total;
                        this.users = res.dataList;
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.$message({
                            message: res.data.returnMsg,
                            type: 'error'
                        });
                    }
                })
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.getUser();
            },
            test() {
                var date = new Date();
                var min = date.getMinutes();
                date.setMinutes(min - 15);
                console.log(date);
                console.log(formatDate(date, 'yyyy-MM-dd hh:mm:ss'));
                var timestamp1 = Date.parse(formatDate(date, 'yyyy-MM-dd hh:mm:ss'));
                timestamp1 = timestamp1 / 1000;
                console.log('tableData:' + this.tableData.length);
                for (var i = 0; i < this.tableData.length; i++) {
                    console.log(i);
                    if (this.tableData[i].tag === 1) {
                        this.tableData[i].tag = '通过';
                    } else {
                        this.tableData[i].tag = '不通过';
                    }
                    console.log(this.tableData[i].tag);
                    var timestamp = Date.parse(this.tableData[i].startTime);
                    timestamp = timestamp / 1000;
                    console.log(timestamp);
                    if (timestamp > timestamp1) {
                        this.tableData[i].flag = 0;
                    } else {
                        this.tableData[i].flag = 1;
                    }
                }
            },
            open() {
                let time;
                axios.get('/details').then(res => {
                    time = res.data.time;
                });
                this.$alert('"this.time"', '标题名称', {
                    confirmButtonText: '确定',
                    dangerouslyUseHTMLString: true
                });
            },

            // formatter(row, column) {
            //     return row.address;
            // },
            filterTag(value, row) {
                return row.tag === value;
            },
            // filterHandler(value, row, column) {
            //     const property = column['property'];
            //     return row[property] === value;
            // },
            handleDelete(index, row) {
                console.log(index, row);
            },
        }
    }
</script>

<style scoped>

</style>