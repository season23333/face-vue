<template>
    <el-container>
        <el-tabs type="border-card">
            <el-tab-pane label="按时间找会议室">
                <el-row type="flex"
                        justify="start">
                    <el-col :span="6">
                        <Time></Time>
                    </el-col>
                    <el-col :span="3">
                        <el-button plain @click="dialogVisible = true">新增预定</el-button>
                        <el-dialog
                                title="提示"
                                :visible.sync="dialogVisible"
                                width="30%"
                                :before-close="handleClose">

                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item label="活动名称" prop="name">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item label="活动区域" prop="region">
                                    <el-select v-model="form.region" placeholder="请选择活动区域">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-row>
                                    <el-form-item label="活动日期" prop="date1">

                                        <el-date-picker default-value="" type="date" placeholder="选择日期"
                                                        :picker-options="pickerOptions1" v-model="form.date1"
                                                        style="width: 80%; "></el-date-picker>

                                    </el-form-item>
                                    <el-form-item label="活动时间" prop="date2">

                                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"
                                                        style="width: 80%;"></el-time-picker>

                                    </el-form-item>
                                </el-row>
                                <el-form-item label="即时配送" prop="delivery">
                                    <el-switch v-model="form.delivery"></el-switch>
                                </el-form-item>
                                <el-form-item label="活动性质" prop="type">
                                    <el-checkbox-group v-model="form.type">
                                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="特殊资源" prop="resource">
                                    <el-radio-group v-model="form.resource">
                                        <el-radio label="线上品牌商赞助"></el-radio>
                                        <el-radio label="线下场地免费"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="活动形式" prop="desc">
                                    <el-input type="textarea" v-model="form.desc"></el-input>
                                </el-form-item>
                            </el-form>


                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary"
                                           @click="dialogVisible = false ; onSubmit(form)">确 定</el-button>
                            </span>
                        </el-dialog>
                    </el-col>
                    <el-col :span="5">

                    </el-col>
                    <el-col :span="2" id="el-col-2">
                        过滤：
                    </el-col>
                    <el-col :span="10">
                        <Multi></Multi>
                    </el-col>
                </el-row>
                <Table></Table>
            </el-tab-pane>
            <el-tab-pane label="按会议室找时间">按会议室找时间</el-tab-pane>
        </el-tabs>
    </el-container>
</template>

<script>
    import Time from "@/components/order/Time";
    import Multi from "@/components/order/Multi";
    import Table from "@/components/order/Table";

    export default {
        name: "Main.vue",
        components: {
            Time,
            Multi,
            Table
        },
        data() {
            return {
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                dialogVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            };
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {
                    });
            },
            onSubmit(form) {
                console.log(form.date1);
                this.$refs.form.resetFields();
            }

        }


    }
</script>

<style scoped>
    .el-tabs {
        width: 100%;
    }

    #el-col-2 {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: right;
        font-size: 15px;
        margin: 8px 0;
    }
</style>
