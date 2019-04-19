<template>
    <div>
        <el-table
                v-loading="loading"
                element-loading-text="Loading"
                ref="Table"
                :data="tableData"
                fit
                style="width: 100%">
            <el-table-column
                    prop="startTime"
                    align="center"
                    label="日期"
                    column-key="date"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="subject"
                    label="会议名称"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="room.building.name"
                    label="会议楼宇"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="room.name"
                    label="会议室"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="详情">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="left">
                        <p>开始时间: {{ scope.row.startTime }}</p>
                        <p>结束时间: {{ scope.row.endTime }}</p>
                        <p>参会人数：{{scope.row.number}}人</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">详情</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="status"
                    label="状态"
                    :filters="[{ text: '通过', value: '通过' }, { text: '未通过', value: '未通过' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                <template slot-scope="scope" style="text-align: center">
                    <el-tag
                            style="text-align: center"
                            :type="scope.row.status === '通过' ? 'success' : 'danger'"
                            disable-transitions>{{scope.row.status}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    width="300"
                    align="center"
                    label="操作">
                <template slot-scope="scope">

                    <el-button
                            v-if="scope.row.flag === 1"
                            size="mini"
                            type="danger"
                            disabled
                            @click="handleDelete(scope.$index, scope.row.conferenceID)">驳回会议
                    </el-button>
                    <el-button
                            v-else
                            size="mini"
                            type="success"
                            @click="handleDelete(scope.$index, scope.row.conferenceID)">驳回会议
                    </el-button>
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
    import '@/util/mock'
    import {formatDate} from '../util/formatDate'
    import {getDetails} from "../api/user";
    import {getRoomName, getBuildingName} from "../api/room";
    import {validatePeople, getUserID} from "../api/user"
    import {getPage, rejectConference} from "../api/conference";
    // import axios from 'axios';

    export default {
        name: "ManageMeeting",
        data() {
            return {
                loading: true,//改好前后端交互后，这里默认应该是true
                currentPage: 1,//当前页，每次到我的会议页面会定位在这一页
                total: 0,//数据总条数
                pageSize: 9,//每页显示条目个数
                pageNum: 1,//当前页，用来记录翻页后的当前页，传参用
                tableData: [{
                    user: 0,
                    conferenceID: 0,
                    date: '2019-05-02',
                    subject: '项目构思',
                    building: '综合楼A',
                    room: {
                        name: '',
                        building: {
                            name: '',
                        }
                    },
                    startTime: '2019-05-02 11:00',//详情1
                    endTime: '2019-05-02 12:00',//详情2
                    number: 1,//详情3，与会人数
                    status: 1,//是否通过，1是通过
                    flag: 0,
                }],
                msgDialogVisible: false,
                msgForm: {
                    people: [{
                        name: ''
                    }],
                },
                ID: 0,//uesrID
                resData: [{
                    endTime: '',
                    number: 0,
                    room: 0,
                    startTime: '',
                    status: 0,
                    subject: '',
                    user: 0,
                }],
                test: [
                    {value: 'aaa'},
                    {value: 'ahh'},
                    {value: 'bbb'}
                ]
                // color:'#F6F7FA'
                // peopleDialogVisible: false,
                // inputVisible: false,
                // inputValue: '',
            }
        },
        created() {
            this.showDetails();//获取我的会议列表
            this.showPage();
            this.showID();
        },
        methods: {
            //获取用户ID
            showID() {
                getUserID().then(res => {
                    this.ID = res.data;
                })
            },
            //获取总条数，用于分页
            showPage() {
                getPage().then(res => {
                    this.total = res.data;
                })
            },
            //获取我的会议列表
            showDetails() {
                this.loading = true;
                //获取resData
                getDetails(this.currentPage, this.pageSize).then(res => {
                    console.log(res);
                    this.tableData = res.data;
                    // this.tableData.id = res.data.conferenceID;
                    // this.tableData.name = res.data.subject;
                    // this.tableData.startTime = res.data.startTime;
                    // this.tableData.date = res.data.startTime;
                    // // this.tableData[j].date = str.substring(0, 10);
                    // this.tableData.endTime = res.data.endTime;
                    // this.tableData.num = res.data.number;
                    // this.tableData.tag = res.data.status;
                    // console.log(this.tableData);
                    // this.tableData.room = res.data.room.name;
                    // this.tableData.building = res.data.room.building.name;
                }).then(() => {
                    //判断是否在会议前15分钟、判断tag的值是通过还是不通过
                    var date = new Date();
                    var min = date.getMinutes();
                    date.setMinutes(min - 15);
                    var timestamp1 = Date.parse(formatDate(date, 'yyyy-MM-dd hh:mm:ss'));
                    timestamp1 = timestamp1 / 1000;

                    for (var j = 0; j < this.tableData.length; j++) {
                        if (this.tableData[j].status === 1) {
                            this.tableData[j].status = "通过";
                        } else {
                            this.tableData[j].status = "不通过";
                        }
                        var timestamp = Date.parse(this.tableData[j].startTime);
                        timestamp = timestamp / 1000;
                        console.log(timestamp);
                        if (timestamp > timestamp1) {
                            this.tableData[j].flag = 0;
                        } else {
                            this.tableData[j].flag = 1;
                        }
                        var str = this.tableData[j].startTime;
                        this.tableData[j].startTime = str.substring(0, 10);
                    }
                    this.loading = false;
                });


                console.log(this.tableData);


                // this.resData = res.data;
                // this.tableData = res.data;
                // console.log('房间号:' + this.resData[0].room);
                // console.log('length: ' + this.resData.length);
                // console.log('resData:'+this.resData);
                //这里要改，什么时候停止loading
//                     .then(() => {
//                     for (var j = 0; j < this.resData.length;j++) {
// console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
//                         getRoomName(this.resData[j].room).then(res => {
//                             // console.log('a' + j);
//                             // j--;
//                             // console.log('b' + j);
//                             // // this.tableData.room = res.data.name;
//                             // console.log('打印' + j);
//                             this.tableData[j].room = res.data.name;
//                             console.log('room' + res.data.name);
//                             this.ID = res.data.building;
//                             console.log(this.ID);
//                             // getBuildingName(this.ID).then(res => {
//                             //     console.log('c' + j);
//                             //     this.tableData[j].building = res.data.name;
//                             //     console.log(res);
//                             //     j++;
//                             //     console.log('d' + j);
//                             // });
//
//                             // this.showBuildingName(res.data.buildingID);
//                         }).then(() => {
//                             getBuildingName(this.ID).then(res => {
//                                 this.tableData[j].building = res.data.name;
//                                 console.log(res);
//                             }).then(() => {
//                                 console.log("xiaowangshishazi" + j);
//                                 this.tableData[j].name = this.resData[j].subject;
//                                 this.tableData[j].startTime = this.resData[j].startTime;
//                                 var str = this.resData[j].startTime;
//                                 this.tableData[j].date = str.substring(0, 10);
//                                 this.tableData[j].endTime = this.resData[j].endTime;
//                                 this.tableData[j].num = this.resData[j].number;
//                                 this.tableData[j].tag = this.resData[j].status;
//                                 console.log("打印pre" + j);
//                                 console.log(this.resData[j].room);
//                                 // console.log(j);
//                                 if (this.tableData[j].tag === 1) {
//                                     this.tableData[j].tag = "通过";
//                                 } else {
//                                     this.tableData[j].tag = "不通过";
//                                 }
//                                 console.log(this.tableData[j].tag);
//                                 var timestamp = Date.parse(this.tableData[j].startTime);
//                                 timestamp = timestamp / 1000;
//                                 console.log(timestamp);
//                                 if (timestamp > timestamp1) {
//                                     this.tableData[j].flag = 0;
//                                 } else {
//                                     this.tableData[j].flag = 1;
//                                 }
//
//                             });
//                         })

                //}
                //});
                // this.loading = false;

            },
            //根据获取到的我的会议列表的roomID去获取room的名字
            showRoomName(roomID) {
                getRoomName(roomID).then(res => {
                    this.tableData.room = res.data.name;
                    console.log('room' + res);
                    // this.showBuildingName(res.data.buildingID);
                    return res;
                })
            },
            //根据获取到的room对象里的buildingID去获取building的名字
            showBuildingName(buildingID) {
                getBuildingName(buildingID)(res => {
                    this.tableData.building = res.data.name;
                })
            },
            //tag的过滤器，只显示通过或者不通过
            filterTag(value, row) {
                return row.tag === value;
            },
            //验证与会人是否合法
            validatePass(rule, value, callback) {
                console.log('验证是否合法' + value);

                if (value === 'aaa') {
                    callback();
                } else {
                    callback(new Error("通知人姓名有误,请重新输入"))
                }
            },
            //删除与会人
            removeDomain(item) {
                var index = this.msgForm.people.indexOf(item);
                if (index !== -1) {
                    this.msgForm.people.splice(index, 1)
                }
            },
            //新增与会人
            addDomain() {
                //发请求确认短信通知人是否合法
                this.msgForm.people.push({
                    value: '',
                    key: Date.now()
                });
            },
            // //重置与会人表单
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // },
            //提交与会人表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.msgForm.people);
                        this.$message({
                            message: '提交成功，稍后与会人将收到短信通知',
                            type: 'success'
                        });
                        this.msgDialogVisible = false;
                    } else {
                        this.$message.error('请重新填写表单');
                        return false;
                    }
                });

            },
            //分页的翻页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.showDetails();
            },

            // open() {
            //     let time;
            //     axios.get('/details').then(res => {
            //         time = res.data.time;
            //     });
            //     this.$alert('"this.time"', '标题名称', {
            //         confirmButtonText: '确定',
            //         dangerouslyUseHTMLString: true
            //     });
            // },

            //驳回会议
            handleDelete(index, row) {
                rejectConference(row).then(res => {
                    console.log('取消预定' + res);
                    if (res.status === 0) {
                        this.$message({
                            message: '驳回会议成功',
                            type: 'success'
                        });
                    }
                }).then(() => {
                    this.showDetails();//获取我的会议列表
                    this.showPage();
                })
            },
            //关闭对话框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        // this.$nextTick(() => {
                        //     this.$refs.form.resetFields();       // this.$refs.adduserform.resetFields();
                        // });
                        // this.msgDialogVisible = false;
                        // console.log('关闭');
                        done();
                    })
                    .catch(() => {
                    });
            },
            // //删除与会人
            // handleCloseTag(tag) {
            //     this.people.splice(this.people.indexOf(tag), 1);
            // },
            // //删除通知人
            // handleCloseTag1(tag) {
            //     this.msgPeople.splice(this.msgPeople.indexOf(tag), 1);
            // },
            // //展开tag显示iput
            // showInput() {
            //     this.inputVisible = true;
            //     //在 DOM 状态更新后做点什么
            //     this.$nextTick(() => {
            //         //每次显示组件的时候，input获得焦点
            //         this.$refs.saveTagInput.$refs.input.focus();
            //     });
            // },
            // //添加与会人
            // handleInputConfirm() {
            //     let inputValue = this.inputValue;
            //     console.log(inputValue);
            //     if (inputValue) {
            //         this.people.push(inputValue);
            //     }
            //     console.log(this.people);
            //     this.inputVisible = false;
            //     this.inputValue = '';
            // },
            // //添加通知人
            // handleInputConfirm1() {
            //     let inputValue = this.inputValue;
            //     console.log(inputValue);
            //     if (inputValue) {
            //         this.msgPeople.push(inputValue);
            //     }
            //     console.log(this.msgPeople);
            //     this.inputVisible = false;
            //     this.inputValue = '';
            // },
            querySearch(queryString, cb) {
                console.log('请求:', queryString);
                validatePeople(queryString).then(res => {
                    console.log(res.data.realName + res.data.userID);
                    this.test.value = res.data.realName;
                    this.test.value += res.data.userID;
                    console.log(this.test.value);

                });
                var results = this.test;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            handleSelect(item) {
                console.log(item);
                console.log('输出', this.msgForm);
            }
        }
    }
</script>

<style>
</style>