<script setup lang="ts">

import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { loginRules } from './rule';
import { bg, avatar, currentWeek } from "./assets";
import { useAuthStore } from "@/store/auth"
import { renderIcon } from "@/utils/tool"
const router = useRouter();
const loading = ref(false);
const checked = ref(false);
const ruleFormRef = ref<FormInstance>();
const authStore = useAuthStore()
const currentPage = computed(() => {
    return authStore.currentPage;
});
const ruleForm = reactive({
    username: "admin",
    password: "admin123"
})


const onLogin = async (formEl: FormInstance | undefined) => {
    loading.value = true;
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 模拟请求，需根据实际开发进行修改
            setTimeout(() => {
                loading.value = false;
                authStore.loginByAdminName(ruleForm)
                ElMessage({
                    type: 'success',
                    message: "登陆成功"
                })
                router.replace("/");
            }, 2000);
        } else {
            loading.value = false;
            return fields;
        }
    });
};

</script>

<template>
    <img :src="bg" class="wave" />
    <div class="login-container">
        <div class="img">
            <component :is="currentWeek" />
        </div>
        <div class="login-box">
            <div class="login-form">
                <avatar class="avatar" />
                <h2>Carillion BookStore</h2>
                <el-form v-if="currentPage === 0" ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size="large"
                    @keyup.enter="onLogin(ruleFormRef)">

                    <el-form-item prop="username">
                        <el-input clearable :input-style="{ 'user-select': 'none' }" v-model="ruleForm.username"
                            placeholder="账号" :prefix-icon="renderIcon('carbon:user')" />
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input clearable :input-style="{ 'user-select': 'none' }" show-password
                            v-model="ruleForm.password" placeholder="密码" :prefix-icon="renderIcon('carbon:locked')" />
                    </el-form-item>

                    <el-form-item>
                        <div class="w-full h-20px flex justify-between items-center">
                            <el-checkbox v-model="checked">记住密码</el-checkbox>
                            <el-button text @click="authStore.setCurrentPage(1)">
                                忘记密码?
                            </el-button>
                        </div>
                        <el-button class="w-full mt-4" size="default" type="primary" :loading="loading"
                            @click="onLogin(ruleFormRef)">
                            登录
                        </el-button>
                    </el-form-item>

                </el-form>
                <Forget v-if="currentPage === 1"></Forget>
            </div>
        </div>

    </div>
</template>

<style scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0;
}

.wave {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
}

.login-container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 18rem;
    padding: 0 2rem;
}

.img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.img img {
    width: 500px;
}

.login-box {
    display: flex;
    align-items: center;
    text-align: center;
}

.login-form {
    width: 360px;
}

.avatar {
    width: 350px;
    height: 80px;
}

.login-form h2 {
    text-transform: uppercase;
    margin: 15px 0;
    color: #999;
    font: bold 200% Consolas, Monaco, monospace;
}

@media screen and (max-width: 1180px) {
    .login-container {
        grid-gap: 9rem;
    }

    .login-form {
        width: 290px;
    }

    .login-form h2 {
        font-size: 2.4rem;
        margin: 8px 0;
    }

    .img img {
        width: 360px;
    }

    .avatar {
        width: 280px;
        height: 80px;
    }
}

@media screen and (max-width: 968px) {
    .wave {
        display: none;
    }

    .img {
        display: none;
    }

    .login-container {
        grid-template-columns: 1fr;
    }

    .login-box {
        justify-content: center;
    }
}
</style>