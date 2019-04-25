<template>
    <div>
        <el-row style="margin-top: 2.2%; margin-bottom: 2.2% " :gutter="0">
            <el-col :xs="12" :sm="7" :lg="7">
                <div class="block">
                    <span class="demonstration">日期：</span>
                    <el-date-picker
                            v-model="form.date"
                            type="date"
                            placeholder="选择日期"
                    >
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :xs="12" :sm="7" :lg="6">
                楼宇：
                <el-select v-model="building.buildingID" prop="building.name" value-key="buildingID" placeholder="请选择"
                           clearable
                           @change="getRoom()">
                    <el-option
                            v-for="item in building"
                            :key="item.buildingID"
                            :label="item.name"
                            :value="item.buildingID"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="12" :sm="7" :lg="6">
                会议室：
                <el-select v-model="room.roomID" prop="room.name" value-key="roomID" placeholder="请选择"
                           clearable
                           @change="getRoomID()">
                    <el-option
                            v-for="items in room"
                            :key="items.roomID"
                            :label="items.name"
                            :value="items.roomID">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="12" :sm="7" :lg="1" style="text-align: right">
                <el-button icon="el-icon-search" circle @click="search()"></el-button>
            </el-col>
            <el-col :xs="12" :sm="7" :lg="3">
                <div>
                    <el-button plain @click="openForm">新增预定</el-button>
                    <el-dialog
                            title="预定会议室"
                            :visible.sync="dialogVisible"
                            width="34%"
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
                            <!--<el-form-item label="活动日期" prop="date">-->
                            <!--<el-date-picker-->
                            <!--v-model="form.date"-->
                            <!--type="date"-->
                            <!--placeholder="选择日期">-->
                            <!--</el-date-picker>-->
                            <!--</el-form-item>-->
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
                            <!--<el-row :gutter="12">-->
                            <!--<el-col :span="14">-->
                            <!--<el-form-item label="活动时间" prop="startTime" style="margin-left: 0">-->
                            <!--<el-time-select-->
                            <!--style="width: 100% "-->
                            <!--placeholder="起始时间"-->
                            <!--v-model="form.startTime"-->
                            <!--:picker-options="{-->
                            <!--start: '00:00',-->
                            <!--step: '00:30',-->
                            <!--end: '23:30'-->
                            <!--}">-->
                            <!--</el-time-select>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :span="1" style="margin-top: 2%">-->
                            <!-- - -->
                            <!--</el-col>-->
                            <!--<el-col :span="9">-->
                            <!--<el-form-item prop="endTime" id="time">-->
                            <!--<el-time-select-->
                            <!--style="width: 100% "-->
                            <!--placeholder="结束时间"-->
                            <!--v-model="form.endTime"-->
                            <!--:picker-options="{-->
                            <!--start: '00:30',-->
                            <!--step: '00:30',-->
                            <!--end: '23:30',-->
                            <!--minTime: form.startTime-->
                            <!--}">-->
                            <!--</el-time-select>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--</el-row>-->
                            <el-row :gutter="12">
                                <el-col :span="14">
                                    <el-form-item label="会议地点" prop="building" style="margin-left: 0">
                                        <el-select v-model="building.buildingID" prop="building.name"
                                                   value-key="buildingID" placeholder="请选择楼宇"
                                                   clearable
                                                   @change="getRoom()">
                                            <el-option
                                                    v-for="item in building"
                                                    :key="item.buildingID"
                                                    :label="item.name"
                                                    :value="item.buildingID"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item prop="room" id="time">
                                        <el-select v-model="room.roomID" prop="room.name" value-key="roomID"
                                                   placeholder="请选择会议室"
                                                   clearable
                                                   @change="getRoomID()">
                                            <el-option
                                                    v-for="items in room"
                                                    :key="items.roomID"
                                                    :label="items.name"
                                                    :value="items.roomID">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="参会人数" prop="num">
                                <el-input-number v-model="form.num" :min="1" :max="1001" :step="5"
                                                 label="描述文字"></el-input-number>
                            </el-form-item>
                            <!--<el-form-item label="与会人" prop="people" style="text-align: left ">-->
                            <!--<el-tag-->
                            <!--:key="tag"-->
                            <!--v-for="tag in form.people"-->
                            <!--closable-->
                            <!--:disable-transitions="false"-->
                            <!--@close="handleCloseTag(tag)">-->
                            <!--{{tag}}-->
                            <!--</el-tag>-->
                            <!--<el-input-->
                            <!--class="input-new-tag"-->
                            <!--v-if="inputVisible"-->
                            <!--v-model="inputValue"-->
                            <!--ref="saveTagInput"-->
                            <!--size="small"-->
                            <!--@keyup.enter.native="handleInputConfirm"-->
                            <!--@blur="handleInputConfirm"-->
                            <!--&gt;-->
                            <!--</el-input>-->
                            <!--<el-button v-else class="button-new-tag" size="small" @click="showInput"-->
                            <!--style="margin-left: 2%">+ 与会人-->
                            <!--</el-button>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="短信通知" prop="msgPeople" style="text-align: left">-->
                            <!--<el-switch-->
                            <!--style="margin-left: 2%"-->
                            <!--v-model="value2"-->
                            <!--active-color="#13ce66"-->
                            <!--inactive-color="#ff4949"-->
                            <!--active-value="0"-->
                            <!--inactive-value="100"-->
                            <!--&gt;-->
                            <!--</el-switch>-->
                            <!--<div v-if="value2 === '0'">-->
                            <!--<el-tag-->
                            <!--:key="tag"-->
                            <!--v-for="tag in msgPeople"-->
                            <!--closable-->
                            <!--:disable-transitions="false"-->
                            <!--@close="handleCloseTag1(tag)">-->
                            <!--{{tag}}-->
                            <!--</el-tag>-->
                            <!--<el-input-->
                            <!--class="input-new-tag"-->
                            <!--v-if="inputVisible"-->
                            <!--v-model="inputValue"-->
                            <!--ref="saveTagInput"-->
                            <!--size="small"-->
                            <!--@keyup.enter.native="handleInputConfirm1"-->
                            <!--@blur="handleInputConfirm1"-->
                            <!--&gt;-->
                            <!--</el-input>-->
                            <!--<el-button v-else class="button-new-tag" size="small" @click="showInput"-->
                            <!--style="margin-left: 2%">+ 通知人-->
                            <!--</el-button>-->
                            <!--</div>-->
                            <!--</el-form-item>-->
                            <el-form-item style="text-align: right">
                                <el-button @click="handleClose">取 消</el-button>
                                <el-button type="primary"
                                           @click="onSubmit('form')">确 定
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </div>
            </el-col>
        </el-row>
        <div>
            <!--<h3 v-for="items in tableData">-->
            <!--{{items}}-->
            <!--</h3>-->

            <el-table
                    v-loading="loading"
                    :data="tableData"
                    style="width: 100%"
                    height="400"
                    border
                    id="table"
                    :cell-class-name="cellClassName"
                    @cell-click="dialogVisible = true"
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
    </div>
</template>

<script>
    import '@/util/mock'
    // import axios from 'axios';
    import {getMeetingList} from '../api/table';
    import {getUserID} from '../api/user';
    import {byBuilding, getAllBuilding} from '../api/room';
    import {formatDate} from '../util/formatDate'
    import {submitConference} from '../api/conference'

    export default {
        name: "Order",
        data() {
            return {
                obj: [{
                    name: '',
                    roomID: '',
                }],
                building: [{
                    name: '请选择楼宇',
                    buildingID: -1,
                }],
                room: [{
                    name: '请选择会议室',
                    roomID: -1,
                }],
                currentDate: '',
                currentBuildingID: -1,
                currentRoomID: -1,
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
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    // date: [
                    //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    // ],
                    startTime: [
                        {required: true, message: '请选择开始时间', trigger: 'change'}
                    ],
                    // endTime: [
                    //     { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
                    // ],
                    // building: [
                    //     { type: 'number', required: true, message: '请选择楼宇', trigger: 'change' }
                    // ],
                    // room: [
                    //     { required: true, message: '请选择会议室', trigger: 'blur' }
                    // ],
                },
                tableData: [{
                    roomID: 0,
                    name: '',
                    building: 0,
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
                inputVisible: false,
                inputValue: '',
                value2: '100',
                loading: false,
                conference: {
                    subject: '测试会议',
                    room: '1',
                    startTime: '2019-04-20 02:00:00',
                    endTime: '2019-04-20 03:30:00',
                    user: '1',
                    number: '1',
                    status: '1',
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                    }
                }
            };
        },
        created() {
            this.getTableData(this.form.date);
            this.getPlace();
        },
        methods: {
            //第一次进入页面请求当天所有会议的数据
            getTableData(date) {
                this.loading = true;
                date = formatDate(date, 'yyyy-MM-dd');
                getMeetingList(date, this.currentBuildingID, this.currentRoomID).then(response => {
                    this.loading = false;
                    this.tableData = response.data;
                })
            },
            //获取所有楼名数据
            getPlace() {
                getAllBuilding().then(response => {
                    this.building = response.data;
                    console.log(this.building);
                })
            },
            //获取楼中所有会议室名
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
            // getRoom(value) {
            //     var building = value.buildingID;
            //     this.currentBuildingID = value.buildingID;
            //     byBuilding(building).then(response => {
            //         this.room = response.data;
            //         console.log(this.room);
            //     });
            // },
            //获取选中的会议室ID
            getRoomID() {
                this.currentRoomID = this.room.roomID;
                console.log(this.currentRoomID);
                if (!this.currentRoomID) {
                    this.room = [];
                    this.currentRoomID = -1;
                }
            },
            //提交日期、楼宇ID、会议室ID进行查询，查询结果返回给tableData
            //日期格式yyyy-MM-dd，未选择楼宇和会议室时后两个参数为-1
            search() {
                this.loading = true;
                this.currentDate = formatDate(this.form.date, 'yyyy-MM-dd');
                console.log(this.currentDate, this.currentBuildingID, this.currentRoomID);

                getMeetingList(this.currentDate, this.currentBuildingID, this.currentRoomID).then(response => {
                    this.loading = false;
                    this.tableData = response.data;
                })
            },
            //打开申请会议表单时请求用户名字和ID
            openForm() {
                this.dialogVisible = true;
                getUserID().then(res => {
                    this.form.ID = res.data;
                })
            },

            //关闭对话框并清空表单数据
            onSubmit(formName) {
                // show(){
                //     console.log(formatDate(this.form.startTime[0], 'yyyy-MM-dd hh:mm:ss'));
                //     console.log(formatDate(this.form.startTime[1], 'yyyy-MM-dd hh:mm:ss'));
                // },
                console.log('测试输入' + this.room.roomID);
                if (typeof(this.room.roomID) == "undefined" || typeof(this.building.buildingID) == "undefined") {
                    return this.$message.warning('请输入选择会议地点');
                }

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
            // aaa(){
            //     this.$refs.form.resetFields();
            // },

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

            //渲染表格
            cellClassName({columnIndex}) {
                if (columnIndex > 1) {
                    return 'test'
                } else {
                    return 'xiaowangshixiaoshazi'
                }
            },
            //删除与会人
            handleCloseTag(tag) {
                this.people.splice(this.people.indexOf(tag), 1);
            },
            //删除通知人
            handleCloseTag1(tag) {
                this.msgPeople.splice(this.msgPeople.indexOf(tag), 1);
            },
            //展开tag显示iput
            showInput() {
                this.inputVisible = true;
                //在 DOM 状态更新后做点什么
                this.$nextTick(() => {
                    //每次显示组件的时候，input获得焦点
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            //添加与会人
            handleInputConfirm() {
                let inputValue = this.inputValue;
                console.log(inputValue);
                if (inputValue) {
                    this.people.push(inputValue);
                }
                console.log(this.people);
                this.inputVisible = false;
                this.inputValue = '';
            },
            //添加通知人
            handleInputConfirm1() {
                let inputValue = this.inputValue;
                console.log(inputValue);
                if (inputValue) {
                    this.msgPeople.push(inputValue);
                }
                console.log(this.msgPeople);
                this.inputVisible = false;
                this.inputValue = '';
            },
        },
        // mounted() {
        //     // axios.get('/list').then(res => {
        //     //     this.text = res.data.tableData;
        //     //     console.log(res);
        //     // })
        //     axios.get('/list').then(res => {
        //         this.tableData = res.data.tableData;
        //     })
        // }
    }
</script>

<style>
    /*.el-input__icon{*/
    /*width: 0px !important;*/
    /*height: 0% !important;*/
    /*}*/
    /*el-date-editor el-range-editor el-input__inner el-date-editor--datetimerange{*/
    /*width: 320px;*/
    /*padding: 0;*/
    /*}*/
    /*.el-date-editor .el-range__icon{*/
    /*font-size: 0 !important;*/
    /*}*/
    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .el-tabs {
        width: 100%;
    }

    #el-col-2 {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: right;
        font-size: 15px;
        margin: 8px 0;
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

    #table .test {
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

    #time div {
        margin-left: 0px !important;
    }

</style>
