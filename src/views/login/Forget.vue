<script setup lang="ts">

import { renderIcon } from "@/utils/tool"
import { updateRules } from './rule';
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { useAuthStore } from "@/store/auth"
const authStore = useAuthStore()
const loading = ref(false);
const ruleForm = reactive({
    phone: "",
    verifyCode: "",
    password: "",
    repeatPassword: ""
});
const ruleFormRef = ref<FormInstance>();

const repeatPasswordRule = [
    {
        validator: (rule: any, value: string, callback: Function) => {
            if (value === "") {
                callback(new Error("请输入确认密码"));
            } else if (ruleForm.password !== value) {
                callback(new Error("两次密码不一致!"));
            } else {
                callback();
            }
        },
        trigger: "blur"
    }
];
const onUpdate = async (formEl: FormInstance | undefined) => {
    loading.value = true;
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 模拟请求，需根据实际开发进行修改
            setTimeout(() => {
                ElMessage({
                    type: 'success',
                    message: "修改密码成功"
                })
                loading.value = false;
            }, 2000);
        } else {
            loading.value = false;
            return fields;
        }
    });
};


</script>

<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="updateRules" size="large">

        <el-form-item prop="phone">
            <el-input clearable v-model="ruleForm.phone" placeholder="手机号码" :prefix-icon="renderIcon('carbon:phone')" />
        </el-form-item>

        <el-form-item prop="password">
            <el-input clearable show-password v-model="ruleForm.password" placeholder="密码"
                :prefix-icon="renderIcon('carbon:locked')" />
        </el-form-item>



        <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
            <el-input clearable show-password v-model="ruleForm.repeatPassword" placeholder="确认密码"
                :prefix-icon="renderIcon('carbon:locked')" />
        </el-form-item>

        <el-form-item>
            <el-button class="w-full" size="default" type="primary" :loading="loading" @click="onUpdate(ruleFormRef)">
                确定
            </el-button>
        </el-form-item>



        <el-form-item>
            <el-button class="w-full" size="default" @click="authStore.setCurrentPage(0)">
                返回
            </el-button>
        </el-form-item>

    </el-form>
</template>