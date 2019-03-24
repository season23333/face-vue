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
                    :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                    :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="会议名称"
            >
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="会议地点"
                    :formatter="formatter">
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
                            size="mini"
                            type="danger"
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
        data() {
            return {
                tableData: [{
                    date: '2019-03-02',
                    name: '项目构思',
                    address: '综合楼A417',
                    tag: '通过'
                }, {
                    date: '2019-03-04',
                    name: '项目愿景',
                    address: '综合楼A412',
                    tag: '未通过'
                }, {
                    date: '2019-03-01',
                    name: '质量属性',
                    address: '南教218',
                    tag: '通过'
                }, {
                    date: '2019-03-03',
                    name: '需求分析',
                    address: '南堂412',
                    tag: '通过'
                }]
            }
        },
        methods: {

            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>

<style scoped>

</style>