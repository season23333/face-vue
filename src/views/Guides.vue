<template>
    <div>
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="会议时间"></el-step>
            <el-step title="会议室"></el-step>
            <el-step title="会议详情"></el-step>
        </el-steps>

        <div v-if="active===0">
            <el-row :gutter="0">
                <!--<el-form ref="form" :inline="true" :model="form" class="demo-form-inline" label-width="80px"-->
                <!--style="margin-top: 2%">-->
                <!--<el-input label="选择日期" prop="date">-->
                <el-col :span="10">
                    <div class="block" style="margin-top: 5% ; margin-left: 28%">
                        <span class="demonstration" style="margin-right: 2% ;font-size: 16px ">日期：</span>
                        <el-date-picker
                                v-model="date"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy-MM-dd "
                                value-format="yyyy-MM-dd"
                                @change="getSelectData(date)">
                        </el-date-picker>
                    </div>
                </el-col>
                <!--</el-input>-->
                <!--<el-col :span="12">-->
                <el-col :span="12" style="text-align: left;margin-left: 0.3%;margin-top: 0.08%;">
                    <div class="block" style="margin-top: 3.88%">
                        <span class="demonstration" style="margin-right: 1% ; font-size: 16px">时间：</span>
                        <!--<el-form-item label="开始时间" prop="startTime">-->
                        <el-time-select
                                placeholder="起始时间"
                                v-model="startTime"
                                :picker-options="{
                                            start: '00:00',
                                            step: '00:30',
                                            end: '23:30'}"

                        >
                        </el-time-select>
                        <!--</el-form-item>-->

                        <span class="demonstration" style="">&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</span>
                        <!--<el-form-item label="结束时间" prop="endTime">-->
                        <el-time-select
                                placeholder="结束时间"
                                v-model="endTime"
                                :picker-options="{
                                start: '00:00',
                                step: '00:30',
                                end: '23:30',
                                minTime: startTime
                                }"
                                @change="getSelectStartTime(startTime,endTime)">
                        </el-time-select>
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                        <el-button style="margin-top: 12px; " @click="prev" v-if="active==1||active==2">上一步</el-button>
                        <el-button style="margin-top: 2%;margin-left: 60%;" @click="next" v-if="active==0||active==1">
                            下一步
                        </el-button>
                        <el-button style="margin-top: 12px" v-if="active==2">提交</el-button>
                        <!--</el-form-item>-->

                    </div>
                </el-col>
                <!--</el-form>-->
            </el-row>
        </div>
        <div v-if="active===1">
            <el-row :gutter="0">
                <el-form ref="form" :inline="true" :model="form" class="demo-form-inline" label-width="80px"
                         style="margin-top: 2% ">
                    <el-form-item label="位置" prop="date">
                        <!--<el-col :span="10">-->
                        <!--<div class="block" style="margin-top: 5% ; margin-left: 28%">-->
                        <!--<span class="demonstration" style="margin-right: 2% ;font-size: 16px ">日期：</span>-->
                        <el-date-picker
                                v-model="date"
                                type="date"
                                placeholder="选择日期"
                                @change="getSelectData(date)">
                        </el-date-picker>
                        <!--</div>-->
                        <!--</el-col>-->
                    </el-form-item>
                    <el-form-item label="容量" prop="endTime">
                        <el-time-select
                                placeholder="结束时间"
                                v-model="endTime"
                                :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '18:30',
                            minTime: startTime
                            }">
                        </el-time-select>
                    </el-form-item>
                    <el-form-item label="设备">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="投影仪" name="type" style="margin-right: 10px"></el-checkbox>
                            <el-checkbox label="白板" name="type" style="margin-right: 10px"></el-checkbox>
                            <el-checkbox label="空调" name="type" style="margin-right: 10px"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-row>
                        <el-form-item>
                            <el-col :span="10" style="text-align: left ">
                                <el-button style="margin-top: 12px" @click="prev" v-if="active==1||active==2">上一步
                                </el-button>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-col :span="10" style="text-align: right">
                                <el-button style="margin-top: 12px; " @click="next" v-if="active==0||active==1">下一步
                                </el-button>
                                <el-button style="margin-top: 12px" v-if="active==2">提交</el-button>
                            </el-col>
                        </el-form-item>
                    </el-row>
                </el-form>
            </el-row>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%"
                height="400"
                border
                v-if="active===1||active===0"
                id="table"
                :cell-class-name="cellClassName"
                :header-cell-style="{background:'#E6F2F2'}">

            <el-table-column
                    label="详情"
                    fixed
                    width="60"
                    type="expand">
                <template scope="scope">
                    <span>位置：{{ scope.row.location}}容量：{{scope.row.size}}设备：{{scope.row.equipment}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    fixed
                    prop="id"
                    label="会议室编号"
                    width="150"
                    align="center">
            </el-table-column>
            <el-table-column label="00:00" align="center">
                <el-table-column
                        prop="time0000"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0000 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0030"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0030 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="01:00" align="center">
                <el-table-column
                        prop="time0100"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0100 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0130"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0130 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="02:00" align="center">
                <el-table-column
                        prop="time0200"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0200 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0230"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0230 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="03:00" align="center">
                <el-table-column
                        prop="time0300"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0300 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0330"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0330 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="04:00" align="center">
                <el-table-column
                        prop="time0400"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0400 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0430"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0430 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="05:00" align="center">
                <el-table-column
                        prop="time0500"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0500 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0530"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0530 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="06:00" align="center">
                <el-table-column
                        prop="time0600"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0600 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0630"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0630 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>

            </el-table-column>
            <el-table-column label="07:00" align="center">
                <el-table-column
                        prop="time0700"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0700 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0730"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0730 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="08:00" align="center">
                <el-table-column
                        prop="time0800"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0800 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0830"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0830 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="09:00" align="center">
                <el-table-column
                        prop="time0900"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0900 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time0930"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time0930 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="10:00" align="center">
                <el-table-column
                        prop="time1000"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1000 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time1930"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1030 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="11:00" align="center">
                <el-table-column
                        prop="time1100"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1100 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time1130"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1130 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="12:00" align="center">
                <el-table-column
                        prop="time1200"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1200 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time1230"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1230 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="13:00" align="center">
                <el-table-column
                        prop="time1300"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1300 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time1330"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1330 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="14:00" align="center">
                <el-table-column
                        prop="time1400"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1400 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time1430"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1430 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="15:00" align="center">
                <el-table-column
                        prop="time1500"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1500 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time1530"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1530 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="16:00" align="center">
                <el-table-column
                        prop="time1600"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1600 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time1630"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1630 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="17:00" align="center">
                <el-table-column
                        prop="time1700"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1700 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time1730"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1730 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="18:00" align="center">
                <el-table-column
                        prop="time1800"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1800 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time1830"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1830 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="19:00" align="center">
                <el-table-column
                        prop="time1900"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1900 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time1930"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time1930 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="20:00" align="center">
                <el-table-column
                        prop="time2000"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time2000 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time2030"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time2030 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="21:00" align="center">
                <el-table-column
                        prop="time2100"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time2100 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time2130"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time2130 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="22:00" align="center">
                <el-table-column
                        prop="time2200"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time2200 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time2230"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time2230 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="23:00" align="center">
                <el-table-column
                        prop="time2300"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time2300 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time2330"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.time2330 === 1 ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
        <div v-if="active===2">
            <div>
                <el-row :gutter="25">

                    <el-col :span="14">
                        <div style="border-bottom: 1px solid lightgrey ; width: 70% ; margin-left: 25% ;margin-top: 3% ; padding-bottom: 1%">
                            <h3 style="font-size: large ; color: #909399 ; text-align: left ; font-weight: 500">
                                会议室申请说明
                            </h3>
                        </div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                                 style="width: 70% ; margin-left: 25% ; margin-top: 2% " class="demo-ruleForm"
                                 :label-position="labelPosition" label-width="20%">
                            <el-form-item label="会议名称" prop="name">
                                <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                            </el-form-item>
                            <el-form-item label="申请人">
                                <el-input v-model="formInline.user" placeholder="" style="width: 80%;"></el-input>
                            </el-form-item>
                            <el-form-item label="参与者">
                                <el-input v-model="formInline.user" placeholder="" style="width: 80%"></el-input>
                            </el-form-item>
                            <el-form-item label="会议内容" prop="desc">
                                <el-input type="textarea" v-model="ruleForm.desc" style="width: 80%"></el-input>
                            </el-form-item>
                            <!--<el-form-item>-->
                            <!--&lt;!&ndash;<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-button @click="resetForm('ruleForm')">重置</el-button>&ndash;&gt;-->
                            <!--</el-form-item>-->
                            <el-form-item style="text-align: right">

                                <el-button style="margin-top: 12px; " @click="prev" v-if="active==1||active==2">上一步
                                </el-button>
                                <el-button style="margin-top: 12px; " @click="next" v-if="active==0||active==1">下一步
                                </el-button>
                                <el-button style="margin-top: 12px" v-if="active==2">提交</el-button>

                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="10">
                        <div style="width: 60% ; margin-top: 5% ">
                            <h3 style="border-bottom: 1px solid lightgray ; padding-bottom: 1% ; font-size: large ; color: #909399 ; text-align: left ; font-weight: 500 ">
                                会议室详情
                            </h3>
                            <el-row>
                                <el-col :span="12">
                                    <div style="text-align: left ; margin-top: 12%">
                                        <p style="font-size: 14px; color: #606266">会议室名：</p>
                                        <p style="font-size: 14px; color: #606266">所在位置：</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div style="text-align: left ; margin-top: 12%">
                                        <p style="font-size: 14px; color: #606266">容量：</p>
                                        <p style="font-size: 14px; color: #606266">设备：</p>
                                    </div>
                                </el-col>
                            </el-row>
                            <h3 style="border-bottom: 1px solid lightgray ; padding-bottom: 1% ; font-size: large ; color: #909399 ; text-align: left ; font-weight: 500 ; margin-top: 4%">
                                会议时间
                            </h3>
                            <div style="text-align: left ; margin-top: 7%">
                                <p style="font-size: 14px; color: #606266">日期：</p>
                                <p style="font-size: 14px; color: #606266">时间：</p>
                            </div>

                        </div>
                    </el-col>
                </el-row>

            </div>


        </div>


    </div>
</template>

<script>

    import {getMeetingList} from '../api/table';
    import '@/util/mock';
    import axios from 'axios';

    export default {
        name: "Guides",

        data() {
            return {
                date: new Date(),
                startTime: '',
                endTime: '',
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

                }
                ],

                labelPosition: 'right',
                active: 0,

                date1: '',
                Data: [],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                sizeForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formInline: {
                    user: '',
                    region: ''
                },
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }

            };
        },
        methods: {
            getSelectData(date) {
                // this.date1 = date;
                // console.log(this.date1);
                // console.log(typeof this.date1);
                getMeetingList(date).then(response => {
                    this.tableData = response.data;
                    console.log(this.tableData);
                })
            },

            getSelectStartTime(startTime, endTime) {
                for (let item of this.tableData) {
                    console.log(item);
                }
            },

            prev() {
                --this.active;
                if (this.active < 0) this.active = 0;
            },
            next() {
                if (this.active++ > 2) this.active = 0;
            },


            onSubmit() {
                console.log('submit!');
            },


            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            cellClassName({row, column, rowIndex, columnIndex}) {
                if (columnIndex > 1) {
                    return 'test'
                } else {
                    return 'xiaowangshixiaoshazi'
                }
            }

        },
        mounted() {
            axios.get('/list').then(res => {
                this.tableData = res.data.tableData;
                console.log(res);
            })
            // axios.get('/list').then(res => {
            //     this.tableData = res.data.tableData;
            //     console.log(this.tableData.length);
            // })
            // getMeetingList(this.date).then(response=>{
            //     this.tableData = response.data.tableData;
            // })
        }
    }
</script>

<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }

    #table {
        margin-top: 20px;
    }

    .el-table .used {
        background: #FAEECC;
        width: 100%;
        height: 100%;
        /*width: 9px;*/
        /*height: 18px;*/
        /*border-right:2px solid #EA7669;*/
        /*border-bottom:2px solid #EA7669;*/
        /*transform: rotate(40deg);*/
        /*margin-left: 30%;*/

    }

    .el-table .test {
        padding: 0;
    }

    .el-table .test .cell {
        padding: 0;
        width: 100%;
        height: 40px;
    }

    .el-table .xiaowangshixiaoshazi {
        padding: 8px;
        background: #E6F2F2;
    }

</style>