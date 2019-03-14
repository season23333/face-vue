<template>
    <el-container id="container">
        <el-row id="row">
            <el-col :span="3">
                <h2>快速预定</h2>
            </el-col>
            <el-col :span="18">

            </el-col>
            <el-col :span="3">
                <!--<el-dropdown>-->
                    <!--<el-button type="primary" plain>-->
                        <!--更多菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                    <!--</el-button>-->
                    <!--<el-dropdown-menu slot="dropdown">-->
                        <!--<el-dropdown-item>黄金糕</el-dropdown-item>-->
                        <!--<el-dropdown-item>狮子头</el-dropdown-item>-->
                        <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                        <!--<el-dropdown-item>双皮奶</el-dropdown-item>-->
                        <!--<el-dropdown-item>蚵仔煎</el-dropdown-item>-->
                    <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    #container {
        height: 100%;
    }

    h2 {
        color: #008080;
        margin: 20px 0;
    }

    #row {
        width: 100%;
    }

    .el-col {
        height: 100%;
    }

    .el-dropdown {
        margin: 10% 0;
    }
</style>
