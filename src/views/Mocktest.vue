<template>
    <div>
        <el-table
                :data="tableData"
                ref="mytable"
                height="160"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
        <div v-scroll="loadMore">
            <ul class="news">
                <li  class="news__item" v-for="(news, index) in newslist">
                    {{index}}-{{news.title}}
                </li>
            </ul>
        </div>
    </div>


</template>
<style>
    .news__item {
        height: 80px;
        border: 1px solid #ccc;
        margin-bottom: 20px;
    }
</style>
<script>
    export default{
        data(){
            return{
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                newslist: [
                    {title: 'hello world'},
                    {title: 'hello world'},
                    {title: 'hello world'},
                    {title: 'hello world'},
                    {title: 'hello world'},
                    {title: 'hello world'},
                    {title: 'hello world'},
                    {title: 'hello world'},
                    {title: 'hello world'},
                    {title: 'hello world'}
                ],
                obj:{
                    date: '2016-05-03',
                    name: '王小虎4',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            }
        },
        directives: {
            scroll: {
                bind: function (el, binding){
                    el.addEventListener('scroll', ()=> {
                        console.log(el);
                        if(el.scrollHeight - el.scrollTop - el.clientHeight<=0){
                        // if(el.scrollTop + window.innerHeight >= el.clientHeight) {
                            console.log('load data');
                        }
                    })
                }
            }
        },
        mounted(){
            this.$refs.mytable.bodyWrapper.addEventListener('scroll', (res) => {

                let height = res.target;

                let clientHeight = height.clientHeight;
                let scrollTop = height.scrollTop;
                let scrollHeight = height.scrollHeight;

                if(clientHeight + scrollTop  >= scrollHeight){
                    console.log(clientHeight + scrollTop);
                    console.log(scrollHeight);
                    this.tableData[4] = this.obj;
                }

            },true);

        },
        methods: {
            abcd(){
              console.log()
            },
            loadMore() {
                let newAry = [];
                for(let i = 0; i < 10; i++) {
                    newAry.push({title: 'hello world'})
                }
                this.newslist = [...this.newslist, ...newAry];
            },

        }
    }
</script>

<!--<template>-->
    <!--<div class="fullscreen">-->
        <!--<div class="login-box">-->
            <!--<div style="text-align: center">-->
                <!--<img src="../assets/logo1.png" alt="" class="logo">-->
            <!--</div>-->
            <!--<p class="text-tips" style="font-size: medium;">用户注册</p>-->
            <!--<form action="" class="login-form">-->
                <!--<div class="m-list-group">-->
                    <!--<div class="m-list-group-item">-->
                        <!--<input type="text" placeholder="用户组" class="m-input" v-model="userGroup" @focus="show =true"-->
                               <!--@blur="show=false">-->
                        <!--<div v-loading="divLoading" v-if="show === true"-->
                             <!--style=" position: absolute;background-color: white">-->
                            <!--<el-scrollbar style="height: 100%">-->
                                <!--&lt;!&ndash;overflow-y:scroll;overflow-x:hidden;&ndash;&gt;-->
                                <!--<ul class="myul" style="height: 80px">-->
                                    <!--<li v-for='(v,k) in arr' :key="k" @click="show = false" class="myli"-->
                                        <!--@mouseenter="mouseEnter(k)"-->
                                        <!--@mouseleave="mouseLeave">-->
                                        <!--<span>{{v}}</span>-->
                                    <!--</li>-->
                                <!--</ul>-->
                            <!--</el-scrollbar>-->
                        <!--</div>-->
                    <!--</div>-->

                <!--</div>-->
            <!--</form>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--import {register} from '../api/user';-->

    <!--export default {-->
        <!--name: 'Register',-->
        <!--data() {-->
            <!--return {-->
                <!--arr: [-->
                    <!--"aaa", "bbb", "ccc"-->
                <!--],-->
                <!--show: false,-->
                <!--password: '',-->
                <!--realName: '',-->
                <!--department: '',-->
                <!--phoneNumber: '',-->
                <!--userGroup: '',-->
                <!--email: '',-->
                <!--code: 200,-->
                <!--pwdType: 'password',-->
            <!--}-->
        <!--},-->
        <!--methods: {-->

        <!--}-->
    <!--}-->
<!--</script>-->
<!--<style type="text/css">-->
    <!--.m-list-group {-->
        <!--border-radius: 3px;-->
        <!--padding: 0;-->
        <!--margin: 0 0 20px;-->
    <!--}-->

    <!--.m-list-group .m-list-group-item {-->
        <!--position: relative;-->
        <!--display: block;-->
        <!--padding: 6px 10px;-->
        <!--margin-bottom: 5px;-->
        <!--background-color: #fff;-->
        <!--border: 1px solid #e7ecee;-->
    <!--}-->

    <!--.m-list-group .m-list-group-item:first-child {-->
        <!--border-top-left-radius: 3px;-->
        <!--border-top-right-radius: 3px;-->
    <!--}-->

    <!--.m-list-group .m-list-group-item:last-child {-->
        <!--border-bottom-left-radius: 3px;-->
        <!--border-bottom-right-radius: 3px;-->
    <!--}-->

    <!--.fullscreen {-->
        <!--position: absolute;-->
        <!--width: 100%;-->
        <!--height: 100%;-->
        <!--background: #F4F5F5;-->
        <!--display: flex;-->
        <!--justify-content: center;-->
        <!--align-items: center;-->
    <!--}-->

    <!--.login-box {-->
        <!--position: relative;-->
        <!--width: 330px;-->
        <!--margin: 0 auto;-->
        <!--padding: 0px 15px;-->
    <!--}-->

    <!--.login-box .logo {-->
        <!--max-width: 40%;-->
        <!--margin-bottom: 30px;-->
    <!--}-->

    <!--.login-box .text-tips {-->
        <!--text-align: center;-->
        <!--color: #909DB7;-->
    <!--}-->

    <!--.login-box .m-input {-->
        <!--width: 100%;-->
        <!--padding: 10px;-->
        <!--border: none;-->
        <!--outline: none;-->
        <!--box-sizing: border-box;-->
    <!--}-->

    <!--.login-box .m-btn {-->
        <!--font-size: 18px;-->
        <!--width: 100%;-->
        <!--color: #fff;-->
        <!--background-color: #ACD392;-->
        <!--display: inline-block;-->
        <!--padding: 10px 12px;-->
        <!--margin-bottom: 10px;-->
        <!--line-height: 1.42857143;-->
        <!--text-align: center;-->
        <!--cursor: pointer;-->
        <!--outline: none;-->
        <!--border-radius: 2px;-->
        <!--border: 1px solid #ACD392;-->
        <!--box-sizing: border-box;-->
        <!--text-decoration: none;-->
    <!--}-->

    <!--.login-box .m-btn.m-btn-text {-->
        <!--background: #fff;-->
        <!--color: #36C1FA;-->
    <!--}-->

    <!--.login-box .m-btn:hover {-->
        <!--background-color: #99CC66;-->
    <!--}-->

    <!--.login-box .m-btn.m-btn-text:hover {-->
        <!--background-color: #F4F5F5;-->
    <!--}-->

    <!--.login-box .m-btn:active {-->
        <!--opacity: 0.8;-->
    <!--}-->

    <!--@media (max-width: 768px) {-->
        <!--.login-box {-->
            <!--width: auto;-->
        <!--}-->
    <!--}-->

    <!--.myul {-->
        <!--padding: 10px 0 0;-->
        <!--margin: 0;-->
        <!--display: block;-->
        <!--list-style-type: disc;-->
        <!--scroll-snap-margin-block-start: 1em;-->
        <!--scroll-snap-margin-block-end: 1em;-->
        <!--scroll-snap-margin-inline-start: 0px;-->
        <!--scroll-snap-margin-inline-end: 0px;-->
        <!--scroll-padding-inline-start: 40px;-->
    <!--}-->

    <!--.myli {-->
        <!--height: 40px;-->
        <!--padding: 0 30px;-->
        <!--cursor: pointer;-->
        <!--display: flex;-->
        <!--align-items: center;-->
        <!--list-style-type: none;-->
        <!--width: 100px;-->
        <!--position: relative;-->
        <!--min-height: 40px;-->
        <!--color: #666;-->
        <!--outline-style: none;-->
    <!--}-->

    <!--/*.el-scrollbar__thumb {*/-->
    <!--/*display: none;*/-->
    <!--/*}*/-->

    <!--.el-scrollbar__wrap {-->
        <!--overflow-x: hidden;-->
        <!--overflow-y: auto;-->
    <!--}-->
<!--</style>-->

<!--<template>-->
<!--<div>-->
<!--<el-button type="text" @click="msgDialogVisible = true" >打开嵌套表单的 Dialog-->
<!--</el-button>-->
<!--<el-dialog title="与会人" :visible.sync="msgDialogVisible" :before-close="closeDialog">-->
<!--<el-tag-->
<!--style="margin-right: 10px"-->
<!--:key="tag"-->
<!--v-for="tag in nameList"-->
<!--closable-->
<!--:disable-transitions="false"-->
<!--@close="handleClose(tag)">-->
<!--{{tag}}-->
<!--</el-tag>-->
<!--<el-popover-->
<!--placement="right"-->
<!--width="240"-->
<!--trigger="click">-->
<!--<div>-->
<!--<el-input v-model="search" placeholder="请输入与会人" suffix-icon="el-icon-search"-->
<!--style="width: 200px"></el-input>-->
<!--<div v-loading="divLoading" v-if="sshow === true">-->
<!--<ul class="myul">-->
<!--<li v-for='(v,k) in arr' :key="k" @click="data(k)" class="myli"-->
<!--@mouseenter="mouseEnter(k)"-->
<!--@mouseleave="mouseLeave">-->
<!--<span>{{v.realName}}{{v.phoneNumber}}</span>-->
<!--<div style=" right: 0">-->
<!--<i v-if="isActive===k&&v.bol===false" class="icon-span"-->
<!--:class="{'icon-span-selec' : v.bol===false}"></i>-->
<!--<i v-else-if="v.bol===true" class="icon-span"-->
<!--:class="{'icon-span-select' : v.bol===true}"></i>-->
<!--</div>-->
<!--</li>-->
<!--</ul>-->
<!--</div>-->
<!--</div>-->
<!--<el-button slot="reference">新增通知人</el-button>-->
<!--</el-popover>-->
<!--<div slot="footer" class="dialog-footer">-->
<!--<el-button @click="msgDialogVisible = false">取 消</el-button>-->
<!--<el-button type="primary" @click="update()">确 定</el-button>-->
<!--</div>-->
<!--</el-dialog>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--// import axios from 'axios';-->
<!--import {validatePeople} from "../api/user"-->
<!--import {Message} from 'element-ui'-->

<!--export default {-->
<!--name: "mocktest",-->
<!--data() {-->
<!--return {-->
<!--search: '',-->
<!--arr: [-->
<!--{-->
<!--bol: false,-->
<!--userID: '',-->
<!--realName: '',-->
<!--phoneNumber: '',-->
<!--str: ''-->
<!--},-->
<!--],-->
<!--isActive: -1,-->
<!--searchPoi: [],-->
<!--divLoading: false,-->
<!--onLine: true,-->
<!--msgDialogVisible: false,-->
<!--dynamicTags: [],-->
<!--timeout: null,-->
<!--sshow: false,-->
<!--nameList: []-->
<!--}-->
<!--},-->
<!--watch: {-->
<!--search(curVal) {-->
<!--// 实现input连续输入，只发一次请求-->
<!--if (curVal === '') {-->
<!--this.sshow = false;-->
<!--return false;-->
<!--} else {-->
<!--var reg = /^[\u0391-\uFFE5A-Za-z]+$/;-->
<!--if (reg.test(curVal)) {-->
<!--// if (this.nameList.indexOf(curVal) !== -1)-->
<!--this.sshow = true;-->
<!--} else {-->
<!--this.sshow = false;-->
<!--Message({-->
<!--message: '请输入正确姓名',-->
<!--type: 'error',-->
<!--duration: 1000-->
<!--});-->
<!--return false;-->
<!--}-->
<!--}-->
<!--clearTimeout(this.timeout);-->
<!--this.timeout = setTimeout(() => {-->
<!--console.log('???' + curVal);-->
<!--this.getListPOI(curVal);-->
<!--}, 300);-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--//模糊匹配-->
<!--async getListPOI(inputVal) {-->
<!--if (inputVal === '') {-->
<!--return false;-->
<!--}-->
<!--this.searchPoi = [];-->
<!--this.divLoading = true;-->
<!--if (!navigator.onLine) {//没有网络-->
<!--// this.onLine = false;-->
<!--this.divLoading = false;-->
<!--return false;-->
<!--}-->
<!--try {-->
<!--await validatePeople(inputVal).then(res => {-->
<!--this.arr = res.data;-->
<!--for (var i = 0; i < res.data.length; i++) {-->
<!--var str = this.arr[i].realName + this.arr[i].phoneNumber;-->
<!--this.arr[i].str = str;-->
<!--if (this.nameList.indexOf(str) === -1) {-->
<!--this.arr[i].bol = false;-->
<!--} else {-->
<!--this.arr[i].bol = true;-->
<!--}-->
<!--}-->
<!--});-->
<!--this.divLoading = false;-->
<!--// console.log(this.timeout)-->
<!--} catch (err) {-->
<!--console.log(err);-->
<!--}-->
<!--},-->
<!--mouseEnter(index) {-->
<!--this.isActive = index;-->
<!--console.log('鼠标移入（false是灰色 未选择这一项）:' + this.arr[index].bol);-->
<!--},-->
<!--//   鼠标移除-->
<!--mouseLeave() {-->
<!--this.isActive = null;-->
<!--},-->
<!--data(k) {-->
<!--this.search = this.arr[k].realName;-->
<!--if (this.arr[k].bol === false) {-->
<!--this.arr[k].bol = true;-->
<!--var str = this.arr[k].realName + this.arr[k].phoneNumber;-->
<!--this.nameList.push(str);-->
<!--// this.nameList.push(this.arr[k].realName);-->
<!--} else {-->
<!--this.arr[k].bol = false;-->
<!--this.nameList.splice(this.nameList.indexOf(this.arr[k].realName), 1);-->
<!--}-->
<!--console.log('点击列表某一项改变（）' + this.arr[k].bol);-->
<!--this.isActive = null;-->
<!--this.isActive = k;-->

<!--},-->
<!--handleClose(tag) {-->
<!--for (var i = 0; i < this.arr.length; i++) {-->
<!--if (this.arr[i].str === tag) {-->
<!--this.arr[i].bol = false;-->
<!--}-->
<!--}-->
<!--this.nameList.splice(this.nameList.indexOf(tag), 1);-->
<!--},-->
<!--closeDialog(done) {-->
<!--this.$confirm('确认关闭？')-->
<!--.then(_ => {-->
<!--done();-->
<!--})-->
<!--.catch(_ => {-->
<!--});-->
<!--},-->
<!--update(){-->
<!--this.msgDialogVisible = false;-->
<!--console.log('提交了')-->
<!--}-->
<!--// change() {-->
<!--//     if (this.i === 0) {-->
<!--//         this.i = 1;-->
<!--//     } else {-->
<!--//         this.i = 0;-->
<!--//     }-->
<!--// },-->
<!--// sort(type) {                     // 排序-->
<!--//     this.order = !this.order;		// 更改为 升序或降序-->
<!--//     this.sortType = type;-->
<!--//     this.Dmessages.sort(this.compare(type));-->
<!--//     // 调用下面 compare 方法 并传值-->
<!--// },-->
<!--// compare(attr) {                  // 排序方法-->
<!--//     let that = this;-->
<!--//     return function (a, b) {-->
<!--//         let val1 = a[attr];-->
<!--//         let val2 = b[attr];-->
<!--//-->
<!--//         if (that.order) {-->
<!--//             if (that.sortType == 'time') {            // 如果是时间就转换成时间格式-->
<!--//                 return new Date(val2.replace(/-/, '/')) - new Date(val1.replace(/-/, '/'));-->
<!--//             } else {-->
<!--//                 return val2 - val1;-->
<!--//             }-->
<!--//-->
<!--//         } else {-->
<!--//             if (that.sortType == 'time') {-->
<!--//                 return new Date(val1.replace(/-/, '/')) - new Date(val2.replace(/-/, '/'));-->
<!--//             } else {-->
<!--//                 return val1 - val2;-->
<!--//             }-->
<!--//         }-->
<!--//     }-->
<!--// },-->
<!--// handleCurrentChange: function (currentPage) {-->
<!--//     this.currentPage = currentPage;-->
<!--// },-->
<!--// tokenTest() {-->
<!--//     console.log('测试');-->
<!--//     getDetails().then(res => {-->
<!--//         console.log(res.data);-->
<!--//     });-->
<!--//     axios.get('http://192.168.43.182:8080/room/test').then(res => {-->
<!--//         this.n.one = res.data.data.adsf;-->
<!--//         console.log('接受测试', this.n.one);-->
<!--//     })-->
<!--//-->
<!--// },-->
<!--// func(){-->
<!--//     this.$router.push({ path: '/index',query: { orderId: 2 }})-->
<!--// },-->
<!--// aaa() {-->
<!--//     this.$store.dispatch('LogOut');-->
<!--// },-->
<!--// func() {-->
<!--//     test().then(res => {-->
<!--//         console.log(res);-->
<!--//     })-->
<!--// },-->
<!--// getSelectData(date) {-->
<!--//     console.log(date);-->
<!--//     getMeetingList(date).then(response => {-->
<!--//         this.tableData = response.data;-->
<!--//         // var list = response.data;-->
<!--//         // for(var i = 0; i < list.length; i++){-->
<!--//         //     // this.tableData[i] = list[i];-->
<!--//         //     for(var j = 0; j<this.tableData[i]; j++){-->
<!--//         // this.tableData.id= response.data[0][0];-->
<!--//         //     }-->
<!--//         // }-->
<!--//         console.log(this.tableData.id);-->
<!--//     })-->
<!--// },-->
<!--//     getList(){-->
<!--//         text(this.msg).then(response=>{-->
<!--//             console.log(response.data);-->
<!--//         })-->
<!--//         //     .catch(response=>{-->
<!--//         //     alert("error");-->
<!--//         // })-->
<!--//-->
<!--// },-->
<!--// getFile: function (event) {-->
<!--//     this.file = event.target.files[0];-->
<!--//     console.log(this.file);-->
<!--// },-->
<!--// submit: function (event) {-->
<!--//     //阻止元素发生默认的行为-->
<!--//     event.preventDefault();-->
<!--//     let formData = new FormData();-->
<!--//     formData.append("file", this.file);-->
<!--//     axios.post('http://localhost:8082/upload/singleFile', formData)-->
<!--//         .then(function (response) {-->
<!--//             alert(response.data);-->
<!--//             console.log(response);-->
<!--//             window.location.reload();-->
<!--//         })-->
<!--//         .catch(function (error) {-->
<!--//             alert("上传失败");-->
<!--//             console.log(error);-->
<!--//             window.location.reload();-->
<!--//         });-->
<!--// },-->
<!--// status_change:function ({row}) {-->
<!--//     if(row.id === '100'){-->
<!--//         if ((row.columnIndex > 1) && (row.rowIndex >= 0)) {-->
<!--//                 return 'used'-->
<!--//         }-->
<!--//     }-->
<!--//     console.log(row)-->
<!--//-->
<!--//     // if(col.id==='100'){-->
<!--//     //     return 'demo-table-info-row';-->
<!--//     // }-->
<!--// },-->
<!--},-->

<!--// mounted() {-->
<!--//     // axios.get('/list').then(res => {-->
<!--//     //     this.text = res.data.tableData;-->
<!--//     //     console.log(res);-->
<!--//     // })-->
<!--//     axios.get('/list').then(res => {-->
<!--//         this.Data = res.data.tableData;-->
<!--//     });-->
<!--//     axios.get('/next').then(res => {-->
<!--//         this.next = res.data.data;-->
<!--//     })-->
<!--//-->
<!--//-->
<!--//-->
<!--//-->
<!--//     // this.$http({-->
<!--//     //     method: 'get',-->
<!--//     //     url: '/list'-->
<!--//     // })-->
<!--// }-->
<!--}-->

<!--</script>-->

<!--<style scoped>-->
<!--.myred {-->
<!--background-color: red;-->
<!--}-->

<!--/*em {*/-->
<!--/*font-style: normal;*/-->
<!--/*float: right;*/-->
<!--/*padding-right: 10px;*/-->
<!--/*display: none;*/-->
<!--/*}*/-->

<!--/*.active em {*/-->
<!--/*display: block;*/-->
<!--/*}*/-->
<!--/*.active {*/-->
<!--/*display: block;*/-->
<!--/*background-color: red;*/-->
<!--/*}*/-->

<!--.myul {-->
<!--padding: 10px 0 0;-->
<!--margin: 0;-->
<!--display: block;-->
<!--list-style-type: disc;-->
<!--scroll-snap-margin-block-start: 1em;-->
<!--scroll-snap-margin-block-end: 1em;-->
<!--scroll-snap-margin-inline-start: 0px;-->
<!--scroll-snap-margin-inline-end: 0px;-->
<!--scroll-padding-inline-start: 40px;-->
<!--}-->

<!--.myli {-->
<!--height: 40px;-->
<!--padding: 0 30px;-->
<!--cursor: pointer;-->
<!--display: flex;-->
<!--align-items: center;-->
<!--list-style-type: none;-->
<!--width: 100%;-->
<!--position: relative;-->
<!--min-height: 40px;-->
<!--color: #666;-->
<!--outline-style: none;-->
<!--}-->

<!--.icon-span {-->
<!--display: inline-block;-->
<!--background-color: #fff;-->
<!--border-radius: 100%;-->
<!--border: 1px solid #ccc;-->
<!--position: relative;-->
<!--width: 30px;-->
<!--height: 30px;-->
<!--vertical-align: middle;-->
<!--}-->

<!--.icon-span::after {-->
<!--border: 2px solid transparent;-->
<!--border-left: 0;-->
<!--border-top: 0;-->
<!--content: " ";-->
<!--top: 3px;-->
<!--left: 8px;-->
<!--position: absolute;-->
<!--width: 10px;-->
<!--height: 16px;-->
<!-- -webkit-transform: rotate(45deg) scale(0);-->
<!--transform: rotate(45deg) scale(0);-->
<!-- -webkit-transition: -webkit-transform .2s;-->
<!--transition: -webkit-transform .2s;-->
<!--transition: transform .2s;-->
<!--transition: transform .2s, -webkit-transform .2s;-->
<!--}-->

<!--.icon-span-select {-->
<!--/*background-color: green;*/-->
<!--border-color: #fff;-->
<!--}-->

<!--.icon-span-select::after {-->
<!--border-color: green;-->
<!-- -webkit-transform: rotate(45deg) scale(1);-->
<!--transform: rotate(45deg) scale(1);-->
<!--}-->

<!--.icon-span-selec {-->
<!--border-color: #fff;-->
<!--}-->

<!--.icon-span-selec::after {-->
<!--border-color: lightgray;-->
<!-- -webkit-transform: rotate(45deg) scale(1);-->
<!--transform: rotate(45deg) scale(1);-->
<!--}-->


<!--</style>-->

<!--<style scoped>-->

<!--</style>-->
<!--<template>-->
<!--<div>-->
<!--<el-table-->
<!--:data="tableData"-->
<!--style="width: 100%;">-->
<!--<el-table-column-->
<!--:render-header="renderHeader"-->
<!--prop="date"-->
<!--label="日期"-->
<!--width="180">-->
<!--</el-table-column>-->
<!--<el-table-column-->
<!--v-if="flag === false"-->
<!--prop="name"-->
<!--label="姓名"-->
<!--width="180">-->
<!--</el-table-column>-->
<!--<el-table-column-->
<!--prop="address"-->
<!--label="地址"-->
<!--&gt;-->
<!--</el-table-column>-->
<!--</el-table>-->
<!--&lt;!&ndash;<i :class="[rotate?'el-icon-caret-left go':'el-icon-caret-left aa']" @click="start"></i>&ndash;&gt;-->
<!--&lt;!&ndash;//class随rotate的true或者false改变 我这为图方便用了项目里的图标测试，图片也是一样的~&ndash;&gt;-->
<!--</div>-->

<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--data () {-->
<!--return {-->
<!--flag:true,-->
<!--tableData: [{-->
<!--date: '2016-05-02',-->
<!--name: '王小虎',-->
<!--address: '上海市普陀区金沙江路 1518 弄'-->
<!--}, {-->
<!--date: '2016-05-04',-->
<!--name: '王小虎',-->
<!--address: '上海市普陀区金沙江路 1517 弄'-->
<!--}, {-->
<!--date: '2016-05-01',-->
<!--name: '王小虎',-->
<!--address: '上海市普陀区金沙江路 1519 弄'-->
<!--}, {-->
<!--date: '2016-05-03',-->
<!--name: '王小虎',-->
<!--address: '上海市普陀区金沙江路 1516 弄'-->
<!--}]-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--// renderHeader(h) {-->
<!--//     return (-->
<!--//         <div>-->
<!--//         <span>日期</span>-->
<!--//         <i class="el-icon-caret-left" style="margin-left: 10px" v-if="flag===true"></i>-->
<!--//         </div>-->
<!--// )-->
<!--// },-->
<!--renderHeader (h, { column, $index }) {-->
<!--return h('span', [-->
<!--h('span', {-->
<!--class: [this.flag?'el-icon-caret-left':'el-icon-caret-right'],-->
<!--// class: 'el-icon-caret-left',-->
<!--on: {-->
<!--click: () => {-->
<!--this.start();-->
<!--}-->
<!--}-->
<!--}),-->
<!--h('span', column.label)-->
<!--])-->
<!--},-->
<!--start(){-->
<!--// this.rotate=!this.rotate;-->
<!--// console.log(this.rotate)-->
<!--if(this.flag === true){-->
<!--this.flag = false;-->
<!--}else{-->
<!--this.flag = true;-->
<!--}-->
<!--console.log(this.flag)-->
<!--},-->
<!--// must(obj) {-->
<!--//     if (obj.columnIndex === 1) {-->
<!--//         return 'must'-->
<!--//     }-->
<!--// }-->
<!--}-->
<!--}-->
<!--</script>-->