<template>
    <el-row>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
    </el-row>
</template>

<script>
    const cityOptions = ['白板', '投影仪', '电话', '视频会议'];
    export default {
        name: "Multi",
        data() {
            return {
                checkAll: false,
                checkedCities: [],
                cities: cityOptions,
                isIndeterminate: true
            };
        },
        methods: {
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin: 10px 0;
    }
</style>
