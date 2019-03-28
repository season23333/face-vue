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
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd HH:mm:ss"
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
        <div v-if="active===1" style="margin-top: 2%">
            <el-row :gutter="0">
                <!--<el-form ref="form" :inline="true" :model="form" class="demo-form-inline" label-width="80px"-->
                <!--style="margin-top: 2% ">-->
                <!--<el-form-item label="位置" prop="date">-->
                <!--&lt;!&ndash;<el-col :span="10">&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="block" style="margin-top: 5% ; margin-left: 28%">&ndash;&gt;-->
                <!--&lt;!&ndash;<span class="demonstration" style="margin-right: 2% ;font-size: 16px ">日期：</span>&ndash;&gt;-->
                <!--<el-date-picker-->
                <!--v-model="date"-->
                <!--type="date"-->
                <!--placeholder="选择日期"-->
                <!--@change="getSelectData(date)">-->
                <!--</el-date-picker>-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                <!--</el-form-item>-->
                <!--<el-form-item label="容量" prop="endTime">-->
                <!--<el-time-select-->
                <!--placeholder="结束时间"-->
                <!--v-model="endTime"-->
                <!--:picker-options="{-->
                <!--start: '08:30',-->
                <!--step: '00:15',-->
                <!--end: '18:30',-->
                <!--minTime: startTime-->
                <!--}">-->
                <!--</el-time-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="设备">-->
                <el-col :span="8">
                    <span style="margin-left: 30%">
                        会议地点:
                    </span>
                    <el-select v-model="tableData.location" clearable placeholder="请选择会议地点">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <span>
                        会议容量:
                    </span>
                    <el-select v-model="size" placeholder="请选择会议容量">
                        <el-option label="20人以下" value="shanghai"></el-option>
                        <el-option label="20-100人" value="beijing"></el-option>
                        <el-option label="100人以上" value="beijing"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <div style="margin-top: 2% ; margin-right: 40%">
                        <el-checkbox-group v-model="equipment">
                            <el-checkbox label="投影仪" name="type" style="margin-right: 10px"></el-checkbox>
                            <el-checkbox label="白板" name="type" style="margin-right: 10px"></el-checkbox>
                            <el-checkbox label="空调" name="type" style="margin-right: 10px"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-col>

                <!--</el-form-item>-->
                <el-row>
                    <!--<el-form-item>-->
                    <el-col :span="12" style="text-align: center ">
                        <el-button style="margin-top: 12px" @click="prev" v-if="active==1||active==2">上一步
                        </el-button>
                    </el-col>
                    <!--</el-form-item>-->
                    <!--<el-form-item>-->
                    <el-col :span="12" style="text-align: center">
                        <el-button style="margin-top: 12px; " @click="next" v-if="active==0||active==1">下一步
                        </el-button>
                        <el-button style="margin-top: 12px" v-if="active==2">提交</el-button>
                    </el-col>
                    <!--</el-form-item>-->
                </el-row>
                <!--</el-form>-->
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
                @cell-click="next"
                :header-cell-style="{background:'#E6F2F2'}">

            <el-table-column
                    label="详情"
                    fixed
                    width="60"
                    type="expand">
                <template scope="scope">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容量：{{scope.row.capacity}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;设备：{{scope.row.catalogue}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    fixed
                    prop="name"
                    label="会议室名称"
                    width="150"
                    align="center">
            </el-table-column>
            <el-table-column label="00:00" align="center">
                <el-table-column
                        prop="zeroFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.zeroFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="zeroHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.zeroHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="01:00" align="center">
                <el-table-column
                        prop="oneFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.oneFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="oneHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.oneHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="02:00" align="center">
                <el-table-column
                        prop="twoFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twoFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="twoHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twoHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="03:00" align="center">
                <el-table-column
                        prop="threeFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.threeFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="threeHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.threeHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="04:00" align="center">
                <el-table-column
                        prop="fourFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.fourFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fourHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.fourHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="05:00" align="center">
                <el-table-column
                        prop="fiveFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.fiveFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fiveHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.fiveHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="06:00" align="center">
                <el-table-column
                        prop="sixFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.sixFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sixHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.sixHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="07:00" align="center">
                <el-table-column
                        prop="sevenFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.sevenFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sevenHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.sevenHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="08:00" align="center">
                <el-table-column
                        prop="eightFull"
                        label="00"
                        width="40"
                >
                    <template scope="scope">
                        <div :class="scope.row.eightFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="eightHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.eightHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="09:00" align="center">
                <el-table-column
                        prop="nineFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.nineFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="nineHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.nineHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="10:00" align="center">
                <el-table-column
                        prop="tenFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.tenFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tenHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.tenHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="11:00" align="center">
                <el-table-column
                        prop="elevenFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.elevenFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="elevenHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.elevenHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="12:00" align="center">
                <el-table-column
                        prop="twelveFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twelveFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="twelveHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twelveHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="13:00" align="center">
                <el-table-column
                        prop="thirteenFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.thirteenFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="thirteenHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.thirteenHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="14:00" align="center">
                <el-table-column
                        prop="fourteenFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.fourteenFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fourteenHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.fourteenHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="15:00" align="center">
                <el-table-column
                        prop="fifteenFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.fifteenFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fifteenHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.fifteenHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="16:00" align="center">
                <el-table-column
                        prop="sixteenFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.sixteenFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sixteenHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.sixteenHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="17:00" align="center">
                <el-table-column
                        prop="seventeenFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.seventeenFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="seventeenHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.seventeenHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="18:00" align="center">
                <el-table-column
                        prop="eighteenthFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.eighteenthFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="eighteenthHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.eighteenthHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="19:00" align="center">
                <el-table-column
                        prop="nineteenFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.nineteenFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="nineteenHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.nineteenHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="20:00" align="center">
                <el-table-column
                        prop="twentyFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twentyFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="twentyHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twentyHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="21:00" align="center">
                <el-table-column
                        prop="twentyOneFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twentyOneFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="twentyOneHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twentyOneHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="22:00" align="center">
                <el-table-column
                        prop="twentyTwoFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twentyTwoFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="twentyTwoHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twentyTwoHalf === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="23:00" align="center">
                <el-table-column
                        prop="twentyThreeFull"
                        label="00"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twentyThreeFull === true ? 'used':''"></div>
                        <!--<span v-if="scope.row.time0800=== 1" >{{scope.$index+1}} </span>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="twentyThreeHalf"
                        label="30"
                        width="40">
                    <template scope="scope">
                        <div :class="scope.row.twentyThreeHalf === true ? 'used':''"></div>
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
                                <el-input v-model="ruleForm.user" style="width: 80%;"></el-input>
                            </el-form-item>
                            <el-form-item label="参与者">
                                <el-input v-model="ruleForm.users" style="width: 80%"></el-input>
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
                                <el-button style="margin-top: 12px" v-if="active==2"
                                           @click="centerDialogVisible = true">提交
                                </el-button>
                                <el-dialog
                                        title="提示"
                                        :visible.sync="centerDialogVisible"
                                        width="30%"
                                        center
                                >
                                    <div style="text-align: center ; padding: 0">
                                        <h3>会议预定成功</h3>
                                    </div>

                                </el-dialog>

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
                                        <p style="font-size: 14px; color: #606266">会议室名：综合楼A417</p>
                                        <p style="font-size: 14px; color: #606266">所在位置：综合楼A</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div style="text-align: left ; margin-top: 12%">
                                        <p style="font-size: 14px; color: #606266">容量：20~100人</p>
                                        <p style="font-size: 14px; color: #606266">设备：投影仪,白板</p>
                                    </div>
                                </el-col>
                            </el-row>
                            <h3 style="border-bottom: 1px solid lightgray ; padding-bottom: 1% ; font-size: large ; color: #909399 ; text-align: left ; font-weight: 500 ; margin-top: 4%">
                                会议时间
                            </h3>
                            <div style="text-align: left ; margin-top: 7%">
                                <p style="font-size: 14px; color: #606266">日期：2019年3月26日</p>
                                <p style="font-size: 14px; color: #606266">时间：11:00--12:00</p>
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
    import {formatDate} from '../util/formatDate'
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
                    roomID: 0,
                    name: '',
                    buidling: 0,
                    location: '',
                    capacity: '',
                    catalogue: '',
                    flag: 1,
                    zeroFull: '',
                    zeroHalf: '',
                    oneFull: '',
                    oneHalf: '',
                    twoFull: '',
                    twoHalf: '',
                    threeFull: '',
                    threeHalf: '',
                    fourFull: '',
                    fourHalf: '',
                    fiveFull: '',
                    fiveHalf: '',
                    sixFull: '',
                    sixHalf: '',
                    sevenFull: '',
                    sevenHalf: '',
                    eightFull: '',
                    eightHalf: '',
                    nineFull: '',
                    nineHalf: '',
                    tenFull: '',
                    tenHalf: '',
                    elevenFull: '',
                    elevenHalf: '',
                    twelveFull: '',
                    twelveHalf: '',
                    thirteenFull: '',
                    thirteenHalf: '',
                    fourteenFull: '',
                    fourteenHalf: '',
                    fifteenFull: '',
                    fifteenHalf: '',
                    sixteenFull: '',
                    sixteenHalf: '',
                    seventeenFull: '',
                    seventeenHalf: '',
                    eighteenthFull: '',
                    eighteenthHalf: '',
                    nineteenFull: '',
                    nineteenHalf: '',
                    twentyFull: '',
                    twentyHalf: '',
                    twentyOneFull: '',
                    twentyOneHalf: '',
                    twentyTwoFull: '',
                    twentyTwoHalf: '',
                    twentyThreeFull: '',
                    twentyThreeHalf: '',
                }
                ],

                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],

                location:
                    '',
                size:
                    '',
                equipment:
                    '',

                labelPosition:
                    'right',
                active:
                    0,
                centerDialogVisible:
                    false,

                ruleForm:
                    {
                        name: '',
                        user:
                            '',
                        users:
                            '',
                        desc:
                            ''
                    }
                ,
                rules: {
                    name: [
                        {required: true, message: '请输入会议名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    user:
                        [
                            {required: true, message: '请填写活动形式', trigger: 'blur'},
                        ],
                    users:
                        [
                            {required: true, message: '请填写活动形式', trigger: 'blur'},
                        ],
                    region:
                        [
                            {required: true, message: '请选择活动区域', trigger: 'change'}
                        ],
                    date1:
                        [
                            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                        ],
                    date2:
                        [
                            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                        ],
                    type:
                        [
                            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                        ],
                    resource:
                        [
                            {required: true, message: '请选择活动资源', trigger: 'change'}
                        ],
                    desc:
                        [
                            {required: true, message: '请填写活动形式', trigger: 'blur'}
                        ]
                }

            };
        },

        created() {
            this.getTableData(this.date);
            console.log(formatDate(this.date, 'yyyy-MM-dd'));
        }
        ,

        methods: {
            //选择查询日期后请求当天所有的会议数据
            getSelectData(date) {
                console.log(date);
                getMeetingList(date).then(response => {
                    this.tableData = response.data;
                    // var list = response.data;
                    // for(var i = 0; i < list.length; i++){
                    //     this.tableData[i] = list[i];
                    // }
                    console.log(this.tableData[0].catalogue);
                })
            }
            ,
            getSelectStartTime(startTime, endTime) {
                axios.get('/list1').then(res => {
                    this.tableData = res.data.tableData;
                    console.log(res);
                })
                console.log(startTime, endTime)
            }
            ,
            prev() {
                --this.active;
                if (this.active < 0) this.active = 0;
            }
            ,
            next() {
                if (this.active++ > 2) this.active = 0;
            }
            ,
            onSubmit() {
                console.log('submit!');
            }
            ,
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
            ,
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
            ,
            // cellClassName({ row, column, rowIndex,columnIndex})
            cellClassName({columnIndex}) {
                if (columnIndex > 1) {
                    return 'test'
                } else {
                    return 'xiaowangshixiaoshazi'
                }
            }
            ,
            //第一次进入页面请求当天所有会议的数据
            getTableData(date) {
                getMeetingList(date).then(response => {
                    console.log(response.data);
                })
            }

        }
        ,
        // mounted() {
        //     axios.get('/list').then(res => {
        //         this.tableData = res.data.tableData;
        //         console.log(res);
        //     })
        //     // axios.get('/list').then(res => {
        //     //     this.tableData = res.data.tableData;
        //     //     console.log(this.tableData.length);
        //     // })
        //     // getMeetingList(this.date).then(response=>{
        //     //     this.tableData = response.data.tableData;
        //     // })
        // }
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