<template>
    <div>
        <el-table
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
                    prop="address"
                    label="会议地点"
            >
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
                            v-if="currentTime > scope.row.date"
                            size="mini"
                            type="danger"
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
    </div>

</template>

<script>
    export default {
        name: "MyMeeting",
        created(){
            for(var i = 0; i < this.tableData.length; i++){
                if(this.tableData[i].tag === 1){
                    this.tableData[i].tag = '通过';
                }else{
                    this.tableData[i].tag = '不通过';
                }
                console.log(this.tableData[i].tag);
            }
            this.currentTime = this.format(new Date(), "yyyy-MM-dd");
            console.log(this.currentTime);
            console.log(this.tableData[0].date);

        },
        data() {
            return {
                currentTime: '',
                tableData: [{
                    date: '2019-05-02',
                    name: '项目构思',
                    address: '综合楼A417',
                    tag: 1
                }, {
                    date: '2019-03-04',
                    name: '项目愿景',
                    address: '综合楼A412',
                    tag: 0
                }, {
                    date: '2019-03-01',
                    name: '质量属性',
                    address: '南教218',
                    tag: 1
                }, {
                    date: '2019-03-03',
                    name: '需求分析',
                    address: '南堂412',
                    tag: 1
                }]
            }
        },
        methods: {

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
            format(date, fmt) {
                let o = {
                    "M+": date.getMonth() + 1, //月份
                    "d+": date.getDate(), //日
                    "H+": date.getHours(), //小时
                    "m+": date.getMinutes(), //分
                    "s+": date.getSeconds(), //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (let k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
        }
    }
</script>

<style scoped>

</style>