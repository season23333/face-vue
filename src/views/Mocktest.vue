<template>
    <div>
        <a @click="getList()">aaaa</a>
        <h3>mock测试</h3>
        <h3>数据渲染：{{ text }}</h3>
        <h1>{{ msg }}</h1>
        <h1>{{ next }}</h1>
        <!--<form>-->
            <!--<input type="file" @change="getFile($event)">-->
            <!--<button class="button button-primary button-pill button-small" @click="submit($event)">提交</button>-->
        <!--</form>-->


        <el-table :data="Data" >
            <el-table-column prop="id" label="Id" :class="Data.id === '100'? 'used':''">
                <!--<template slot-scope="scope">-->
                    <!--<div :class="scope.row.id === '100'? 'used':''">{{scope.row.id}}</div>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column prop="time" label="时间">
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    // import '@/util/mock';
    // import axios from 'axios';
    import {text} from '../api/table'

    export default {
        name: "mocktest",
        data(){
            return{
                text:"",
                msg: 'Welcome to Your Vue.js App',
                file: '',
                Data:[],
                next: "",
            }
        },
        methods: {
                getList(){
                    text(this.msg).then(response=>{
                        console.log(response.data);
                    })
                    //     .catch(response=>{
                    //     alert("error");
                    // })

            },
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




