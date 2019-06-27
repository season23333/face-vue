<template>
    <div>
        <el-dialog title="预定推荐" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column property="name" label="会议室"></el-table-column>
                <el-table-column property="building.name" label="楼宇"></el-table-column>
                <el-table-column property="catalogue" label="类型"></el-table-column>
                <el-table-column property="capacity" label="容量"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="success"
                                @click="handleReserve(scope.row)">预定
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
                title="推荐会议室预定"
                :visible.sync="reserveDialogVisible"
                width="523px"
                :before-close="closeReserve">
            <el-form ref="ReserveForm" :model="ReserveForm" label-width="80px" class="demo-ruleForm"
                     :rules="reserveRule">
                <el-form-item label="申请人" prop="realName">
                    <el-input
                            placeholder="申请人"
                            v-model="ReserveForm.realName"
                            :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="会议名称" prop="name">
                    <el-input v-model="ReserveForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动日期" prop="startTime">
                    <el-date-picker
                            align="center"
                            v-model="ReserveForm.startTime"
                            type="datetimerange"
                            :picker-options="pickerOptions0"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <!--<el-row :gutter="20">-->
                    <!--<el-col :span="14">-->
                        <el-form-item label="会议楼宇" prop="building.name" style="margin-left: 0">
                            <el-input
                                    v-model="ReserveForm.building.name"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    <!--</el-col>-->
                    <!--<el-col :span="10">-->
                        <el-form-item prop="room" label="会议室">
                            <el-input
                                    v-model="ReserveForm.room"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    <!--</el-col>-->
                <!--</el-row>-->
                <el-form-item label="参会人数" prop="num">
                    <el-input-number v-model="ReserveForm.num" :min="1" :max="1001" :step="1"
                                     label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button @click="closeReserve">取 消</el-button>
                    <el-button type="primary"
                               @click="submitReserve('ReserveForm')">确 定
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
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
                        <el-select v-model="address.name" prop="address.name"
                                   value-key="name" placeholder="请选择地点"
                                   clearable
                                   style="width: 180px"
                                   @change="selectAddress()"
                        >
                            <el-option
                                    v-for="item in address"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name"
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
                        <el-input @keyup.native="number" placeholder="请输入楼层数" v-model="Form.location"
                                  style="width: 180px">
                            <template slot="append">层</template>
                        </el-input>
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
                        <el-select v-model="type.name" prop="type.name"
                                   value-key="name" placeholder="请选择类型"
                                   clearable
                                   style="width: 180px"
                                   @change="selectType()"
                        >
                            <el-option
                                    v-for="item in type"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name"
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
        <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                :height="abc"
                border
                id="table"
                ref="mytable"
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
            <el-table-column label="00:00" align="center" v-if="flag === true">
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
            <el-table-column label="01:00" align="center" v-if="flag === true">
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
            <el-table-column label="02:00" align="center" v-if="flag === true">
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
            <el-table-column label="03:00" align="center" v-if="flag === true">
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
            <el-table-column label="04:00" align="center" v-if="flag === true">
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
            <el-table-column label="05:00" align="center" v-if="flag === true">
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
            <el-table-column label="06:00" align="center" v-if="flag === true">
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
            <el-table-column label="07:00" align="center" v-if="flag === true">
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
            <el-table-column label="08:00" align="center" :render-header="renderHeader">
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
        <div style="width: 100%;height: 40px;background-color: white" v-loading="true" v-if="loadingFlag === true">
        </div>
        <el-dialog
                title="预定会议室"
                :visible.sync="dialogVisible"
                width="523px"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px" class="demo-ruleForm" :rules="rules">
                <el-form-item label="申请人" prop="realName">
                    <el-input
                            placeholder="申请人"
                            v-model="form.realName"
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
                <el-row :gutter="20">
                    <el-col :span="14">
                        <el-form-item label="会议楼宇" prop="building" style="margin-left: 0">
                            <el-input
                                    v-model="form.building"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="room" id="time">
                            <el-input
                                    v-model="form.room"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="参会人数" prop="num">
                    <el-input-number v-model="form.num" :min="1" :max="1001" :step="1"
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
    import {getBuildingByAddress, getAddressByBuildingID} from '../api/building';
    import {submitConference} from '../api/conference';
    //第二轮迭代向导预定接口
    import {showTable} from '../api/conference'
    import {getType, getRoomName} from '../api/room'
    // import axios from 'axios';
    import {getUserInfo, getUserID} from '../api/user'
    import {getIntelligence} from "../api/room";

    export default {
        name: "Guides",
        data() {
            return {
                reserveDialogVisible: false,
                gridData: [{
                    name: '御用会议室',
                    building: {
                        name:'',
                        buildingID:''
                    },
                    catalogue: '豪华会议室',
                    capacity: '50',
                    roomID:''
                }],
                dialogTableVisible: true,
                loadingFlag: false,
                abc: window.innerHeight - 60 - 270,
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
                }],
                active: 0,
                //未链接后端时测试用的变量
                address: [{}],
                building: [{
                    name: '请选择楼宇',
                    buildingID: -1,
                }],
                type: [{}],
                dialogVisible: false,
                form: {
                    realName: '',
                    date: new Date(),
                    name: '',
                    startTime: '',
                    endTime: '',
                    building: '',
                    room: '',
                    num: 1,
                    buildingID: -1,
                    roomID: -1
                },
                ReserveForm: {
                    realName: '',
                    date: new Date(),
                    name: '',
                    startTime: '',
                    endTime: '',
                    building: '',
                    room: '',
                    num: 1,
                    buildingID: -1,
                    roomID: -1
                },
                reserveRule: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                    startTime:
                        [
                            {required: true, message: '请选择时间', trigger: 'change'}
                        ],
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                    startTime:
                        [
                            {required: true, message: '请选择时间', trigger: 'change'}
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
                        endTime:
                            '',
                        address:
                            '-1',
                        buildingID:
                            -1,
                        location:
                            '-1',
                        size:
                            '-1',
                        type:
                            '-1'
                    },
                flag: false,
            };
        },
        created() {
            this.getTableData();
            //获取所有会议地点
            this.getAddress();
            //获取所有会议楼宇
            this.getBuilding();
            this.showIntelligence();
        },
        methods: {
            showIntelligence() {
                getIntelligence().then(res=>{
                    this.gridData = res.data;
                    console.log(this.gridData);
                })
            },
            submitReserve(formName){
                this.reserveDialogVisible = false;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var date = new Date();
                        var timestamp1 = Date.parse(formatDate(date, 'yyyy-MM-dd hh:mm:ss'));
                        timestamp1 = timestamp1 / 1000;
                        var timestamp = formatDate(this.ReserveForm.startTime[0], 'yyyy-MM-dd hh:mm:ss');
                        timestamp = Date.parse(timestamp);
                        timestamp = timestamp / 1000;
                        if (timestamp < timestamp1) {
                            return this.$message.warning('请输入正确的时间');
                        }
                        //请求参数赋值
                        this.conference.subject = this.ReserveForm.name;
                        this.conference.room = this.ReserveForm.roomID;
                        this.conference.startTime = formatDate(this.ReserveForm.startTime[0], 'yyyy-MM-dd hh:mm:ss');
                        this.conference.endTime = formatDate(this.ReserveForm.startTime[1], 'yyyy-MM-dd hh:mm:ss');
                        getUserID().then(res => {
                            this.conference.user = res.data;
                        });
                        this.conference.number = this.ReserveForm.num;
                        console.log(this.conference);
                        submitConference(this.conference).then(res => {
                            // console.log(res.status);
                            if (res.status === 0) {
                                this.$message({
                                    message: '预定会议成功',
                                    type: 'success'
                                });
                                this.dialogTableVisible = false;
                            }
                        }).then(() => {
                            showTable(this.submitForm.startTime, this.submitForm.endTime, this.submitForm.address, this.submitForm.buildingID, this.submitForm.location, this.submitForm.size, this.submitForm.type).then(res => {
                                this.loading = false;
                                this.tableData = res.data;
                            })
                        });
                        this.dialogVisible = false;
                        this.$nextTick(() => {
                            this.$refs.ReserveForm.resetFields();
                        });
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleReserve(row) {
                getUserInfo().then(res => {
                    this.ReserveForm.realName = res.data.realName;
                });
                this.ReserveForm.building = row.building;
                this.ReserveForm.room = row.name;
                this.ReserveForm.roomID = row.roomID;
                this.reserveDialogVisible = true;
            },
            //输入的楼层数只能为大于1的正整数
            showTable() {
                showTable(this.submitForm.startTime, this.submitForm.endTime, this.submitForm.address, this.submitForm.buildingID, this.submitForm.location, this.submitForm.size, this.submitForm.type).then(res => {
                    this.loading = false;
                    this.tableData = res.data;
                })
            },
            //判断是否为空，并发请求
            judgeNull() {
                this.submitForm.startTime = this.submitForm.startTime.substring(0, 10);
                this.submitForm.endTime = this.submitForm.endTime.substring(0, 10);
                this.submitForm.startTime = this.submitForm.startTime + this.char1 + this.timeForm.startTime + this.char2;
                this.submitForm.endTime = this.submitForm.endTime + this.char1 + this.timeForm.endTime + this.char2;
                // console.log('submit提交对象：' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
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
                this.date = formatDate(this.date, 'yyyy/MM/dd');
                this.submitForm.startTime = this.date;
                this.submitForm.endTime = this.date;
                this.judgeTime();
                this.judgeNull();
                // console.log('第一次进入页面后请求参数' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
                showTable(this.submitForm.startTime, this.submitForm.endTime, this.submitForm.address, this.submitForm.buildingID, this.submitForm.location, this.submitForm.size, this.submitForm.type).then(res => {
                    this.loading = false;
                    this.tableData = res.data;
                })
            },
            //选择开始日期后查询数据
            selectStartDate() {
                this.loading = true;
                if (this.timeForm.startDate !== null) {
                    this.submitForm.startTime = formatDate(this.timeForm.startDate, 'yyyy/MM/dd');
                } else {
                    this.timeForm.startDate = new Date();
                    this.submitForm.startTime = formatDate(this.timeForm.startDate, 'yyyy/MM/dd');
                    this.timeForm.startTime = '00:00';
                }
                var timestamp1 = Date.parse(formatDate(this.timeForm.startDate, 'yyyy/MM/dd'));
                timestamp1 = timestamp1 / 1000;
                var timestamp = Date.parse(formatDate(this.timeForm.endDate, 'yyyy/MM/dd'));
                timestamp = timestamp / 1000;
                if (timestamp < timestamp1) {
                    this.timeForm.endDate = this.timeForm.startDate;
                    this.submitForm.endTime = formatDate(this.timeForm.endDate, 'yyyy/MM/dd');
                }
                this.judgeTime();
                this.judgeNull();
                showTable(this.submitForm.startTime, this.submitForm.endTime, this.submitForm.address, this.submitForm.buildingID, this.submitForm.location, this.submitForm.size, this.submitForm.type).then(res => {
                    this.loading = false;
                    this.tableData = res.data;
                })
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
                showTable(this.submitForm.startTime, this.submitForm.endTime, this.submitForm.address, this.submitForm.buildingID, this.submitForm.location, this.submitForm.size, this.submitForm.type).then(res => {
                    this.loading = false;
                    this.tableData = res.data;
                })
                // console.log('选择开始时间后请求参数' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
            },
            //选择结束日期后查询数据
            //在这里判断是否结束日期在开始日期之后，如果不符合就消息提示 不发请求
            selectEndDate() {
                if (this.timeForm.endDate !== null) {
                    this.submitForm.endTime = formatDate(this.timeForm.endDate, 'yyyy/MM/dd');
                    var timestamp1 = Date.parse(formatDate(this.timeForm.startDate, 'yyyy/MM/dd'));
                    timestamp1 = timestamp1 / 1000;
                    var timestamp = Date.parse(formatDate(this.timeForm.endDate, 'yyyy/MM/dd'));
                    timestamp = timestamp / 1000;
                    if (timestamp < timestamp1) {
                        this.timeForm.endDate = this.timeForm.startDate;
                        return this.$message.warning('会议结束日期需要在开始日期之后');
                    }
                } else {
                    this.timeForm.endDate = this.timeForm.startDate;
                    this.submitForm.endTime = formatDate(this.timeForm.endDate, 'yyyy/MM/dd');
                    this.timeForm.endTime = '23:30';
                    // this.canEndTime = true;
                }
                this.judgeTime();
                this.judgeNull();
                showTable(this.submitForm.startTime, this.submitForm.endTime, this.submitForm.address, this.submitForm.buildingID, this.submitForm.location, this.submitForm.size, this.submitForm.type).then(res => {
                    this.loading = false;
                    this.tableData = res.data;
                })
                // console.log('选择结束日期后请求参数' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
            },
            //选择结束时间后查询数据
            selectEndTime() {
                if (this.timeForm.endTime === null) {
                    this.timeForm.endTime = '23:30';
                }
                this.judgeNull();
                showTable(this.submitForm.startTime, this.submitForm.endTime, this.submitForm.address, this.submitForm.buildingID, this.submitForm.location, this.submitForm.size, this.submitForm.type).then(res => {
                    this.loading = false;
                    this.tableData = res.data;
                })
                // console.log('选择结束时间后请求参数' + this.submitForm.startTime + ' + ' + this.submitForm.endTime);
            },
            //下一步
            next() {
                if (this.active === 0) {
                    this.judgeNull();
                    //发请求刷新表格
                    showTable(this.submitForm.startTime, this.submitForm.endTime, this.submitForm.address, this.submitForm.buildingID, this.submitForm.location, this.submitForm.size, this.submitForm.type).then(res => {
                        this.loading = false;
                        this.tableData = res.data;
                    })
                }
                if (this.active++ === 1) {
                    // this.active = 0;
                    getType().then(res => {
                        for (var i = 0; i < res.data.length; i++) {
                            // 对象数组赋值
                            this.$set(this.type, i, {name: res.data[i]});
                        }
                    });
                    this.showTable();
                }
            },
            //上一步
            prev() {
                --this.active;
                this.showTable();
                if (this.active < 0) {
                    this.active = 0;
                    this.showTable();
                }
            },
            //获取所有会议地点
            getBuilding() {
                //发请求获取会议地点，现在模拟一下数据
                getBuildingByAddress(this.submitForm.address).then(response => {
                    this.building = response.data;
                    console.log(this.building);
                })
            },
            //获取所有会议楼宇
            getAddress() {
                getAddressByBuildingID(this.submitForm.buildingID).then(response => {
                    for (var i = 0; i < response.data.length; i++) {
                        // 对象数组赋值
                        this.$set(this.address, i, {name: response.data[i]});
                    }
                    if (this.address.length > response.data.length) {
                        for (var j = this.address.length; j >= response.data.length; j--) {
                            this.address.splice(j, 1);
                        }
                    }
                })
            },
            //选择地点
            selectAddress() {
                if (this.address.name === '') {
                    this.submitForm.address = '-1';
                    var i = -1;
                    getAddressByBuildingID(i).then(response => {
                        for (var i = 0; i < response.data.length; i++) {
                            // 对象数组赋值
                            this.$set(this.address, i, {name: response.data[i]});
                        }
                        if (this.address.length > response.data.length) {
                            for (var j = this.address.length; j >= response.data.length; j--) {
                                this.address.splice(j, 1);
                            }
                        }
                    })
                } else {
                    this.submitForm.address = this.address.name;
                    // this.Form.address = this.address.name;
                }
                // console.log('选择地点后请求参数' + this.submitForm.address);
                this.getBuilding();
                this.judgeNull();
                this.showTable();
            },
            //选择楼宇
            selectBuilding() {
                if (this.building.buildingID === '') {
                    this.submitForm.buildingID = -1;
                } else {
                    this.submitForm.buildingID = this.building.buildingID;
                    // this.Form.building = this.building.name;
                }
                this.getAddress();
                // console.log('选择楼宇后请求参数' + this.submitForm.buildingID);
                this.judgeNull();
                this.showTable();
            },
            //选择楼层，判断输入的大于0的正整数
            number() {
                this.Form.location = this.Form.location.replace(/[^1-9]+/g, '');
                this.Form.location = this.Form.location.replace('.', '');
                if (this.Form.location === '') {
                    this.submitForm.location = '-1';
                } else {
                    this.submitForm.location = String(this.Form.location);
                }
                this.judgeNull();
                console.log('楼层：' + this.submitForm.location);
                this.showTable();
            },
            selectSize() {
                // console.log('选择会议容量后请求参数' + this.anotherForm.size);
                if (this.anotherForm.size === undefined) {
                    this.submitForm.size = '-1'
                } else {
                    this.submitForm.size = String(this.anotherForm.size);
                }
                this.judgeNull();
                this.showTable();
            },
            selectType() {
                if (this.type.name === '') {
                    this.submitForm.type = '-1';
                } else {
                    this.submitForm.type = this.type.name;
                }
                console.log(this.submitForm.type);
                this.judgeNull();
                this.showTable();
            },
            openDialog(row) {
                this.dialogVisible = true;
                //打开申请会议表单时请求用户名字和ID
                getUserInfo().then(res => {
                    this.form.realName = res.data.realName;
                });
                getRoomName(row.roomID).then(res => {
                    this.form.room = res.data.name;
                });
                this.form.building = row.buidling.name;
                this.form.buildingID = row.buidling.buildingID;
                this.form.roomID = row.roomID;
                // console.log('行列：' + row.buidling.name, row.roomID, row.capacity)//计数器最大值设置为capacity，最小值设置为1
            },
            getRoom() {
                this.currentRoomID = -1;
                // console.log('获取会议室名字' + this.building.buildingID);
                this.form.building = this.building.name;
                this.currentBuildingID = this.building.buildingID;
                if (this.currentBuildingID) {
                    // byBuilding(this.building.buildingID).then(response => {
                    //     this.room = response.data;
                    //     console.log(this.room);
                    // });
                }
                if (!this.currentBuildingID) {
                    this.room = [];
                }
            },
            getRoomID() {
                this.currentRoomID = this.room.roomID;
                // console.log(this.currentRoomID);
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
                        this.conference.room = this.form.roomID;
                        this.conference.startTime = formatDate(this.form.startTime[0], 'yyyy-MM-dd hh:mm:ss');
                        this.conference.endTime = formatDate(this.form.startTime[1], 'yyyy-MM-dd hh:mm:ss');
                        getUserID().then(res => {
                            this.conference.user = res.data;
                        });
                        this.conference.number = this.form.num;
                        // console.log(this.conference);
                        submitConference(this.conference).then(res => {
                            // console.log(res.status);
                            if (res.status === 0) {
                                this.$message({
                                    message: '预定会议成功',
                                    type: 'success'
                                });
                            }
                        }).then(() => {
                            showTable(this.submitForm.startTime, this.submitForm.endTime, this.submitForm.address, this.submitForm.buildingID, this.submitForm.location, this.submitForm.size, this.submitForm.type).then(res => {
                                this.loading = false;
                                this.tableData = res.data;
                            })
                        });
                        this.dialogVisible = false;
                        this.$nextTick(() => {
                            this.$refs.form.resetFields();
                        });
                    } else {
                        // console.log('error submit!!');
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
            closeReserve(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.$refs.ReserveForm.resetFields();
                        this.reserveDialogVisible = false;
                        done();
                    })
                    .catch(() => {
                    });
            },
            // cellClassName({ row, column, rowIndex,columnIndex})
            cellClassName({columnIndex}) {
                if (columnIndex > 1) {
                    return 'test'
                } else {
                    return 'xiaowangshixiaoshazi'
                }
            },
            renderHeader(h, {column, $index}) {
                return h('span', [
                    h('span', {
                        class: [this.flag ? 'el-icon-caret-left' : 'el-icon-caret-right'],
                        // class: 'el-icon-caret-left',
                        on: {
                            click: () => {
                                this.start();
                            }
                        }
                    }),
                    h('span', column.label)
                ])
            },
            start() {
                // this.rotate=!this.rotate;
                // console.log(this.rotate)
                if (this.flag === true) {
                    this.flag = false;
                } else {
                    this.flag = true;
                }
                // console.log(this.flag)
            },
        },
        mounted() {
            this.$refs.mytable.bodyWrapper.addEventListener('scroll', (res) => {

                let height = res.target;

                let clientHeight = height.clientHeight;
                let scrollTop = height.scrollTop;
                let scrollHeight = height.scrollHeight;

                if (clientHeight + scrollTop >= scrollHeight) {
                    // getMeetingList(this.form.date, this.currentBuildingID, this.currentRoomID).then(response => {
                    //     this.loading = false;
                    //     this.temptableData = response.data;
                    //     this.tableData = this.tableData.concat(this.temptableData);
                    //     console.log('追加后');
                    //     console.log(this.tableData);
                    // })
                    // console.log('到底了');
                }
            }, true);

        },
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
