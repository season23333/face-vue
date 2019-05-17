<template>
    <div>
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="会议时间"></el-step>
            <el-step title="会议室"></el-step>
            <el-step title="会议详情"></el-step>
        </el-steps>
        <div v-if="active===0" style="margin-top: 2%">
            <el-form class="demo-form-inline" :inline="true" :model="timeForm">
                <el-form-item label="开始" prop="startDate">
                    <el-date-picker
                            v-model="timeForm.startDate"
                            type="date"
                            placeholder="请选择日期"
                            @change="selectStartDate()"
                            :picker-options="pickerOptions1"
                            :clearable="false"
                    >
                    </el-date-picker>
                </el-form-item>
                <!--:disabled="canStartTime"-->
                <el-form-item prop="startTime">
                    <el-time-select
                            placeholder="起始时间"
                            v-model="timeForm.startTime"
                            :picker-options="{
                                            start: '00:00',
                                            step: '00:30',
                                            end: '23:30'}"
                            @change="selectStartTime()"
                            :clearable="false"
                    >
                    </el-time-select>
                </el-form-item>
                <el-form-item label="结束" prop="endDate">
                    <el-date-picker
                            v-model="timeForm.endDate"
                            type="date"
                            placeholder="请选择日期"
                            :picker-options="pickerOptions1"
                            @change="selectEndDate()"
                            :clearable="false"
                    >
                    </el-date-picker>
                </el-form-item>
                <!--:disabled="canEndTime"-->
                <el-form-item prop="endTime">
                    <el-time-select
                            placeholder="结束时间"
                            v-model="timeForm.endTime"
                            :picker-options="{
                                start: '00:00',
                                step: '00:30',
                                end: '23:30',
                                minTime: minTime
                            }"
                            @change="selectEndTime()"
                            :clearable="false"
                    >
                    </el-time-select>
                </el-form-item>
            </el-form>
            <el-row>
                <el-col :span="24" style="text-align: center">
                    <el-button style="margin-top: 12px; " @click="next">下一步
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div v-if="active===1" style="margin-top: 2%">
            <div>
                <el-form class="demo-form-inline" :inline="true" :model="Form">
                    <el-form-item label="会议地点" prop="address" style="margin-left: 0">
                        <el-select v-model="address.addressID" prop="address.name"
                                   value-key="addressID" placeholder="请选择地点"
                                   clearable
                                   style="width: 180px"
                                   @change="selectAddress()"
                        >
                            <el-option
                                    v-for="item in address"
                                    :key="item.addressID"
                                    :label="item.name"
                                    :value="item.addressID"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会议楼宇" prop="building">
                        <el-select v-model="building.buildingID" prop="building.name"
                                   value-key="buildingID" placeholder="请选择楼宇"
                                   clearable
                                   style="width: 180px"
                                   @change="selectBuilding()"
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
                    <el-form-item label="会议楼层" prop="location">
                        <el-select v-model="location.locationID" prop="location.name"
                                   value-key="locationID" placeholder="请选择楼层"
                                   clearable
                                   style="width: 180px"
                                   @change="selectLocation"
                        >
                            <el-option
                                    v-for="item in location"
                                    :key="item.locationID"
                                    :label="item.name"
                                    :value="item.locationID"
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
                        <el-input-number v-model="anotherForm.size" :min="0" :step="5"
                                         @change="selectSize()"></el-input-number>
                    </el-form-item>
                    <el-form-item label="会议室类型" prop="type">
                        <el-select v-model="type.typeID" prop="type.name"
                                   value-key="typeID" placeholder="请选择类型"
                                   clearable
                                   style="width: 180px"
                                   @change="selectType()"
                        >
                            <el-option
                                    v-for="item in type"
                                    :key="item.typeID"
                                    :label="item.name"
                                    :value="item.typeID"
                            >
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
        <!--v-loading="loading"-->
        <el-table
                :data="tableData"
                style="width: 100%"
                height="400"
                border
                id="table"
                :cell-class-name="cellClassName"
                @cell-click="openDialog"
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
        <el-dialog
                title="预定会议室"
                :visible.sync="dialogVisible"
                width="523px"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px" class="demo-ruleForm" :rules="rules">
                <el-form-item label="申请人ID" prop="ID">
                    <el-input
                            placeholder="申请人ID"
                            v-model="form.ID"
                            :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="会议名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动日期" prop="startTime">
                    <el-date-picker
                            align="center"
                            v-model="form.startTime"
                            type="datetimerange"
                            :picker-options="pickerOptions0"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-row :gutter="12">
                    <el-col :span="14">
                        <el-form-item label="会议地点" prop="building" style="margin-left: 0">
                            <el-input
                                    v-model="form.ID"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="room" id="time">
                            <el-input
                                    v-model="form.ID"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="参会人数" prop="num">
                    <el-input-number v-model="form.num" :min="1" :max="1001" :step="5"
                                     label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary"
                               @click="onSubmit('form')">确 定
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    // import {getMeetingList} from '../api/table';
    import {formatDate} from '../util/formatDate'
    import {byBuilding, getAllBuilding} from '../api/room';
    import {getUserID} from '../api/user';
    import {submitConference} from '../api/conference';
    //第二轮迭代向导预定接口
    import {showTable} from '../api/conference'
    // import axios from 'axios';

    export default {
        name: "Guides",

        data() {
            return {
                date: new Date(),
                loading: false,
                timeForm: {
                    startDate: null,
                    startTime: '00:00',
                    endDate: null,
                    endTime: '23:30',
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },
                Form: {
                    address: '',
                    building: '',
                    location: ''
                },
                anotherForm: {
                    size: 10,
                    type: '-1'
                },
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
                address1: [{
                    name: '请选择地点',
                    //name跟addressID写成一样
                    addressID: '-1'
                }],
                //未链接后端时测试用的变量
                address: [{
                    name: '一路',
                    addressID: '一路'
                }, {
                    name: '二路',
                    addressID: '二路'
                }],
                building: [{
                    name: '请选择楼宇',
                    buildingID: -1,
                }],
                location1: [{
                    name: '请选择楼层',
                    //name跟locationID写成一样
                    locationID: '-1'
                }],
                //未链接后端时测试用的变量
                location: [{
                    name: '1楼',
                    //name跟locationID写成一样
                    locationID: '1楼'
                }, {
                    name: '2楼',
                    locationID: '2楼'
                }],
                type: [{
                    name: '请选择类型',
                    typeID: -1
                }],
                dialogVisible: false,
                form: {
                    ID: '',
                    date: new Date(),
                    name: '',
                    startTime: '',
                    endTime: '',
                    building: '',
                    room: '',
                    num: 1
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                    startTime: [
                        {required: true, message: '请选择开始时间', trigger: 'change'}
                    ],
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                    }
                },
                room: [{
                    name: '请选择会议室',
                    roomID: -1,
                }],
                conference: {
                    subject: '测试会议',
                    room: '1',
                    startTime: '2019-04-20 02:00:00',
                    endTime: '2019-04-20 03:30:00',
                    user: '1',
                    number: '1',
                    status: '1',
                },
                char1: ' ',
                char2: ':00',
                minTime: '',
                //最后发请求的对象
                submitForm: {
                    startTime: '',
                    endTime: '',
                    address: '-1',
                    buildingID: -1,
                    location: '-1',
                    size: '-1',
                    type: '-1'
                },
            };
        },
        created() {
            this.getTableData();

        },
        methods: {
            //判断是否为空，并发请求
            judgeNull() {
                this.submitForm.startTime = this.submitForm.startTime.substring(0, 10);
                this.submitForm.endTime = this.submitForm.endTime.substring(0, 10);
                this.submitForm.startTime = this.submitForm.startTime + this.char1 + this.timeForm.startTime + this.char2;
                this.submitForm.endTime = this.submitForm.endTime + this.char1 + this.timeForm.endTime + this.char2;
                console.log('submit提交对象：' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
                //发请求
            },
            judgeTime() {
                if (formatDate(this.timeForm.startDate, 'yyyy-MM-dd') === formatDate(this.timeForm.endDate, 'yyyy-MM-dd')) {
                    this.minTime = this.timeForm.startTime;
                } else {
                    this.minTime = '';
                }
                // console.log('judgetime:'+this.timeForm.startDate+this.timeForm.endDate)
            },
            //第一次进入页面请求当天所有会议的数据

            getTableData() {
                this.loading = true;
                this.timeForm.startDate = this.date;
                this.timeForm.endDate = this.date;
                this.date = formatDate(this.date, 'yyyy-MM-dd');
                this.submitForm.startTime = this.date;
                this.submitForm.endTime = this.date;
                this.judgeTime();
                this.judgeNull();
                // console.log('第一次进入页面后请求参数' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
                showTable(this.submitForm).then(res => {
                    this.loading = false;
                    this.tableData = res.data;
                })
            },
            //选择开始日期后查询数据
            selectStartDate() {
                if (this.timeForm.startDate !== null) {
                    this.submitForm.startTime = formatDate(this.timeForm.startDate, 'yyyy-MM-dd');
                } else {
                    this.timeForm.startDate = new Date();
                    this.submitForm.startTime = formatDate(this.timeForm.startDate, 'yyyy-MM-dd');
                    this.timeForm.startTime = '00:00';
                }
                var timestamp1 = Date.parse(formatDate(this.timeForm.startDate, 'yyyy-MM-dd'));
                timestamp1 = timestamp1 / 1000;
                var timestamp = Date.parse(formatDate(this.timeForm.endDate, 'yyyy-MM-dd'));
                timestamp = timestamp / 1000;
                if (timestamp < timestamp1) {
                    this.timeForm.endDate = this.timeForm.startDate;
                    this.submitForm.endTime = formatDate(this.timeForm.endDate, 'yyyy-MM-dd');
                }
                this.judgeTime();
                this.judgeNull();
                // showTable().then(res => {
                // console.log('提交了'+res.data.userID+res.data.realName+res.data.department+res.data.email+res.data.phoneNumber);
                // })
                // console.log('选择开始日期后请求参数' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
            },
            //选择开始时间后查询数据
            selectStartTime() {
                // this.minTime = this.timeForm.startTime;
                if (this.timeForm.startTime === null) {
                    this.timeForm.startTime = '00:00';
                }
                this.judgeTime();
                this.judgeNull();
                // console.log('选择开始时间后请求参数' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
            },
            //选择结束日期后查询数据
            //在这里判断是否结束日期在开始日期之后，如果不符合就消息提示 不发请求
            selectEndDate() {
                if (this.timeForm.endDate !== null) {
                    this.submitForm.endTime = formatDate(this.timeForm.endDate, 'yyyy-MM-dd');
                    var timestamp1 = Date.parse(formatDate(this.timeForm.startDate, 'yyyy-MM-dd'));
                    timestamp1 = timestamp1 / 1000;
                    var timestamp = Date.parse(formatDate(this.timeForm.endDate, 'yyyy-MM-dd'));
                    timestamp = timestamp / 1000;
                    if (timestamp < timestamp1) {
                        this.timeForm.endDate = this.timeForm.startDate;
                        return this.$message.warning('会议结束日期需要在开始日期之后');
                    }
                } else {
                    this.timeForm.endDate = this.timeForm.startDate;
                    this.submitForm.endTime = formatDate(this.timeForm.endDate, 'yyyy-MM-dd');
                    this.timeForm.endTime = '23:30';
                    // this.canEndTime = true;
                }
                this.judgeTime();
                this.judgeNull();
                // console.log('选择结束日期后请求参数' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
            },
            //选择结束时间后查询数据
            selectEndTime() {
                if (this.timeForm.endTime === null) {
                    this.timeForm.endTime = '23:30';
                }
                this.judgeNull();
                // console.log('选择结束时间后请求参数' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
            },
            //下一步
            next() {
                if (this.active === 0) {
                    this.judgeNull();
                    //发请求刷新表格
                    // showTable().then(res => {
                    // })
                    //获取所有会议地点
                    this.getAddress();
                    //获取所有会议楼宇
                    this.getBuilding();
                    //获取所有会议楼层
                    this.getMyLocation();
                }
                if (this.active++ > 2) this.active = 0;
                //发请求刷新表格
            },
            //获取所有会议地点
            getAddress() {
                //发请求获取会议地点，现在模拟一下数据
                // getAllAddress().then(response => {
                //     this.address = response.data;
                //     console.log(this.address);
                // })
            },
            //获取所有会议楼宇
            getBuilding() {
                //写新接口，接口应该要三个参数，地址、楼宇、楼层，响应参数传address、building、location对象回来
                getAllBuilding().then(response => {
                    this.building = response.data;
                    console.log(this.building);
                })
            },
            //获取所有会议楼层
            getMyLocation() {
                //发请求获取会议楼层,现在模拟一下数据
                // getAllLocation().then(response => {
                //     this.location = response.data;
                //     console.log(this.location);
                // })
            },
            selectAddress() {
                if (this.address.addressID === '') {
                    this.submitForm.address = '-1';
                } else {
                    this.submitForm.address = this.address.addressID;
                }
                console.log('选择地点后请求参数' + this.submitForm.address);
                this.judgeNull().then(()=>{
                    //获取所有会议楼宇
                    this.getBuilding();
                    //获取所有会议楼层
                    this.getMyLocation();
                })
            },
            selectBuilding() {
                if (this.building.buildingID === '') {
                    this.submitForm.buildingID = -1;
                } else {
                    this.submitForm.buildingID = this.building.buildingID;
                }
                console.log('选择楼宇后请求参数' + this.submitForm.buildingID);
            },
            selectLocation() {
                if (this.location.locationID === '') {
                    this.submitForm.location = '-1';
                } else {
                    this.submitForm.location = this.location.locationID;
                }
                console.log('选择楼层后请求参数' + this.submitForm.location);
            },
            selectSize() {
                console.log('选择会议容量后请求参数' + this.anotherForm.size);
            },
            selectType() {

            },
            openDialog(row) {
                this.dialogVisible = true;
                //打开申请会议表单时请求用户名字和ID
                getUserID().then(res => {
                    this.form.ID = res.data;
                });
                console.log('行列：' + row.buidling.name, row.roomID, row.capacity)//计数器最大值设置为capacity，最小值设置为1
            },
            getRoom() {
                this.currentRoomID = -1;
                console.log('获取会议室名字' + this.building.buildingID);
                this.form.building = this.building.name;
                this.currentBuildingID = this.building.buildingID;
                if (this.currentBuildingID) {
                    byBuilding(this.building.buildingID).then(response => {
                        this.room = response.data;
                        console.log(this.room);
                    });
                }
                if (!this.currentBuildingID) {
                    this.room = [];
                }
            },
            getRoomID() {
                this.currentRoomID = this.room.roomID;
                console.log(this.currentRoomID);
                if (!this.currentRoomID) {
                    this.room = [];
                    this.currentRoomID = -1;
                }
            },
            //关闭对话框并清空表单数据
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var date = new Date();
                        var timestamp1 = Date.parse(formatDate(date, 'yyyy-MM-dd hh:mm:ss'));
                        timestamp1 = timestamp1 / 1000;
                        var timestamp = formatDate(this.form.startTime[0], 'yyyy-MM-dd hh:mm:ss');
                        timestamp = Date.parse(timestamp);
                        timestamp = timestamp / 1000;
                        if (timestamp < timestamp1) {
                            return this.$message.warning('请输入正确的时间');
                        }
                        //请求参数赋值
                        this.conference.subject = this.form.name;
                        this.conference.room = this.room.roomID;
                        this.conference.startTime = formatDate(this.form.startTime[0], 'yyyy-MM-dd hh:mm:ss');
                        this.conference.endTime = formatDate(this.form.startTime[1], 'yyyy-MM-dd hh:mm:ss');
                        this.conference.user = this.form.ID;
                        this.conference.number = this.form.num;
                        console.log(this.conference);
                        submitConference(this.conference).then(res => {
                            console.log(res.status);
                            if (res.status === 0) {
                                this.$message({
                                    message: '预定会议成功',
                                    type: 'success'
                                });
                            }
                        });
                        this.dialogVisible = false;
                        this.$nextTick(() => {
                            this.$refs.form.resetFields();
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //关闭对话框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.$refs.form.resetFields();
                        this.dialogVisible = false;
                        done();
                    })
                    .catch(() => {
                    });
            },
            prev() {
                --this.active;
                if (this.active < 0) this.active = 0;
            },
            // cellClassName({ row, column, rowIndex,columnIndex})
            cellClassName({columnIndex}) {
                if (columnIndex > 1) {
                    return 'test'
                } else {
                    return 'xiaowangshixiaoshazi'
                }
            },

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