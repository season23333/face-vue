<template>
    <div>
        <div>
            <el-button type="success" style="float: right;margin-right: 20px" @click="addRoom()">添加</el-button>
            <el-dialog
                    title="添加会议室"
                    :visible.sync="addDialog"
                    width="650px"
                    :before-close="handleClose">
                <el-form ref="form" :model="form" label-width="80px" class="demo-ruleForm" :inline="true"
                         :rules="rules">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="类型" prop="catalogue" style="">
                        <el-select v-model="type.name" prop="type.name"
                                   value-key="name" placeholder="请选择类型"
                                   clearable
                                   style="width: 180px"
                                   @change="selectType()"
                        >
                            <el-option
                                    v-for="item in type"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="容量" prop="capacity">
                        <el-input v-model="form.capacity" @keyup.native="number"></el-input>
                    </el-form-item>
                    <el-form-item label="会议楼宇" prop="building">
                        <el-select v-model="building.buildingID" prop="building.name"
                                   value-key="buildingID" placeholder="请选择楼宇"
                                   clearable
                                   style="width: 180px"
                                   @change="selectBuilding()"
                        >
                            <el-option
                                    v-for="item in building"
                                    :key="item.buildingID"
                                    :label="item.name"
                                    :value="item.buildingID"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="text-align: right">
                        <el-button @click="handleClose">取 消</el-button>
                        <el-button type="primary"
                                   @click="onSubmit()">确 定
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-input
                    placeholder="请输入内容"
                    style="width: 160px; float: right;margin-right: 20px;margin-bottom: 20px"
                    prefix-icon="el-icon-search"
                    @keyup.enter.native="onSearch"
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
                    prop="roomID"
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
                    prop="catalogue"
                    label="类型"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="capacity"
                    label="容量"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="building.name"
                    label="楼宇"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="building.address"
                    label="地址"
            >
            </el-table-column>
            <el-table-column
                    width="300"
                    align="center"
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            round
                            size="mini"
                            @click="deleteRoom"
                            style="margin-right: 20px"
                    >删除
                    </el-button>
                    <el-button
                            size="mini"
                            type="success"
                            @click="modifyRoom(scope.row.roomID)">修改
                    </el-button>
                    <el-dialog
                            title="添加会议室"
                            :visible.sync="modifyDialog"
                            width="650px"
                            :before-close="handleClose1">
                        <el-form ref="form" :model="modifyForm" label-width="80px" class="demo-ruleForm" :inline="true"
                                 :rules="rules">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="modifyForm.name"></el-input>
                            </el-form-item>

                            <el-form-item label="类型" prop="catalogue" style="">
                                <el-select v-model="type.name" prop="type.name"
                                           value-key="name" placeholder="请选择类型"
                                           clearable
                                           style="width: 180px"
                                           @change="selectType()"
                                >
                                    <el-option
                                            v-for="item in type"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="容量" prop="capacity">
                                <el-input v-model="form.capacity" @keyup.native="number"></el-input>
                            </el-form-item>
                            <el-form-item label="会议楼宇" prop="building">
                                <el-select v-model="building.buildingID" prop="building.name"
                                           value-key="buildingID" placeholder="请选择楼宇"
                                           clearable
                                           style="width: 180px"
                                           @change="selectBuilding()"
                                >
                                    <el-option
                                            v-for="item in building"
                                            :key="item.buildingID"
                                            :label="item.name"
                                            :value="item.buildingID"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item style="text-align: right">
                                <el-button @click="handleClose1">取 消</el-button>
                                <el-button type="primary"
                                           @click="modifySubmit()">确 定
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 1.5%">
            <el-pagination
                    background=""
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
    import {getAllRoom, getType} from "../api/room";
    import {getBuildingByAddress} from "../api/building"

    export default {
        name: "ManageRoom",
        data() {
            return {
                input1: '',
                tableData: [{
                    roomID: '',
                    name: '',
                    location: '',
                    capacity: '',
                    catalogue: '',
                    building: {
                        buildingID: '',
                        name: '',
                        address: ''
                    }
                }],
                loading: true,
                currentPage: 1,//当前页，每次到我的会议页面会定位在这一页
                total: 0,//数据总条数
                pageSize: 9,//每页显示条目个数
                pageNum: 1,//当前页，用来记录翻页后的当前页，传参用
                modifyDialog: false,
                form: {
                    name: '',
                    capacity: '',
                    catalogue: '',
                    building: ''
                },
                modifyForm:{
                    name: '',
                    capacity: '',
                    catalogue: '',
                    building: ''
                },
                addDialog: false,
                type: [{}],
                submitForm: {
                    type: '',
                    buildingID: -1
                },
                submitModifyForm: {
                    type: '',
                    buildingID: -1
                },
                building: [{
                    name: '请选择楼宇',
                    buildingID: -1,
                    capacity: -1,
                }],
                test: -1,
                rules: {
                    name: [
                        {required: true, message: '请输入会议室名称', trigger: 'blur'},
                    ],
                    catalogue: [
                        {required: true, message: '请选择会议室类型', trigger: 'change'}
                    ],
                    capacity: [
                        {required: true, message: '请输入会议室容量', trigger: 'blur'}
                    ],
                    building: [
                        {required: true, message: '请选择所在楼宇'}
                    ]
                }
            }
        },
        created() {
            this.showDetails();//获取我的会议列表
            this.showPage();
        },
        methods: {
            //获取总条数，用于分页
            showPage() {
                // getPage().then(res => {
                //     this.total = res.data;
                // })
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.showDetails();
            },
            //加载所有会议室数据
            showDetails() {
                this.loading = true;
                //获取resData
                getAllRoom(this.currentPage, this.pageSize).then(res => {
                    // console.log(res);
                    this.tableData = res.data;
                })
            },
            //打开添加会议室对话框时，获取所有楼宇和会议室类型
            addRoom() {
                this.addDialog = true;
                getType().then(res => {
                    for (var i = 0; i < res.data.length; i++) {
                        // 对象数组赋值
                        this.$set(this.type, i, {name: res.data[i]});
                    }
                });
                getBuildingByAddress(this.test).then(response => {
                    this.building = response.data;
                    console.log(this.building);
                })
            },
            //添加会议室，选择类型
            selectType() {
                if (this.type.name === '') {
                    this.submitForm.type = '-1';
                    this.submitModifyForm.type='-1';
                } else {
                    this.submitForm.type = this.type.name;
                    this.submitModifyForm.type = this.type.name;
                }
                this.form.catalogue = this.type.name;
                this.modifyForm.catalogue = this.type.name;
                console.log(this.submitForm.type);
            },
            //添加会议室，选择楼宇
            selectBuilding() {
                if (this.building.buildingID === '') {
                    this.submitForm.buildingID = -1;
                    this.submitModifyForm.buildingID=-1
                    this.form.building = '';
                    this.modifyForm.building = '';
                } else {
                    this.submitForm.buildingID = this.building.buildingID;
                    this.submitModifyForm.buildingID = this.building.buildingID;
                    var b = this.building.buildingID;
                    this.form.building = this.building.find(item => item.buildingID === b).name;
                    this.modifyForm.building = this.building.find(item => item.buildingID === b).name;
                }
            },
            //添加会议室表单，容量
            number() {
                this.form.capacity = this.form.capacity.replace(/[^1-9]+/g, '');
                this.form.capacity = this.form.capacity.replace('.', '');
                this.submitForm.capacity = this.form.capacity;
                console.log(this.submitForm.capacity)
            },
            //提交添加会议室表单
            onSubmit() {
                console.log('提交了！');
                // submitConference(this.conference).then(res => {
                //     console.log(res.status);
                //     if (res.status === 0) {
                this.$message({
                    message: '会议室添加成功',
                    type: 'success'
                });
                //     }
                // });
                this.addDialog = false;
                this.$nextTick(() => {
                    this.$refs.form.resetFields();
                });
            },
            //关闭添加会议室对话框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.$refs.form.resetFields();
                        this.addDialog = false;
                        done();
                    })
                    .catch(() => {
                    });
            },
            //按回车搜索
            onSearch() {
                console.log('enter')
            },
            deleteRoom(No) {
                this.$confirm('此操作将永久删除该会议室, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //后端删除接口
                    //如果成功返回成功信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                //重新加载表格
            },
            modifyRoom(No) {
                this.modifyDialog = true;
                getType().then(res => {
                    for (var i = 0; i < res.data.length; i++) {
                        // 对象数组赋值
                        this.$set(this.type, i, {name: res.data[i]});
                    }
                });
                getBuildingByAddress(this.test).then(response => {
                    this.building = response.data;
                    console.log(this.building);
                })
                //弹出修改对话框
                //获取会议室编号，接口获取这个会议室信息并赋值给mofidyForm
                //请求所有楼宇和会议室类型填充下拉菜单
            },
            //关闭添加会议室对话框
            handleClose1(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.modifyDialog = false;
                        done();
                    })
                    .catch(() => {
                    });
            },
            //提交修改
            modifySubmit(){

            }
        }
    }
</script>

<style scoped>

</style>