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
                    :filters="[{ text: '已取消', value: '已取消' }, { text: '正常', value: '正常' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                <template slot-scope="scope" style="text-align: center">
                    <el-tag
                            style="text-align: center"
                            :type="scope.row.status === '正常' ? 'success' : 'danger'"
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
                            v-if="scope.row.flag === 0 &&scope.row.user === ID"
                            round
                            size="mini"
                            @click="addPeople(scope.row.conferenceID)"
                            style="margin-right: 20px"
                    >添加与会人
                    </el-button>
                    <el-button
                            v-else
                            round
                            size="mini"
                            disabled
                            style="margin-right: 20px"
                    >添加与会人
                    </el-button>
                    <el-dialog title="添加与会人" :visible.sync="msgDialogVisible" :before-close="closeDialog">
                        <el-tag
                                style="margin-right: 10px"
                                :key="tag"
                                v-for="tag in nameList"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-popover
                                placement="right"
                                width="240"
                                trigger="click">
                            <div>
                                <el-input v-model="search" placeholder="请输入与会人" suffix-icon="el-icon-search"
                                          style="width: 200px"></el-input>
                                <div v-loading="divLoading" v-if="sshow === true">
                                    <ul class="myul">
                                        <li v-for='(v,k) in arr' :key="k" @click="data(k)" class="myli"
                                            @mouseenter="mouseEnter(k)"
                                            @mouseleave="mouseLeave">
                                            <span>{{v.str}}</span>
                                            <div style=" right: 0">
                                                <i v-if="isActive===k&&v.bol===false" class="icon-span"
                                                   :class="{'icon-span-selec' : v.bol===false}"></i>
                                                <i v-else-if="v.bol===true" class="icon-span"
                                                   :class="{'icon-span-select' : v.bol===true}"></i>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <el-button slot="reference">新增通知人</el-button>
                        </el-popover>
                        <div slot="footer" class="dialog-footer">
                            <!--<el-button @click="msgDialogVisible = false">取 消</el-button>-->
                            <el-button type="primary" @click="update()">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!--<el-dialog-->
                    <!--title="提示"-->
                    <!--:visible.sync="msgDialogVisible"-->
                    <!--width="30%"-->
                    <!--:before-close="handleClose"-->
                    <!--center>-->
                    <!--<el-form :model="msgForm" ref="msgForm" label-width="100px"-->
                    <!--class="demo-dynamic">-->
                    <!--<el-form-item-->
                    <!--v-for="(P, index) in msgForm.people"-->
                    <!--:label="'通知人' + (index+1)"-->
                    <!--:key="P.key"-->
                    <!--:prop="'people.' + index + '.name'"-->
                    <!--:rules="[{-->
                    <!--required: true, message: '通知人不能为空', trigger: 'blur'-->
                    <!--},{-->
                    <!--validator:validatePass, trigger:'manual'-->
                    <!--}]"-->
                    <!--&gt;-->
                    <!--&lt;!&ndash;<el-input v-model="P.name" style="width: 200px"></el-input>&ndash;&gt;-->
                    <!--<el-autocomplete-->
                    <!--class="inline-input"-->
                    <!--v-model="P.name"-->
                    <!--:fetch-suggestions="querySearch"-->
                    <!--placeholder="请输入内容"-->
                    <!--:trigger-on-focus="false"-->
                    <!--@select="handleSelect"-->
                    <!--&gt;</el-autocomplete>-->
                    <!--<el-button @click.prevent="removeDomain(P)" style="margin-left: 20px">删除</el-button>-->
                    <!--</el-form-item>-->

                    <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="submitForm('msgForm')">提交</el-button>-->
                    <!--<el-button @click="addDomain">新增通知人</el-button>-->
                    <!--&lt;!&ndash;<el-button @click="resetForm('msgForm')">重置</el-button>&ndash;&gt;-->
                    <!--</el-form-item>-->
                    <!--</el-form>-->
                    <!--</el-dialog>-->


                    <el-button
                            v-if="scope.row.flag === 0 && scope.row.user === ID"
                            size="mini"
                            type="success"
                            @click="handleDelete(scope.$index, scope.row.conferenceID)">取消会议
                    </el-button>
                    <el-button
                            v-else
                            size="mini"
                            type="danger"
                            disabled
                            @click="handleDelete(scope.$index, scope.row.conferenceID)">取消会议
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
    import {getPage, cancelConference, addConfPeople, showConfPeople} from "../api/conference";
    import {Message} from 'element-ui'
    // import axios from 'axios';

    export default {
        name: "MyMeeting",
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
                    {value: ''},
                ],
                res: [
                    {value: ''}
                ],
                search: '',
                arr: [
                    {
                        bol: false,
                        userID: '',
                        realName: '',
                        phoneNumber: '',
                        str: ''
                    },
                ],
                isActive: -1,
                searchPoi: [],
                divLoading: false,
                onLine: true,
                msgDialogVisible: false,
                dynamicTags: [],
                timeout: null,
                sshow: false,
                nameList: [],
                splitChar: '-',
                updateList: [],
                b: '',
                confID: ''
                // color:'#F6F7FA'
                // peopleDialogVisible: false,
                // inputVisible: false,
                // inputValue: '',
            }
        },
        watch: {
            search(curVal) {
                // 实现input连续输入，只发一次请求
                if (curVal === '') {
                    this.sshow = false;
                    return false;
                } else {
                    var reg = /^[\u0391-\uFFE5A-Za-z]+$/;
                    if (reg.test(curVal)) {
                        // if (this.nameList.indexOf(curVal) !== -1)
                        this.sshow = true;
                    } else {
                        this.sshow = false;
                        Message({
                            message: '请输入正确姓名',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                }
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    // console.log('???' + curVal);
                    this.getListPOI(curVal);
                }, 300);
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
                    // console.log(res);
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
                        if (this.tableData[j].status === -1) {
                            this.tableData[j].status = "已取消";
                        } else {
                            this.tableData[j].status = "正常";
                        }
                        var timestamp = Date.parse(this.tableData[j].startTime);
                        timestamp = timestamp / 1000;
                        // console.log(timestamp);
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


                // console.log(this.tableData);


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
                    // console.log('room' + res);
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
                // console.log('验证是否合法' + this.test.indexOf(value));
                // console.log('验证是否合法' + this.test[0].value);
                var index = this.test.indexOf(value);
                if (index !== -1) {
                    callback();
                } else {
                    callback(new Error("通知人姓名有误,请重新输入"))
                }
            },
            //删除与会人
            // removeDomain(item) {
            //     var index = this.msgForm.people.indexOf(item);
            //     if (index !== -1) {
            //         this.msgForm.people.splice(index, 1)
            //     }
            // },
            //新增与会人
            // addDomain() {
            //     //发请求确认短信通知人是否合法
            //     this.msgForm.people.push({
            //         value: '',
            //         key: Date.now()
            //     });
            // },
            // //重置与会人表单
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // },
            //提交与会人表单
            // submitForm(formName) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             console.log(this.msgForm.people);
            //             this.$message({
            //                 message: '提交成功，稍后与会人将收到短信通知',
            //                 type: 'success'
            //             });
            //             this.msgDialogVisible = false;
            //         } else {
            //             this.$message.error('请重新填写表单');
            //             return false;
            //         }
            //     });
            //
            // },
            //分页的翻页
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
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

            //取消会议
            handleDelete(index, row) {
                // console.log(row);
                cancelConference(row).then(res => {
                    // console.log('取消预定' + res.message);
                    if (res.status === 0) {
                        this.$message({
                            message: '会议取消成功',
                            type: 'success'
                        });
                    }
                }).then(() => {
                    this.showDetails();//获取我的会议列表
                    this.showPage();
                })
            },
            //模糊匹配
            async getListPOI(inputVal) {
                if (inputVal === '') {
                    return false;
                }
                this.searchPoi = [];
                this.divLoading = true;
                if (!navigator.onLine) {//没有网络
                    // this.onLine = false;
                    this.divLoading = false;
                    return false;
                }
                try {
                    await validatePeople(inputVal).then(res => {
                        this.arr = res.data;
                        for (var i = 0; i < res.data.length; i++) {
                            var str = this.arr[i].realName + this.splitChar + this.arr[i].userID;
                            // console.log('拼接字符串：' + str);
                            this.arr[i].str = str;
                            if (this.nameList.indexOf(str) === -1) {
                                this.arr[i].bol = false;
                            } else {
                                this.arr[i].bol = true;
                            }
                        }
                    });
                    this.divLoading = false;
                    // console.log(this.timeout)
                } catch (err) {
                    // console.log(err);
                }
            },
            mouseEnter(index) {
                this.isActive = index;
                // console.log('鼠标移入（false是灰色 未选择这一项）:' + this.arr[index].bol);
            },
            //   鼠标移除
            mouseLeave() {
                this.isActive = null;
            },
            data(k) {
                this.search = this.arr[k].realName;
                if (this.arr[k].bol === false) {
                    this.arr[k].bol = true;
                    var str = this.arr[k].realName + this.splitChar + this.arr[k].userID;
                    this.nameList.push(str);
                    // this.nameList.push(this.arr[k].realName);
                } else {
                    this.arr[k].bol = false;
                    this.nameList.splice(this.nameList.indexOf(this.arr[k].realName), 1);
                }
                // console.log('点击列表某一项改变（）' + this.arr[k].bol);
                this.isActive = null;
                this.isActive = k;

            },
            handleClose(tag) {
                for (var i = 0; i < this.arr.length; i++) {
                    if (this.arr[i].str === tag) {
                        this.arr[i].bol = false;
                    }
                }
                this.nameList.splice(this.nameList.indexOf(tag), 1);
                // console.log('关闭tag后' + this.nameList);
            },
            closeDialog(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        // this.nameList.length = 0;
                        // this.updateList.length = 0;
                        this.nameList.splice(0);
                        this.updateList.splice(0);
                        done();
                    })
                    .catch(_ => {
                    });
            },
            addPeople(confID) {
                this.confID = confID;
                this.msgDialogVisible = true;
                showConfPeople(this.confID).then(res => {
                    for (var i = 0; i < res.data.length; i++) {
                        var str = res.data[i].realName + this.splitChar + res.data[i].userID;
                        this.nameList.push(str);
                    }
                })
            },
            //提交与会人列表
            update() {
                this.msgDialogVisible = false;
                // console.log('提交前' + this.nameList);

                for (var i = 0; i < this.nameList.length; i++) {
                    this.updateList[i] = this.nameList[i].split('-')[1]
                }
                this.b = this.updateList.join(",");
                addConfPeople(this.b, this.confID).then(res => {
                    // console.log(res);
                });
                // this.nameList.length = 0;
                // this.updateList.length = 0;
                this.nameList.splice(0);
                this.updateList.splice(0);

                // console.log('提交了'+this.b);
            }
            //关闭对话框
            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //         .then(() => {
            //             // this.$nextTick(() => {
            //             //     this.$refs.form.resetFields();       // this.$refs.adduserform.resetFields();
            //             // });
            //             // this.msgDialogVisible = false;
            //             // console.log('关闭');
            //             done();
            //         })
            //         .catch(() => {
            //         });
            // },
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
            // querySearch(queryString, cb) {
            //     console.log('请求:', queryString);
            //     validatePeople(queryString).then(res => {
            //         for(var i =0;i<res.data.length;i++){
            //             this.test[i].value = res.data[i].userID;
            //             this.test[i].value += res.data[i].realName;
            //             this.test[i].value += res.data[i].phoneNumber;
            //         }
            //     });
            //     var results = this.test;
            //     // 调用 callback 返回建议列表的数据
            //     cb(results);
            // },
            // handleSelect(item) {
            //     console.log(item);
            //     console.log('输出');
            // }
        }
    }
</script>

<style scoped>
    .myul {
        padding: 10px 0 0;
        margin: 0;
        display: block;
        list-style-type: disc;
        scroll-snap-margin-block-start: 1em;
        scroll-snap-margin-block-end: 1em;
        scroll-snap-margin-inline-start: 0px;
        scroll-snap-margin-inline-end: 0px;
        scroll-padding-inline-start: 40px;
    }

    .myli {
        height: 40px;
        padding: 0 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        list-style-type: none;
        width: 100%;
        position: relative;
        min-height: 40px;
        color: #666;
        outline-style: none;
    }

    .icon-span {
        display: inline-block;
        background-color: #fff;
        border-radius: 100%;
        border: 1px solid #ccc;
        position: relative;
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }

    .icon-span::after {
        border: 2px solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        top: 3px;
        left: 8px;
        position: absolute;
        width: 10px;
        height: 16px;
        -webkit-transform: rotate(45deg) scale(0);
        transform: rotate(45deg) scale(0);
        -webkit-transition: -webkit-transform .2s;
        transition: -webkit-transform .2s;
        transition: transform .2s;
        transition: transform .2s, -webkit-transform .2s;
    }

    .icon-span-select {
        /*background-color: green;*/
        border-color: #fff;
    }

    .icon-span-select::after {
        border-color: green;
        -webkit-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
    }

    .icon-span-selec {
        border-color: #fff;
    }

    .icon-span-selec::after {
        border-color: lightgray;
        -webkit-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
    }
</style>