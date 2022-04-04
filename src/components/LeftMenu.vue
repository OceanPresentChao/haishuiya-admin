<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 11:29:15
-->
<template>
    <div>
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
            :collapse="isCollapse"
            :class="{ collapse: !isCollapse }"
        >
            <div class="head-top box">
                <div style="margin-left: auto;" v-if="!isCollapse">
                    <router-link to="/">
                        <h2 style="color:#f6c430">
                            <Icon icon="mdi:duck" />还睡呀
                        </h2>
                    </router-link>
                </div>
                <div style="margin-left: auto;margin-right: 10px;">
                    <span style="cursor: pointer;" @click="toggleCollapse">
                        <el-icon
                            :size="30"
                            color="white"
                            style="vertical-align: middle;"
                            v-if="!isCollapse"
                        >
                            <fold />
                        </el-icon>
                        <el-icon
                            :size="30"
                            color="white"
                            style="vertical-align: middle;"
                            v-if="isCollapse"
                        >
                            <expand />
                        </el-icon>
                    </span>
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
    Fold,
    Goods,
    Expand,
    Menu as IconMenu,
} from '@element-plus/icons-vue'

import { Icon } from '@iconify/vue';

const isCollapse = ref(false);
const toggleCollapse = () => { isCollapse.value = !isCollapse.value; }


</script>

<style scoped>
html,
body {
    overflow: hidden;
}
.head-top {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
    margin: 0;
}
.box {
    background: #545c64;
    box-shadow: 1px 0 4px rgb(0 21 41 / 8%);
    height: 100%;
}

.el-menu-vertical-demo {
    min-height: 100vh;
    border-right: 0;
}

.collapse {
    padding: 0 1.5rem;
}
</style>
