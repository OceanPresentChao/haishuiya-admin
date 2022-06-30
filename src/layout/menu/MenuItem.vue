<template>
    <template v-for="menu in menuList" :key="menu.path">
        <template v-if="!menu.meta.hidden">
            <el-sub-menu v-if="!menu.redirect && menu.children && menu.children.length > 0" :index="menu.path"
                :key="menu.path">
                <template #title>
                    <Icon class="icons" v-if="menu.meta.icon" :icon="menu.meta.icon" />
                    <span>{{ menu.meta.title }}</span>
                </template>
                <menu-item :menuList="menu.children"></menu-item>
            </el-sub-menu>
            <el-menu-item style="color: #f4f4f5" v-else :index="menu.redirect ? menu.redirect : menu.path">
                <Icon class="icons" v-if="menu.meta.icon" :icon="menu.meta.icon" />
                <template #title>{{ menu.meta.title }}</template>
            </el-menu-item>
        </template>
    </template>
</template>
    
<script setup lang='ts'>
const props = defineProps(['menuList'])
</script>
    
<style scoped>
.icons {
    width: 24px;
    height: 18px;
    margin-right: 5px;
}
</style>