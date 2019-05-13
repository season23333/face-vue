<template>
    <div>
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="会议时间"></el-step>
            <el-step title="会议室"></el-step>
            <el-step title="会议详情"></el-step>
        </el-steps>
        <div v-if="active===0" style="margin-top: 2%">
            <div>
                <div style="width: 50%;float: left">
                    <label>开始时间：</label>
                    <el-date-picker
                            style="margin-bottom: 10px"
                            v-model="startDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="getSelectData(date)">
                    </el-date-picker>
                    <el-time-select
                            style="margin-left: 20px;margin-bottom: 10px"
                            placeholder="起始时间"
                            v-model="startTime"
                            :picker-options="{
                                            start: '00:00',
                                            step: '00:30',
                                            end: '23:30'}"

                    >
                    </el-time-select>
                </div>
                <div style="width: 50%;float: left">
                    <label>结束时间：</label>
                    <el-date-picker
                            style="margin-bottom: 10px"
                            v-model="endDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="getSelectData(date)">
                    </el-date-picker>
                    <el-time-select
                            style="margin-left: 20px;margin-bottom: 10px"
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
                </div>
            </div>
            <el-row>
                <el-col :span="24" style="text-align: center">
                    <el-button style="margin-top: 12px; " @click="next">下一步
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div v-if="active===1" style="margin-top: 2%">
            <div>
                <el-form class="demo-form-inline" :inline="true" :model="form">
                    <el-form-item label="会议地点" prop="address" style="margin-left: 0">
                        <el-select v-model="building.buildingID" prop="building.name"
                                   value-key="buildingID" placeholder="请选择地点"
                                   clearable
                                   style="width: 180px"
                        >
                            <el-option
                                    v-for="item in building"
                                    :key="item.buildingID"
                                    :label="item.name"
                                    :value="item.buildingID"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会议楼宇" prop="building">
                        <el-select v-model="building.buildingID" prop="building.name"
                                   value-key="buildingID" placeholder="请选择楼宇"
                                   clearable
                                   style="width: 180px"
                        >
                            <el-option
                                    v-for="item in building"
                                    :key="item.buildingID"
                                    :label="item.name"
                                    :value="item.buildingID"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会议楼层" prop="address">
                        <el-select v-model="building.buildingID" prop="building.name"
                                   value-key="buildingID" placeholder="请选择楼层"
                                   clearable
                                   style="width: 180px"
                        >
                            <el-option
                                    v-for="item in building"
                                    :key="item.buildingID"
                                    :label="item.name"
                                    :value="item.buildingID"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-col :span="12" style="text-align: center ">
                        <el-button style="margin-top: 12px" @click="prev" v-if="active==1||active==2">上一步
                        </el-button>
                    </el-col>
                    <el-col :span="12" style="text-align: center">
                        <el-button style="margin-top: 12px; " @click="next" v-if="active==0||active==1">下一步
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div v-if="active===2" style="margin-top: 2%">
            <div>
                <el-form class="demo-form-inline" :inline="true" :model="anotherForm">
                    <el-form-item label="会议容量" prop="size">
                        <el-input-number v-model="anotherForm.size" :step="5"></el-input-number>
                    </el-form-item>
                    <el-form-item label="会议室类型" prop="type">
                        <el-select v-model="anotherForm.type" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-col :span="24" style="text-align: center ">
                        <el-button style="margin-top: 12px" @click="prev" v-if="active==1||active==2">上一步
                        </el-button>
                    </el-col>
                    <el-col :span="12" style="text-align: center">
                        <el-button style="margin-top: 12px; " @click="next" v-if="active==0||active==1">下一步
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%"
                height="400"
                border
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

    </div>
</template>

<script>
    import {getMeetingList} from '../api/table';
    import {formatDate} from '../util/formatDate'
    import {byBuilding, getAllBuilding} from '../api/room';
    // import axios from 'axios';

    export default {
        name: "Guides",

        data() {
            return {
                startDate: '-1',
                startTime: '-1',
                endDate: '-1',
                endTime: '-1',
                form: {
                    address:'-1',
                    building: '-1',
                    location:'-1'
                },
                anotherForm:{
                    size:-1,
                    type:'-1'
                },
                date: new Date(),
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
                active: 0,

                building: [{
                    name: '请选择楼宇',
                    buildingID: -1,
                }],

            };
        },
        created() {
            this.getTableData(this.date);
            console.log(formatDate(this.date, 'yyyy-MM-dd'));
            this.getPlace();
        },
        methods: {
            //获取所有楼名数据
            getPlace() {
                getAllBuilding().then(response => {
                    this.building = response.data;
                    console.log(this.building);
                })
            },
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