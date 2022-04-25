<template>
    <div>
        <el-card class="login-form-layout">
            <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginRef" label-position="left">
                <div style="text-align: center">
                    <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
                </div>
                <h2 class="login-title color-main">HaiShuiYa-Admin</h2>
                <el-form-item prop="username">
                    <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                        placeholder="请输入用户名">
                        <span slot="prefix">
                            <svg-icon icon-class="user" class="color-main"></svg-icon>
                        </span>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin"
                        v-model="loginForm.password" autoComplete="on" placeholder="请输入密码">
                        <span slot="prefix">
                            <svg-icon icon-class="password" class="color-main"></svg-icon>
                        </span>
                        <span slot="suffix" @click="showPwd">
                            <svg-icon icon-class="eye" class="color-main"></svg-icon>
                        </span>
                    </el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 60px;text-align: center">
                    <el-button style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <img :src="login_center_bg" class="login-center-layout">
    </div>
</template>

<script setup lang="ts">
import { isvalidUsername } from '@/utils/validate';
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support';
import login_center_bg from '@/assets/images/login_center_bg.png'
import type { FormRules } from 'element-plus';
import type { RuleItem } from 'async-validator';

const validateUsername: RuleItem["validator"] = (rule, value, callback) => {
    if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
    } else {
        callback()
    }
};
const validatePass: RuleItem["validator"] = (rule, value, callback) => {
    if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
    } else {
        callback()
    }
};
const router = useRouter()
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


onMounted(() => {
    loginForm.value.username = getCookie("username");
    loginForm.value.password = getCookie("password");
    if (loginForm.value.username === undefined || loginForm.value.username == null || loginForm.value.username === '') {
        loginForm.value.username = 'admin';
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
            // loading.value = true;
            // this.$store.dispatch('Login', this.loginForm).then(() => {
            //     loading.value = false
            //     setCookie("username", loginForm.value.username, 15);
            //     setCookie("password", loginForm.value.password, 15);
            //     router.push({ path: '/' })
            // }).catch(() => {
            //     loading.value = false
            // })
            console.log("验证合格！");
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