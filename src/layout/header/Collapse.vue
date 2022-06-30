<template>
    <span @click="changeIcon" class="icons">
        <Icon icon="ep:expand" v-show="status"></Icon>
        <Icon icon="ep:expand" :rotate="2" v-show="!status"></Icon>
    </span>
</template>
<script setup lang='ts'>
import { useMenuStore } from '@/store/menu';
import { computed } from 'vue'
const menuStore = useMenuStore()
const status = computed(() => {
    return menuStore.collapse
})
const changeIcon = () => {
    menuStore.setCollapse(!status.value)
}
</script>
<style scoped>
.icons {
    display: flex;
    align-items: center;
    font-size: 22px;
    color: #303133;
    cursor: pointer;
    margin-right: 15px;
}
</style>