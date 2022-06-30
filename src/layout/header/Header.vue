<template>
    <div style="display: flex;align-items: center;flex:1;">
        <Collapse />
        <BreadCrumb />
        <button class="ml-auto mr-4" @click="toggleDark()">
            <Icon class="titleIcon text-black" :icon="themeIcon"></Icon>
        </button>
        <el-dropdown class="avatar-container" @command="handleCommand" size="large">
            <el-avatar size="default" shape="circle" :src="authStore.userInfo.avatar" fit="cover"
                class="cursor-pointer">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="a">首页</el-dropdown-item>
                    <el-dropdown-item command="b" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
    <!-- <UserInfo></UserInfo> -->
</template>
<script lang="ts" setup>
import { useAuthStore } from "@/store/auth"
const authStore = useAuthStore()
const router = useRouter()
const isDark = useDark()
const themeIcon = computed(() => (isDark.value ? 'akar-icons:sun' : 'bytesize:moon'))
const toggleDark = useToggle(isDark)

function handleCommand(command: string | number | object) {
    if (command === "a") {
        router.push('/')
    }
    if (command === "b") {
        authStore.logOut()
        router.replace('/login')
    }
}
</script>

<style scoped>
.avatar-container {
    height: 50px;
    flex: none;

    justify-self: flex-end;
}
</style>