<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 15:18:16
-->
<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, key) in routeBread" :key="key">
            <router-link v-if="item.path !== undefined" :to="item.path">{{ item.title }}</router-link>
            <span v-else>{{ item.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();
const routeBread = ref([]);
const routeTitle = ref('');
route.matched.filter((item) => {
    if (item.meta.title) {
        const title = item.meta.title;
        const path = item.path;
        routeBread.value.push({
            title: title,
            path: path,
        })
    }
})
routeBread.value.unshift({
    title: "首页",
    path: '/',
})
routeTitle.value = toRaw(route).meta.value.title;
</script>
<style lang="css" scoped>
* {
    font-size: 1.2rem;
}
</style>