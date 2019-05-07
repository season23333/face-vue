<template>
    <div>
        <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

        <el-dialog title="与会人" :visible.sync="dialogFormVisible">

            <!--<el-tag type="info" :key="tag"-->
            <!--v-for="tag in dynamicTags">{{tag}}-->
            <!--</el-tag>-->


            <el-popover
                    placement="right"
                    width="240"
                    trigger="click">
                <div>
                    <el-input v-model="search" placeholder="请输入内容" suffix-icon="el-icon-search"
                              style="width: 200px"></el-input>
                    <div v-loading="divLoading">
                        <ul class="myul">
                            <!--<li @click="data(0)" class="myli"-->
                                <!--@mouseenter="mouseEnter(0)"-->
                                <!--@mouseleave="mouseLeave">-->
                                <!--<span>{{arr[0].realName}}</span>-->
                                <!--<div style=" right: 0">-->


                                    <!--<i v-if="isActive===0&&arr[0].bol===false" class="icon-span"-->
                                       <!--:class="{'icon-span-selec' : arr[0].bol===false}"></i>-->
                                    <!--<i v-else-if="arr[0].bol===true" class="icon-span"-->
                                       <!--:class="{'icon-span-select' : arr[0].bol===true}"></i>-->

                                <!--</div>-->

                            <!--</li>-->
                            <li v-for='(v,k) in arr' :key="k" @click="data(k)" class="myli"
                            @mouseenter="mouseEnter(k)"
                            @mouseleave="mouseLeave">
                            <span>{{v.realName}}</span>
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
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>


        <!--<button @click="func()">点我!</button>-->
        <!--<button @click="aaa()">清除token</button>-->
    </div>
</template>

<script>
    // import '@/util/mock';
    import axios from 'axios';
    // import {text} from '../api/table'
    import {test} from '../api/login'
    import {getMeetingList} from '../api/table';
    import {getDetails} from "../api/user";
    import {validatePeople} from "../api/user"

    export default {
        name: "mocktest",
        data() {
            return {
                search: '',
                text: "",
                msg: 'Welcome to Your Vue.js App',
                file: '',
                Data: [],
                next: "",
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '1王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '2王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '3王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '4王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }, {
                        date: '2016-05-02',
                        name: '5王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '6王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '7王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '8王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }],
                currentPage: 1,
                pagesize: 2,
                n: {
                    one1: '',
                    two: ''
                },
                i: 0,
                isShow: 1,
                arr: [
                    {
                        bol: false,
                        userID: '',
                        realName: '',
                        phoneNumber: ''
                    },
                ],
                isActive: -1,
                searchPoi: [],
                divLoading: false,
                onLine: true,
                dialogFormVisible: false,
                dynamicTags: [],
                timeout: null
            }
        },
        // created() {
        //     // this.getSelectData('2019-03-13 00:00:00');
        //     this.$store.state.msg = 'aaa';
        // },
        // created() {
        //     this.tokenTest();
        // },
        watch: {
            search(curVal) {
                // 实现input连续输入，只发一次请求
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    console.log('???' + curVal);
                    this.getListPOI(curVal);
                }, 300);
            }
        },
        methods: {
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
                            this.arr[i].bol = false;
                        }
                    });
                    this.divLoading = false;
                    // console.log(this.timeout)
                } catch (err) {
                    console.log(err);
                }
            },
            mouseEnter(index) {
                this.isActive = index;
                console.log('鼠标移入（false是灰色 未选择这一项）:' + this.arr[index].bol);
            },
            //   鼠标移除
            mouseLeave() {
                this.isActive = null;
            },
            data(k) {
                // this.isShow = !this.isShow
                // 通过i知道当前被点的数据是谁，
                // 把被点击的数据的 bol值改成true其他的都改成false
                // for (var i = 0; i < this.arr.length; i++) {
                //     this.arr[i].bol = false;
                // }
                this.search = this.arr[k].realName;
                if (this.arr[k].bol === false) {
                    this.arr[k].bol = true;
                } else {
                    this.arr[k].bol = false
                }
                console.log('点击列表某一项改变（）' + this.arr[k].bol);
                this.isActive = null;
                this.isActive = k;

            },

            change() {
                if (this.i === 0) {
                    this.i = 1;
                } else {
                    this.i = 0;
                }
            },
            // sort(type) {                     // 排序
            //     this.order = !this.order;		// 更改为 升序或降序
            //     this.sortType = type;
            //     this.Dmessages.sort(this.compare(type));
            //     // 调用下面 compare 方法 并传值
            // },
            // compare(attr) {                  // 排序方法
            //     let that = this;
            //     return function (a, b) {
            //         let val1 = a[attr];
            //         let val2 = b[attr];
            //
            //         if (that.order) {
            //             if (that.sortType == 'time') {            // 如果是时间就转换成时间格式
            //                 return new Date(val2.replace(/-/, '/')) - new Date(val1.replace(/-/, '/'));
            //             } else {
            //                 return val2 - val1;
            //             }
            //
            //         } else {
            //             if (that.sortType == 'time') {
            //                 return new Date(val1.replace(/-/, '/')) - new Date(val2.replace(/-/, '/'));
            //             } else {
            //                 return val1 - val2;
            //             }
            //         }
            //     }
            // },
            // handleCurrentChange: function (currentPage) {
            //     this.currentPage = currentPage;
            // },
            // tokenTest() {
            //     console.log('测试');
            //     getDetails().then(res => {
            //         console.log(res.data);
            //     });
            //     axios.get('http://192.168.43.182:8080/room/test').then(res => {
            //         this.n.one = res.data.data.adsf;
            //         console.log('接受测试', this.n.one);
            //     })
            //
            // },
            // func(){
            //     this.$router.push({ path: '/index',query: { orderId: 2 }})
            // },
            // aaa() {
            //     this.$store.dispatch('LogOut');
            // },
            // func() {
            //     test().then(res => {
            //         console.log(res);
            //     })
            // },
            // getSelectData(date) {
            //     console.log(date);
            //     getMeetingList(date).then(response => {
            //         this.tableData = response.data;
            //         // var list = response.data;
            //         // for(var i = 0; i < list.length; i++){
            //         //     // this.tableData[i] = list[i];
            //         //     for(var j = 0; j<this.tableData[i]; j++){
            //         // this.tableData.id= response.data[0][0];
            //         //     }
            //         // }
            //         console.log(this.tableData.id);
            //     })
            // },
            //     getList(){
            //         text(this.msg).then(response=>{
            //             console.log(response.data);
            //         })
            //         //     .catch(response=>{
            //         //     alert("error");
            //         // })
            //
            // },
            // getFile: function (event) {
            //     this.file = event.target.files[0];
            //     console.log(this.file);
            // },
            // submit: function (event) {
            //     //阻止元素发生默认的行为
            //     event.preventDefault();
            //     let formData = new FormData();
            //     formData.append("file", this.file);
            //     axios.post('http://localhost:8082/upload/singleFile', formData)
            //         .then(function (response) {
            //             alert(response.data);
            //             console.log(response);
            //             window.location.reload();
            //         })
            //         .catch(function (error) {
            //             alert("上传失败");
            //             console.log(error);
            //             window.location.reload();
            //         });
            // },
            // status_change:function ({row}) {
            //     if(row.id === '100'){
            //         if ((row.columnIndex > 1) && (row.rowIndex >= 0)) {
            //                 return 'used'
            //         }
            //     }
            //     console.log(row)
            //
            //     // if(col.id==='100'){
            //     //     return 'demo-table-info-row';
            //     // }
            // },
        },

        // mounted() {
        //     // axios.get('/list').then(res => {
        //     //     this.text = res.data.tableData;
        //     //     console.log(res);
        //     // })
        //     axios.get('/list').then(res => {
        //         this.Data = res.data.tableData;
        //     });
        //     axios.get('/next').then(res => {
        //         this.next = res.data.data;
        //     })
        //
        //
        //
        //
        //     // this.$http({
        //     //     method: 'get',
        //     //     url: '/list'
        //     // })
        // }
    }

</script>

<style scoped>
    .myred {
        background-color: red;
    }

    /*em {*/
    /*font-style: normal;*/
    /*float: right;*/
    /*padding-right: 10px;*/
    /*display: none;*/
    /*}*/

    /*.active em {*/
    /*display: block;*/
    /*}*/
    /*.active {*/
    /*display: block;*/
    /*background-color: red;*/
    /*}*/

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




