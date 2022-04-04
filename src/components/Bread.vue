<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 15:18:16
-->
<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, key) in breadList" :key="item.path">
            <router-link v-if="item.path" :to="item.path">{{ item.meta.title }}</router-link>
            <span v-else>{{ item.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
const route = useRoute();
let breadList = ref([]);
watch(route, () => {
    breadList.value.splice(0,);
    route.matched.forEach((item) => { breadList.value.push(item) });
    if (route.matched[0] && route.matched[0].path !== '/home') {
        breadList.value.unshift({ path: '/home', meta: { title: '首页' } })
    }
}, { immediate: true })
</script>
<style lang="css" scoped>
* {
    font-size: 1.2rem;
}
</style>