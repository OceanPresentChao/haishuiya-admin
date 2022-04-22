<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 11:29:15
-->
<template>
    <div style="margin-right: 180px;">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="1"
            text-color="#fff">
            <div class="head-top box">
                <div>
                    <router-link to="/">
                        <h2 style="color:#f6c430">
                            <Icon icon="mdi:duck" />还睡呀
                        </h2>
                    </router-link>
                </div>
            </div>
            <router-link to="/home">
                <el-menu-item index="/home">
                    <el-icon>
                        <Star />
                    </el-icon>
                    <template #title>首页</template>
                </el-menu-item>
            </router-link>
            <router-link to="/activity">
                <el-menu-item index="/activity">
                    <el-icon>
                        <icon-menu />
                    </el-icon>
                    <template #title>活动</template>
                </el-menu-item>
            </router-link>
            <router-link to="/about">
                <el-menu-item index="/about">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <template #title>关于</template>
                </el-menu-item>
            </router-link>
        </el-menu>
        <!-- 这是leftMenu -->
    </div>
</template>

<script setup>
import {
    Notebook,
    InfoFilled,
    Star,

    Goods,

    Menu as IconMenu,
} from '@element-plus/icons-vue'

import { Icon } from '@iconify/vue';



</script>

<style scoped>
.head-top {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
    margin: 0;
    text-align: center;
}

.box {
    background: #545c64;
    box-shadow: 1px 0 4px rgb(0 21 41 / 8%);
    height: 100%;
}

.el-menu-vertical-demo {
    min-height: 100vh;
    border-right: 0;
    width: 180px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 227;
}

.collapse {
    padding: 0 1.5rem;
}
</style>
