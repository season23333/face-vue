<template>
    <div>
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
        <h3>{{this.$store.state.msg}}</h3>
        <button @click="func()">点我!</button>

    </div>
</template>

<script>
    // import '@/util/mock';
    // import axios from 'axios';
    import {text} from '../api/table'
    import {getMeetingList} from '../api/table';

    export default {
        name: "mocktest",
        data(){
            return{
                text:"",
                msg: 'Welcome to Your Vue.js App',
                file: '',
                Data:[],
                next: "",
                tableData: [{
                    location: '',
                    size: '',
                    equipment: '',
                    id: '',
                    time: {
                        time0000: '',
                        time0030: '',
                        time0100: '',
                        time0130: '',
                        time0200: '',
                        time0230: '',
                        time0300: '',
                        time0330: '',
                        time0400: '',
                        time0430: '',
                        time0500: '',
                        time0530: '',
                        time0600: '',
                        time0630: '',
                        time0700: '',
                        time0730: '',
                        time0800: '',
                        time0830: '',
                        time0900: '',
                        time0930: '',
                        time1000: '',
                        time1030: '',
                        time1100: '',
                        time1130: '',
                        time1200: '',
                        time1230: '',
                        time1300: '',
                        time1330: '',
                        time1400: '',
                        time1430: '',
                        time1500: '',
                        time1530: '',
                        time1600: '',
                        time1630: '',
                        time1700: '',
                        time1730: '',
                        time1800: '',
                        time1830: '',
                        time1900: '',
                        time1930: '',
                        time2000: '',
                        time2030: '',
                        time2100: '',
                        time2130: '',
                        time2200: '',
                        time2230: '',
                        time2300: '',
                        time2330: '',
                    }
                }]
            }
        },
        created() {
            // this.getSelectData('2019-03-13 00:00:00');
            this.$store.state.msg = 'aaa';
        },
        methods: {
            func(){
                this.$router.push({ path: '/index',query: { orderId: 2 }})
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
        watch:{

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
    .demo-table-info-row {
        background: #2d8cf0;
    }
    .used el-table{
        background: #008080;
    }
</style>




