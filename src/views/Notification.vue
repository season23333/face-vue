<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="myblock">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="系统消息" name="first">
                        </el-tab-pane>
                    </el-tabs>
                    <div v-for='(v,k) in sysMsg' :key="k" class="myitem" :class="{'red-point' : v.isRead===false}"
                         @click="showDetail(k)" style="cursor:pointer;">
                        <h3 style="text-align: left;margin-bottom: 9px;font-family: 微软雅黑;font-weight: inherit;color: #404040">
                            <i class="el-icon-message"
                               style="color: #BFE0D7;font-weight:bold;margin-right: 6px;  font-size: 25px;"></i>{{v.title}}
                        </h3>
                        <span class="myinline" style="text-align: left;color: grey">
                            {{v.content}}
                        </span>
                    </div>
                    <el-dialog
                            title="消息内容"
                            :visible.sync="dialogVisible"
                            width="500px"
                            :before-close="handleClose">
                        <span>这是一段信息</span>
                    </el-dialog>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="myblock">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="用户消息" name="first"></el-tab-pane>
                    </el-tabs>
                    <div v-for='(v,k) in myMsg' :key="k" class="myitem" :class="{'red-point' : v.isRead===false}"
                         @click="showMyDetail(k)" style="cursor:pointer;">
                        <h3 style="text-align: left;margin-bottom: 9px;font-family: 微软雅黑;font-weight: inherit;color: #404040">
                            <i class="el-icon-edit-outline"
                               style="color: #BFE0D7;font-weight:bold;margin-right: 6px;  font-size: 25px;"></i>{{v.title}}
                        </h3>
                        <span class="myinline" style="text-align: left;color: grey">
                            {{v.content}}
                        </span>
                    </div>
                    <el-dialog
                            title="消息内容"
                            :visible.sync="myDialogVisible"
                            width="30%"
                    >
                        <span>这是一段信息</span>
                    </el-dialog>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Notification",
        data() {
            return {
                dialogVisible: false,
                myDialogVisible: false,
                activeName: 'first',
                //系统消息
                sysMsg: [{
                    title: '人脸测试',
                    content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    isRead: false
                }],
                //个人消息
                myMsg: [{
                    title: '测试消息',
                    content: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    isRead: false
                }]
            };
        },
        created() {
            //获取系统消息和个人消息列表
        },
        methods: {
            showDetail(k) {
                this.dialogVisible = true;
                this.sysMsg[k].isRead = true;//已读未读还要传给后端记录
            },
            showMyDetail(k) {
                this.myDialogVisible = true;
                this.myMsg[k].isRead = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        }
    }
</script>

<style>
    .myblock {
        position: relative;
        padding: 1.4rem 3rem 1.4rem;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    }

    .el-tabs__item {
        font-size: 16px !important;
    }

    .el-tabs__active-bar {
        width: 70px !important;
    }

    .myinline {
        display: block;
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    }

    .myitem {
        border-left: 4px solid #E6F2F2;
        padding-left: 30px;
        margin-bottom: 27px;
    }

    /*.class{*/
    /*display: inline-block;*/
    /*background-color: red;*/
    /*position: absolute;*/
    /*right: -20px;*/
    /*top: 0;*/
    /*width: 8px;*/
    /*height: 8px;*/
    /*border-radius: 10px;*/
    /*box-sizing: border-box;*/
    /*}*/
    .red-point {
        position: relative;
    }

    .red-point::before {
        content: " ";
        border: 3px solid red; /*设置红色*/
        border-radius: 10px; /*设置圆角*/
        position: absolute;
        z-index: 1000;
        right: 0%;
        margin-right: -5px;
        margin-top: 5px;
    }
</style>