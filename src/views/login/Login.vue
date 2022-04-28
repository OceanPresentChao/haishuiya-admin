<template>
    <div>
        <el-card class="login-form-layout">
            <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginRef" label-position="left">
                <div style="text-align: center">
                    <el-icon :size="30" color="#f9d27d">
                        <food />
                    </el-icon>
                </div>
                <h2 class="login-title color-main">HaiShuiYa-Admin</h2>
                <el-form-item prop="username">
                    <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                        placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon :size="20" style="margin:auto;">
                                <avatar />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin"
                        v-model="loginForm.password" autoComplete="on" placeholder="请输入密码">
                        <template #prefix>
                            <el-icon :size="20" style="margin:auto;">
                                <postcard />
                            </el-icon>
                        </template>
                        <template #suffix>
                            <el-icon :size="20" style="margin:auto;" @click="showPwd">
                                <View />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 3rem;text-align: center">
                    <el-button style="width: 90%;margin:0 auto" type="primary" :loading="loading"
                        @click.native.prevent="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <img :src="login_center_bg" class="login-center-layout">
    </div>
</template>

<script setup lang="ts">
import { isValidUsername, isValidPassword } from '@/utils/validate';
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support';
import login_center_bg from '@/assets/images/login_center_bg.png'
import type { FormRules } from 'element-plus';
import type { RuleItem } from 'async-validator';
import { Avatar, Postcard, View, Food } from '@element-plus/icons-vue';
import { useAdminStore } from '@/stores/admin';
const validateUsername: RuleItem["validator"] = (rule, value, callback) => {
    if (!isValidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
    } else {
        callback()
    }
};
const validatePass: RuleItem["validator"] = (rule, value, callback) => {
    if (!isValidPassword(value)) {
        callback(new Error('密码以字母开头，长度在6~18之间，只含字母、数字和下划线'))
    } else {
        callback()
    }
};
const loginRef = ref<HTMLFormElement>()
const loginForm = ref({
    username: '',
    password: '',
})
const loginRules = ref<FormRules>({
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePass }]
})
const loading = ref(false)
const pwdType = ref('password')
const adminStore = useAdminStore()
const router = useRouter()
onMounted(() => {
    loginForm.value.username = getCookie("username");
    loginForm.value.password = getCookie("password");
    if (loginForm.value.username === undefined || loginForm.value.username == null || loginForm.value.username === '') {
        loginForm.value.username = 'haishuiya';
    }
    if (loginForm.value.password === undefined || loginForm.value.password == null) {
        loginForm.value.password = '';
    }
})

function showPwd() {
    if (pwdType.value === 'password') {
        pwdType.value = ''
    } else {
        pwdType.value = 'password'
    }
}
function handleLogin() {
    loginRef.value?.validate((valid: any) => {
        if (valid) {
            loading.value = true;
            adminStore.login(unref(loginForm)).then(val => {
                loading.value = false
                setCookie('username', loginForm.value.username, 15)
                setCookie('password', loginForm.value.password, 15)
                router.push({ path: '/' })
            }).finally(() => {
                loading.value = false
            })
        } else {
            console.log('参数验证不合法！');
            return false
        }
    })
}

</script>

<style scoped>
.login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
}

.login-title {
    text-align: center;
    line-height: 2rem;
    padding: 1rem;
}

.login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
}
</style>