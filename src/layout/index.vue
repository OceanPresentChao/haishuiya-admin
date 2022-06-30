<template>
    <el-container class="layout" :class="{ collapseContainer: isCollapse }">
        <!-- Aside content -->
        <MenuBar></MenuBar>
        <el-container class="wrapper">
            <el-header class="header">
                <Header></Header>
            </el-header>
            <el-main class="main">
                <Tabs />
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
    
<script setup lang='ts'>
import { useMenuStore } from '@/store/menu';

// console.log(import.meta.env.VITE_APP_API);
const menuStore = useMenuStore()
const isCollapse = computed(() => {
    return menuStore.collapse
})
</script>
    
<style scoped>
.layout {
    position: relative;
    /* height: 100%;
    width: 100%; */
}

.layout .aside {
    background-color: rgb(48, 65, 86);
}

.layout .header {
    height: 4rem;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
}

.layout .main {
    padding-top: 0px;
}

.collapseContainer .wrapper {
    margin-left: var(--menu-collapse-width);
}

.wrapper {
    margin-left: var(--menu-not-collapse-width);
    transition: all .5s;
}
</style>