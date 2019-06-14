<template>
    <div>
        <div>
            <el-autocomplete
                    style="width: 160px; float: right;margin-right: 20px;margin-bottom: 20px"
                    v-model="state"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入姓名"
                    @select="handleSelect"
            ></el-autocomplete>
            <el-dialog
                    title="修改用户信息"
                    :visible.sync="searchDialog"
                    width="400px"
                    :before-close="handleClose1">
                <el-form ref="mySearch" :model="searchForm" label-width="80px" class="demo-ruleForm"
                         :rules="rules1">
                    <el-form-item label="姓名" prop="realName">
                        <el-input v-model="searchForm.realName"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="department">
                        <el-input v-model="searchForm.department"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phoneNumber">
                        <el-input v-model="searchForm.phoneNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="searchForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="searchForm.password"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: right">
                        <el-button @click="handleClose1" style="margin-top: 10px">取 消</el-button>
                        <el-button type="primary"
                                   @click="onSubmit()">确 定
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <el-table
                element-loading-text="Loading"
                ref="Table"
                :data="tableData"
                fit
                style="width: 100%"
                v-if="isRouterAlive">
            <el-table-column
                    prop="userID"
                    align="center"
                    label="编号"
                    column-key="date"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="realName"
                    label="姓名"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="department"
                    label="部门"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="email"
                    label="邮箱"
                    width="300px"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="phoneNumber"
                    label="手机号"
            >
            </el-table-column>
            <el-table-column
                    width="300"
                    align="center"
                    label="操作">
                <template slot-scope="scope">
                    <!--<el-button-->
                    <!--round-->
                    <!--size="mini"-->
                    <!--@click="deletePeople(scope.row.userID)"-->
                    <!--style="margin-right: 20px"-->
                    <!--&gt;删除-->
                    <!--</el-button>-->
                    <el-button
                            size="mini"
                            type="success"
                            @click="modifyPeople(scope.row)">修改
                    </el-button>
                    <el-dialog
                            title="修改用户信息"
                            :visible.sync="modifyDialog"
                            width="400px"
                            :before-close="handleClose">
                        <el-form ref="form" :model="modifyForm" label-width="80px" class="demo-ruleForm"
                                 :rules="rules">
                            <el-form-item label="姓名" prop="realName1">
                                <el-input v-model="modifyForm.realName1"></el-input>
                            </el-form-item>
                            <el-form-item label="部门" prop="department1">
                                <el-input v-model="modifyForm.department1"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" prop="phoneNumber1">
                                <el-input v-model="modifyForm.phoneNumber1"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email1">
                                <el-input v-model="modifyForm.email1"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="modifyForm.password"></el-input>
                            </el-form-item>
                            <el-form-item style="text-align: right">
                                <el-button @click="handleClose" style="margin-top: 10px">取 消</el-button>
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
    import {getTotalPage, getUserList, modifyMobile, modifyEmail, basicInfo, modifyPassword} from "../api/userManage";
    import {validatePeople} from "../api/user";


    export default {
        name: "ManagePeople",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (this.modifyForm.phoneNumber !== '') {
                        if (!(/^1[34578]\d{9}$/.test(this.modifyForm.phoneNumber1))) {
                            callback(new Error('请输入正确的手机号'));
                        }
                    }
                    callback();
                }
            };
            var validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (this.searchForm.phoneNumber !== '') {
                        if (!(/^1[34578]\d{9}$/.test(this.searchForm.phoneNumber))) {
                            callback(new Error('请输入正确的手机号'));
                        }
                    }
                    callback();
                }
            };
            return {
                searchDialog: false,
                timeout: null,
                state: '',
                results: [{
                    value: ''
                }],
                temp: [{}],
                loading: true,
                rules1: {
                    realName: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    department: [
                        {required: true, message: '请输入部门', trigger: 'change'}
                    ],
                    phoneNumber: [
                        {required: true, validator: validatePass1, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    password: [{required: false, message: "请输入新密码"}, {
                        pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,15}$/,
                        message: '密码为数字,大写字母,小写字母,特殊符号,至少包含三种,长度6-15位'
                    }],
                },
                rules: {
                    realName1: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    department1: [
                        {required: true, message: '请输入部门', trigger: 'change'}
                    ],
                    phoneNumber1: [
                        {required: true, validator: validatePass, trigger: 'blur'}
                    ],
                    email1: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    password: [{required: false, message: "请输入新密码"}, {
                        pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,15}$/,
                        message: '密码为数字,大写字母,小写字母,特殊符号,至少包含三种,长度6-15位'
                    }],
                },
                searchForm: {
                    userID: '',
                    realName: '',
                    phoneNumber: '',
                    email: '',
                    department: '',
                    password: ''
                },
                searchForm1: {
                    userID: '',
                    realName: '',
                    phoneNumber: '',
                    email: '',
                    department: '',
                    password: ''
                },
                //////////////////////////////////////
                //////////////////////////////////////
                currentPage: 1,//当前页，每次到我的会议页面会定位在这一页
                total: 0,//数据总条数
                pageSize: 10,//每页显示条目个数
                pageNum: 1,//当前页，用来记录翻页后的当前页，传参用
                modifyDialog: false,
                modifyForm: {
                    userID1: '',
                    realName1: '',
                    phoneNumber1: '',
                    email1: '',
                    department1: '',
                    password: ''
                },
                tableData: [{
                    userID: '',
                    realName: '',
                    phoneNumber: '',
                    email: '',
                    department: ''
                }],
                res1: 0,
                res2: 0,
                res3: 0,
                res4: 0,
                isRouterAlive: true
            }
        },
        created() {
            // console.log('角色');
            // console.log( this.$store.state.roles);
            this.showDetails();//获取所有会议列表
            this.showPage();
        },
        methods: {
            handleClose1(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.$refs.mySearch.resetFields();
                        this.searchDialog = false;
                        done();
                    })
                    .catch(() => {
                    });
            },
            onSubmit() {
                console.log(this.searchForm);
                console.log(this.searchForm1);
                this.$refs['mySearch'].validate((valid) => {
                    if (valid) {
                        // console.log(this.tableData.find(item => item.userID === this.modifyForm.userID1));
                        if (this.searchForm.phoneNumber !== this.searchForm1.phoneNumber) {
                            modifyMobile(this.searchForm.userID, this.searchForm.phoneNumber).then(res => {
                                this.res1 = res.status;
                            }).then(()=>{
                                this.showDetails();//获取所有会议列表
                                this.showPage();
                            });
                        }
                        if (this.searchForm.email !== this.searchForm1.email) {
                            modifyEmail(this.searchForm.userID, this.searchForm.email).then(res => {
                                this.res2 = res.status;
                                // console.log(res.status)
                            }).then(()=>{
                                this.showDetails();//获取所有会议列表
                                this.showPage();
                            });
                        }
                        // // console.log(this.searchForm1.department)
                        if ((this.searchForm.realName !== this.searchForm1.realName) ||
                            (this.searchForm.department !== this.searchForm1.department)) {
                            // console.log(this.searchForm.userID, this.searchForm.realName, this.searchForm.department)
                            // console.log(2)
                            basicInfo(this.searchForm.userID, this.searchForm.realName, this.searchForm.department).then(res => {
                                this.res3 = res.status;
                                console.log(1)
                                // console.log(res.status)
                            }).then(()=>{
                                this.showDetails();//获取所有会议列表
                                this.showPage();
                            });
                        }
                        if (this.searchForm.password !== '') {
                            var password = this.$md5(this.searchForm.password);
                            modifyPassword(this.searchForm.userID, password).then(res => {
                                this.res4 = res.status;

                                // console.log(res.status)
                            }).then(()=>{
                                this.showDetails();//获取所有会议列表
                                this.showPage();
                            });
                        }
                        if (this.res1 === 0 && this.res2 === 0 && this.res3 === 0 && this.res4 === 0) {
                            this.$message({
                                message: '用户信息修改成功',
                                type: 'success'
                            });
                            this.searchDialog = false;
                        }
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
                this.res1 = 0;
                this.res2 = 0;
                this.res3 = 0;
                this.res4 = 0;
            },
            querySearchAsync(queryString, cb) {
                // console.log(queryString);
                this.results = [{value: ''}];
                this.temp = [{}];
                validatePeople(queryString).then(res => {
                    for (var i = 0; i < res.data.length; i++) {
                        this.$set(this.results, i, {value: res.data[i].realName});
                        this.$set(this.temp, i, {name: res.data[i]})
                    }
                    // console.log(this.temp)
                });
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(this.results);
                }, 300);
            },
            handleSelect(name) {
                this.searchDialog = true;
                //这里接口没太写好
                this.searchForm = this.temp.find(item => item.name.realName === name.value).name;
                this.searchForm1.department = this.searchForm.department;
                this.searchForm1.userID = this.searchForm.userID;
                this.searchForm1.realName = this.searchForm.realName;
                this.searchForm1.phoneNumber = this.searchForm.phoneNumber;
                this.searchForm1.email = this.searchForm.email;
                this.searchForm.password = '';
                this.searchForm1.password = '';
                // console.log(this.temp.find(item => item.name.realName === name.value).name)
                // console.log(this.searchForm);
            },
            modifySubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        // console.log(this.tableData.find(item => item.userID === this.modifyForm.userID1));
                        if (this.modifyForm.phoneNumber1 !== this.tableData.find(item => item.userID === this.modifyForm.userID1).phoneNumber) {
                            modifyMobile(this.modifyForm.userID1, this.modifyForm.phoneNumber1).then(res => {
                                this.res1 = res.status;
                                // console.log(res.status)
                            }).then(()=>{
                                this.showDetails();//获取所有会议列表
                                this.showPage();
                            });
                        }
                        if (this.modifyForm.email1 !== this.tableData.find(item => item.userID === this.modifyForm.userID1).email) {
                            modifyEmail(this.modifyForm.userID1, this.modifyForm.email1).then(res => {
                                this.res2 = res.status;
                                // console.log(res.status)
                            });
                        }
                        if ((this.modifyForm.realName1 !== this.tableData.find(item => item.userID === this.modifyForm.userID1).realName) ||
                            (this.modifyForm.department1 !== this.tableData.find(item => item.userID === this.modifyForm.userID1).department)) {
                            basicInfo(this.modifyForm.userID1, this.modifyForm.realName1, this.modifyForm.department1).then(res => {
                                this.res1 = res.status;
                                // console.log(res.status)
                            }).then(()=>{
                                this.showDetails();//获取所有会议列表
                                this.showPage();
                            });
                        }
                        if (this.modifyForm.password !== '') {
                            var password = this.$md5(this.modifyForm.password);
                            modifyPassword(this.modifyForm.userID1, password).then(res => {
                                this.res4 = res.status;
                                // console.log(res.status)
                            }).then(()=>{
                                this.showDetails();//获取所有会议列表
                                this.showPage();
                            });
                        }
                        if (this.res1 === 0 && this.res2 === 0 && this.res3 === 0) {
                            this.$message({
                                message: '用户信息修改成功',
                                type: 'success'
                            });
                            this.modifyDialog = false;
                            // console.log(1)
                        }
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
                this.res1 = 0;
                this.res2 = 0;
                this.res3 = 0;
                this.res4 = 0;
                // console.log(2);

            },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 分页
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //获取总条数，用于分页
            showPage() {
                getTotalPage().then(res => {
                    this.total = res.data;
                    // console.log('total:'+res.data)
                })
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.showDetails();
            },
            showDetails() {
                this.loading = true;
                getUserList(this.currentPage).then(res => {
                    // console.log(res);
                    this.tableData = res.data;
                    // console.log(3);
                    // console.log(res.data)
                })
            },

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // 修改
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            modifyPeople(user) {
                this.modifyDialog = true;
                this.modifyForm.realName1 = user.realName;
                this.modifyForm.phoneNumber1 = user.phoneNumber;
                this.modifyForm.email1 = user.email;
                this.modifyForm.department1 = user.department;
                this.modifyForm.userID1 = user.userID;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.$refs.form.resetFields();
                        this.modifyDialog = false;
                        done();
                    })
                    .catch(() => {
                    });
            },
        }
    }
</script>

<style scoped>

</style>