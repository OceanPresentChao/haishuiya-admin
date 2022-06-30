<template>
    <div class="fixed">
        <el-scrollbar>
            <el-menu :default-active="route.path" class="menu" :collapse="isCollapse" background-color="#304156"
                text-color="#303133" unique-opened router>
                <el-menu-item index="/dashboard">
                    <Icon icon="ic:round-store-mall-directory" class="logo " v-show="isCollapse"></Icon>
                    <template #title>
                        <div class="text-center text-xl text-blue-200">
                            <p>
                                Carillion Bookstore
                            </p>
                        </div>
                    </template>
                </el-menu-item>
                <MenuItem :menuList="menuList">
                </MenuItem>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
    
<script setup lang='ts'>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/store/menu'
//控制菜单展开和关闭
const menuStore = useMenuStore()
const isCollapse = computed(() => {
    return menuStore.collapse
})
// const handleOpen = (index: string | number, indexPath: string[]) => {
//     console.log(index, indexPath)
// }
// const handleClose = (index: string | number, indexPath: string[]) => {
//     console.log(index, indexPath)
// }
const route = useRoute()

//菜单数据

const menuList = computed(() => {
    return menuStore.menuList
})
// console.log(menuList)
//菜单数据

</script>
    
<style  scoped>
.menu:not(.el-menu--collapse) {
    width: var(--menu-not-collapse-width)
}

.menu.el-menu--collapse {
    width: var(--menu-collapse-width)
}

.menu {
    min-height: 100vh;
}

.el-menu {
    border-right: none;
}

:deep(.el-sub-menu .el-sub-menu__title) {
    color: #f4f4f5 !important;
}

/* .el-submenu .is-active .el-submenu__title {
  border-bottom-color: #1890ff;
} */
:deep(.el-menu .el-menu-item) {
    color: #bfcbd9;
}

/* 菜单点中文字的颜色 */
:deep(.el-menu-item.is-active) {
    color: #409eff !important;
}

/* 当前打开菜单的所有子菜单颜色 */
:deep(.is-opened .el-menu-item) {
    background-color: #1f2d3d !important;
}

/* 鼠标移动菜单的颜色 */
:deep(.el-menu-item:hover) {
    background-color: #001528 !important;
}

.logo {
    width: 2rem !important;
    height: 2rem !important;
    color: rgb(184, 235, 170) !important;
}
</style>