<!--<script>-->
    <!--data: function(){-->
        <!--return {-->
            <!--Dmessages: [{-->
                <!--name: '吴娇',-->
                <!--phone: 15265320210,-->
                <!--ticket: 3,-->
                <!--integral: 300000,-->
                <!--time:'2019-1-19',-->
            <!--},{-->
                <!--name: '忙着长肉',-->
                <!--phone: 15265320210,-->
                <!--ticket: 2,-->
                <!--integral: 50000,-->
                <!--time:'2019-1-29'-->
            <!--},{-->
                <!--name: '刘珊珊',-->
                <!--phone: 15265320210,-->
                <!--ticket: 5,-->
                <!--integral: 3000,-->
                <!--time:'2019-1-22'-->
            <!--},{-->
                <!--name: '刘珊珊',-->
                <!--phone: 15265320210,-->
                <!--ticket: 9,-->
                <!--integral: 90000,-->
                <!--time:'2019-1-30'-->
            <!--}],-->
            <!--sortType: null,                 // 数组对象中的哪一个属性进行排序-->
            <!--order: false,                   // 升序还是降序-->
        <!--}-->
    <!--},-->
    <!--methods: {-->
        <!--sort(type){                     // 排序-->
            <!--this.order = !this.order;		// 更改为 升序或降序-->
            <!--this.sortType = type;-->
            <!--this.Dmessages.sort(this.compare(type));-->
            <!--// 调用下面 compare 方法 并传值-->
        <!--},-->
        <!--compare(attr){                  // 排序方法-->
            <!--let that = this;-->
            <!--return function(a,b){-->
                <!--let val1 = a[attr];-->
                <!--let val2 = b[attr];-->

                <!--if(that.order){-->
                    <!--if(that.sortType == 'time'){            // 如果是时间就转换成时间格式-->
                        <!--return new Date(val2.replace(/-/,'/')) - new Date(val1.replace(/-/,'/'));-->
                    <!--}else{-->
                        <!--return val2 - val1;-->
                    <!--}-->

                <!--}else{-->
                    <!--if(that.sortType == 'time'){-->
                        <!--return new Date(val1.replace(/-/,'/')) - new Date(val2.replace(/-/,'/'));-->
                    <!--}else{-->
                        <!--return val1 - val2;-->
                    <!--}-->
                <!--}-->
            <!--}-->
        <!--}-->
    <!--},-->
<!--</script>-->




<template>
    <div>
        <!--<button @click="sort('date')">aaaaa</button>-->
        <!--<el-table-->

                <!--:data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"-->
                <!--style="width: 100%">-->
            <!--<el-table-column-->
                    <!--sortable-->
                    <!--prop="date"-->
                    <!--label="日期"-->
                    <!--width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="name"-->
                    <!--label="姓名"-->
                    <!--width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="address"-->
                    <!--label="地址">-->
            <!--</el-table-column>-->
        <!--</el-table>-->
        <!--<el-pagination-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="currentPage"-->
                <!--:page-size="pagesize"-->
                <!--background-->
                <!--layout="prev, pager, next"-->
                <!--:total="tableData.length">-->
        <!--</el-pagination>-->
        <!--<a @click="getList()">aaaa</a>-->
        <!--<h3>mock测试</h3>-->
        <!--<h3>数据渲染：{{ text }}</h3>-->
        <!--<h1>{{ msg }}</h1>-->
        <!--<h1>{{ next }}</h1>-->
        <!--&lt;!&ndash;<form>&ndash;&gt;-->
        <!--&lt;!&ndash;<input type="file" @change="getFile($event)">&ndash;&gt;-->
        <!--&lt;!&ndash;<button class="button button-primary button-pill button-small" @click="submit($event)">提交</button>&ndash;&gt;-->
        <!--&lt;!&ndash;</form>&ndash;&gt;-->


        <!--<el-table :data="Data" >-->
        <!--<el-table-column prop="id" label="Id" :class="Data.id === '100'? 'used':''">-->
        <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
        <!--&lt;!&ndash;<div :class="scope.row.id === '100'? 'used':''">{{scope.row.id}}</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="time" label="时间">-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <!--<span v-for="u in tableData[0]">{{ u }}<br></span>-->
        <!--<h3>{{this.$store.state.msg}}</h3>-->
        <button @click="func()">点我!</button>
        <button @click="aaa()">清除token</button>
    </div>
</template>

<script>
    // import '@/util/mock';
    import axios from 'axios';
    import {text} from '../api/table'
    import {test} from '../api/login'
    import {getMeetingList} from '../api/table';
    import {getDetails} from "../api/user";

    export default {
        name: "mocktest",
        data() {
            return {
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
                currentPage:1,
                pagesize:2,
                n: {
                    one1: '',
                    two: ''
                },
            }
        },
        // created() {
        //     // this.getSelectData('2019-03-13 00:00:00');
        //     this.$store.state.msg = 'aaa';
        // },
        created() {
            this.tokenTest();
        },
        methods: {
            sort(type){                     // 排序
                this.order = !this.order;		// 更改为 升序或降序
                this.sortType = type;
                this.Dmessages.sort(this.compare(type));
                // 调用下面 compare 方法 并传值
            },
            compare(attr){                  // 排序方法
                let that = this;
                return function(a,b){
                    let val1 = a[attr];
                    let val2 = b[attr];

                    if(that.order){
                        if(that.sortType == 'time'){            // 如果是时间就转换成时间格式
                            return new Date(val2.replace(/-/,'/')) - new Date(val1.replace(/-/,'/'));
                        }else{
                            return val2 - val1;
                        }

                    }else{
                        if(that.sortType == 'time'){
                            return new Date(val1.replace(/-/,'/')) - new Date(val2.replace(/-/,'/'));
                        }else{
                            return val1 - val2;
                        }
                    }
                }
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },
            tokenTest() {
                console.log('测试');
                getDetails().then(res => {
                    console.log(res.data);
                });
                axios.get('http://192.168.43.182:8080/room/test').then(res => {
                    this.n.one = res.data.data.adsf;
                    console.log('接受测试', this.n.one);
                })

            },
            // func(){
            //     this.$router.push({ path: '/index',query: { orderId: 2 }})
            // },
            aaa() {
                this.$store.dispatch('LogOut');
            },
            func() {
                test().then(res => {
                    console.log(res);
                })
            },
            getSelectData(date) {
                console.log(date);
                getMeetingList(date).then(response => {
                    this.tableData = response.data;
                    // var list = response.data;
                    // for(var i = 0; i < list.length; i++){
                    //     // this.tableData[i] = list[i];
                    //     for(var j = 0; j<this.tableData[i]; j++){
                    // this.tableData.id= response.data[0][0];
                    //     }
                    // }
                    console.log(this.tableData.id);
                })
            },
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
        watch: {},

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
    .demo-table-info-row {
        background: #2d8cf0;
    }

    .used el-table {
        background: #008080;
    }
</style>




