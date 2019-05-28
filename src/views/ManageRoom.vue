<template>
    <div>
        <div>
            <el-button type="success" style="float: right;margin-right: 20px">添加</el-button>
            <el-input
                    placeholder="请输入内容"
                    style="width: 160px; float: right;margin-right: 20px;margin-bottom: 20px"
                    prefix-icon="el-icon-search"
                    v-model="input1">
            </el-input>
        </div>
        <el-table
                element-loading-text="Loading"
                ref="Table"
                :data="tableData"
                fit
                style="width: 100%">
            <el-table-column
                    prop="No"
                    align="center"
                    label="编号"
                    column-key="date"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="name"
                    label="名称"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="size"
                    label="容量"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="type"
                    label="类型"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="address"
                    label="地址"
            >
            </el-table-column>
            <!--<el-table-column-->
                    <!--align="center"-->
                    <!--label="详情">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-popover trigger="hover" placement="left">-->
                        <!--<p>地点: {{ scope.row.address }}</p>-->
                        <!--<div slot="reference" class="name-wrapper">-->
                            <!--<el-tag size="medium">详情</el-tag>-->
                        <!--</div>-->
                    <!--</el-popover>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                    width="300"
                    align="center"
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            round
                            size="mini"
                            @click="addPeople(scope.row.conferenceID)"
                            style="margin-right: 20px"
                    >删除
                    </el-button>
                    <el-button
                            size="mini"
                            type="success"
                            @click="handleDelete(scope.$index, scope.row.conferenceID)">修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--<div class="block" style="margin-top: 1.5%">-->
            <!--<el-pagination-->
                    <!--background=""-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page.sync="currentPage"-->
                    <!--:page-size="pageSize"-->
                    <!--layout="prev, pager, next, jumper"-->
                    <!--:total="total">-->
            <!--</el-pagination>-->
        <!--</div>-->
    </div>

</template>

<script>
    export default {
        name: "ManageRoom",
        data() {
            return {
                input1: '',
                tableData: [{
                    No: 1,
                    name: 'aaa',
                    size: 10,
                    type: 'bbb',
                    address: 'ccc',
                }]
            }
        },
        created() {

        },
        methods: {}
    }
</script>

<style scoped>

</style>