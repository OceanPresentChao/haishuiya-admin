<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 13:12:44
-->
<template>
    <div style="margin-top: 1rem;">
        <el-row :gutter="20">
            <img
                src="https://images.unsplash.com/photo-1648973030125-20fb19f6b93a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=775&q=80"
                alt="haishuiya"
                style="display: flex;border-radius: 50%;width:5rem;height:5rem;margin: 0 2rem;"
            />
            <div
                style="display: flex;flex-direction: column;text-align: left;
        line-height: 2.25rem;"
            >
                <div style="font-size: 1.5rem;">早上好鸭~</div>
                <div style="font-size: 1.125rem;color:grey">
                    <template v-if="weatherInfo.length">{{ weatherInfo }}</template>
                    <template v-else>今天的天气是...</template>
                </div>
            </div>
            <div style="display: flex;margin-left: auto;column-gap: 2rem;margin-right: 2rem;">
                <div>代办</div>
                <div>团队</div>
            </div>
        </el-row>
        <el-divider>
            <el-icon>
                <Headset />
            </el-icon>
        </el-divider>
        <el-row :gutter="20">
            <el-col :span="16">
                <TodoList></TodoList>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple" />
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { Headset } from '@element-plus/icons-vue';
const proxy = getCurrentInstance()?.proxy;
const weatherInfo = ref([]);
async function getW() {
    const res = await proxy.$API.getWeather()
    weatherInfo.value.push(res.results[0]);
    console.log(weatherInfo.value[0]);
}
// getW()
</script>
<style>
</style>