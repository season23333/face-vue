<template>
    <div>
        <div>
            <el-button type="success" style="float: right;margin-right: 20px" @click="addRoom()">添加</el-button>
            <el-dialog
                    title="添加会议室"
                    :visible.sync="addDialog"
                    width="340px"
                    :before-close="handleClose">
                <el-form ref="form" :model="form" label-width="80px" class="demo-ruleForm"
                         :rules="rules1">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="catalogue" style="">
                        <el-select v-model="type.name" prop="type.name"
                                   value-key="name" placeholder="请选择类型"
                                   clearable
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
                        <!--<el-input v-model="form.capacity" @keyup.native="number"></el-input>-->
                        <el-input-number v-model="form.capacity" :min="1" label="描述文字" :step="1"></el-input-number>
                    </el-form-item>
                    <el-form-item label="楼宇" prop="building">
                        <el-select v-model="building.buildingID" prop="building.name"
                                   value-key="buildingID" placeholder="请选择楼宇"
                                   clearable
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
                    <el-form-item label="楼层" prop="location">
                        <el-input v-model="form.location" @keyup.native="number1">
                            <template slot="append">层</template>
                        </el-input>
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
                    placeholder="请会议室编号/类型/名称/楼宇编号/容量"
                    style="width: 300px; float: right;margin-right: 20px;margin-bottom: 20px"
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
                            @click="deleteRoom(scope.row.roomID)"
                            style="margin-right: 20px"
                    >删除
                    </el-button>
                    <el-button
                            size="mini"
                            type="success"
                            @click="modifyRoom(scope.row)">修改
                    </el-button>
                    <el-dialog
                            title="修改会议室"
                            :visible.sync="modifyDialog"
                            width="340px"
                            :before-close="handleClose1">
                        <el-form ref="modifyForm" :model="modifyForm" label-width="80px" class="demo-ruleForm"
                                 :rules="rules">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="modifyForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="类型" prop="catalogue">
                                <el-select v-model="modifyForm.catalogue"
                                           value-key="name" placeholder="请选择类型"
                                           @focus="showType()"
                                >
                                    <el-option
                                            v-for="item in type1"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="容量" prop="capacity">
                                <!--<el-input v-model="modifyForm.capacity" @keyup.native="number"></el-input>-->
                                <el-input-number v-model="modifyForm.capacity" :min="1" label="描述文字"
                                                 :step="1"></el-input-number>
                            </el-form-item>
                            <el-form-item label="楼宇" prop="building2">
                                <el-select v-model="modifyForm.building2"
                                           value-key="buildingID" placeholder="请选择楼宇"
                                           @focus="showBuilding()"
                                >
                                    <el-option
                                            v-for="item in building1"
                                            :key="item.buildingID"
                                            :label="item.name"
                                            :value="item.buildingID"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="楼层" prop="location">
                                <el-input v-model="modifyForm.location" @keyup.native="number1">
                                    <template slot="append">层</template>
                                </el-input>
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
    import {getAllRoom, getType, getRoomTotal, modifyRoom, deleteRoom, searchPage,modifyRoom1} from "../api/room";
    import {getBuildingByAddress} from "../api/building"

    export default {
        name: "ManageRoom",
        data() {
            return {
                modifyDialog: false,
                modifyForm: {
                    roomID: '',
                    name: '',
                    capacity: '',
                    catalogue: '',
                    building2: '',
                    location: '',
                    flag: ''
                },
                type1: [{}],
                building1: [{
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
                    building2: [
                        {required: true, message: '请选择所在楼宇'}
                    ],
                    location: [
                        {required: true, message: '请输入所在楼层', trigger: 'blur'}
                    ]
                },

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                addDialog: false,
                form: {
                    name: '',
                    capacity: '',
                    catalogue: '',
                    building: '',
                    location: ''
                },
                type: [{}],
                building: [{
                    name: '请选择楼宇',
                    buildingID: -1,
                    capacity: -1,
                }],
                rules1: {
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
                    ],
                    location: [
                        {required: true, message: '请输入所在楼层', trigger: 'blur'}
                    ]
                },
                submitForm: {
                    name: '',
                    capacity: '',
                    type: '',
                    buildingID: -1,
                    location: ''
                },

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                input1: '',
                currentPage: 1,//当前页，每次到我的会议页面会定位在这一页
                total: 0,//数据总条数
                pageSize: 9,//每页显示条目个数
                pageNum: 1,//当前页，用来记录翻页后的当前页，传参用
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
            }
        },
        created() {
            this.showDetails();//获取我的会议列表
            this.showPage();
        },
        methods: {
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //添加会议室
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                    // console.log(this.building);
                })
            },
            //关闭添加会议室对话框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.$refs['form'].resetFields();
                        this.type = [{}];
                        console.log(this.form);
                        this.addDialog = false;
                        done();
                    })
                    .catch(() => {
                    });
            },
            //添加会议室，选择类型
            selectType() {
                if (this.type.name === '') {
                    this.submitForm.type = '-1';
                    // this.submitModifyForm.type = '-1';
                } else {
                    this.submitForm.type = this.type.name;
                    // this.submitModifyForm.type = this.type.name;
                }
                this.form.catalogue = this.type.name;
                // this.modifyForm.catalogue = this.type.name;
                // console.log(this.submitForm.type);
            },
            //添加会议室，选择楼宇
            selectBuilding() {
                if (this.building.buildingID === '') {
                    this.submitForm.buildingID = -1;
                    // this.submitModifyForm.buildingID = -1
                    this.form.building = '';
                    // this.modifyForm.building = '';
                } else {
                    this.submitForm.buildingID = this.building.buildingID;
                    // this.submitModifyForm.buildingID = this.building.buildingID;
                    var b = this.building.buildingID;
                    this.form.building = this.building.find(item => item.buildingID === b).name;
                    // this.modifyForm.building = this.building.find(item => item.buildingID === b).name;
                }
            },
            //添加会议室表单，容量
            // number() {
            //     this.form.capacity = this.form.capacity.replace(/[^1-9]+/g, '');
            //     this.form.capacity = this.form.capacity.replace('.', '');
            //     this.submitForm.capacity = this.form.capacity;
            //     // console.log(this.submitForm.capacity)
            // },
            number1() {
                this.form.location = this.form.location.replace(/[^1-9]+/g, '');
                this.form.location = this.form.location.replace('.', '');
                this.submitForm.location = this.form.location;
            },
            //提交添加会议室表单
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitForm.name = this.form.name;
                        this.submitForm.capacity = this.form.capacity;
                        console.log(this.submitForm.buildingID, this.submitForm.capacity, this.submitForm.type, this.submitForm.location, this.submitForm.name);
                        modifyRoom(this.submitForm.buildingID, this.submitForm.capacity, this.submitForm.type, this.submitForm.location, this.submitForm.name).then(res => {
                            if (res.status === 0) {
                                this.$message({
                                    message: '会议室添加成功',
                                    type: 'success'
                                });
                                this.onSearch()
                            }
                        });
                        this.addDialog = false;
                        this.$nextTick(() => {
                            this.$refs['form'].resetFields();
                            this.type = [{}];
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 搜索和分页
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //按回车搜索
            onSearch() {
                if (this.input1 === '') {
                    this.currentPage = 1;
                    this.showDetails();//获取我的会议列表
                    this.showPage();
                } else {
                    this.currentPage = 1;
                    //接口没写完，需要传搜索框内的内容和页数，获取到的内容包括总条数和表格内容
                    searchPage(this.input1, this.currentPage, this.pageSize).then(res => {
                        this.tableData = res.data.roomSet;
                        this.total = res.data.total;
                        console.log(res);
                    });
                }
            },
            //获取总条数，用于分页
            showPage() {
                getRoomTotal().then(res => {
                    this.total = res.data;
                })
            },
            //翻页
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.pageNum = val;
                if (this.input1 === '') {
                    this.showDetails();
                    this.showPage();
                } else {
                    searchPage(this.input1, this.currentPage, this.pageSize).then(res => {
                        this.tableData = res.data.roomSet;
                        this.total = res.data.total;
                        console.log(res);
                    });
                }

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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 删除
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            deleteRoom(No) {
                this.$confirm('此操作将永久删除该会议室, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRoom(No).then(res => {
                        if (res.status === 0) {
                            //如果成功返回成功信息
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.showDetails();//获取我的会议列表
                            this.showPage();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                //重新加载表格
            },


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 修改
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            modifyRoom(No) {
                this.modifyDialog = true;
                // getType().then(res => {
                //     for (var i = 0; i < res.data.length; i++) {
                //         // 对象数组赋值
                //         this.$set(this.type1, i, {name: res.data[i]});
                //     }
                // });
                // getBuildingByAddress(this.test).then(response => {
                //     this.building1 = response.data;
                //     // console.log(this.building);
                // });
                // var b = No;
                // this.modifyForm = this.tableData.find(item => item.roomID === b);
                // this.modifyForm.building = this.tableData.find(item => item.roomID === b).building.name;
                // this.type1.name = this.modifyForm.catalogue;
                // this.building1.name = this.modifyForm.building;
                // console.log(this.modifyForm)
                //弹出修改对话框
                //获取会议室编号，接口获取这个会议室信息并赋值给mofidyForm
                // this.modifyForm

                this.modifyForm = No;
                var b = No.building.name;
                this.modifyForm.building2 = b;
                // console.log(No);
            },
            showType() {
                getType().then(res => {
                    for (var i = 0; i < res.data.length; i++) {
                        // 对象数组赋值
                        this.$set(this.type1, i, {name: res.data[i]});
                    }
                });
            },
            showBuilding() {
                getBuildingByAddress(this.test).then(response => {
                    this.building1 = response.data;
                    // console.log(this.building);
                });
            },
            //关闭添加会议室对话框
            handleClose1(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.$refs.modifyForm.resetFields();
                        this.modifyDialog = false;
                        done();
                    })
                    .catch(() => {
                    });
            },
            //提交修改
            modifySubmit() {
                this.$refs['modifyForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.modifyForm);
                        modifyRoom1(this.modifyForm.building2, this.modifyForm.capacity, this.modifyForm.catalogue, this.modifyForm.location, this.modifyForm.name,this.modifyForm.flag,this.modifyForm.roomID).then(res => {
                            if (res.status === 0) {
                                this.$message({
                                    message: '会议室添加成功',
                                    type: 'success'
                                });
                                this.onSearch()
                            }
                        });
                        this.addDialog = false;
                        this.$nextTick(() => {
                            this.$refs['modifyForm'].resetFields();
                            this.type = [{}];
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        }
    }
</script>

<style scoped>

</style>