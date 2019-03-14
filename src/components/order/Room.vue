<template>
    <div >

        <el-row :gutter="15">
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100% ">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100%">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100%">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100%">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100%">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100%">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100%">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100%">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100%">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100%">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" style="width: 100%">
                        <div v-for="o in 4" :key="o" class="text item" >
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-col>

        </el-row>


    </div>

</template>

<script>
    export default {
        name: "Room"
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 480px;
    }
</style>