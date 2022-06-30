<template>
    <div>
        <el-dialog v-model="isShow" title="编辑员工" destroy-on-close :show-close="false" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <el-form :model="modelValue" label-width="120px" :rules="formRules" ref="formRef" append-to-body>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="modelValue.name" />
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input-number v-model="modelValue.age" :step="1" :min="1" controls-position="right" />
                </el-form-item>
                <el-form-item label="薪水" prop="salary">
                    <el-input-number v-model="modelValue.salary" :min="0" controls-position="right" />
                </el-form-item>
                <el-form-item label="银行卡号" prop="card">
                    <el-input v-model="modelValue.card" />
                </el-form-item>
                <el-form-item label="手机号" prop="telphone">
                    <el-input v-model="modelValue.telphone" />
                </el-form-item>
                <el-form-item label="员工职位：" prop="roleId">
                    <el-select v-model="modelValue.roleId" placeholder="Select" style="width: 240px">
                        <el-option v-for="item in optionStore.roleOptions" :key="item.id" :label="item.name"
                            :value="item.id" />
                        <el-option :key="-1" label="请选择" :value="-1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="员工部门：" prop="departId">
                    <el-select v-model="roleDepart" placeholder="Select" style="width: 240px" :disabled="true">
                        <el-option v-for="item in optionStore.departmentOptions" :key="item.id" :label="item.name"
                            :value="item.id" />
                        <el-option :key="-1" label="请选择" :value="-1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div>
                    <el-button @click="$emit('cancel')">取消</el-button>
                    <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { useOptionStore } from '@/store/option';
import type { FormInstance } from 'element-plus'

const formRules = {
    name: {
        required: true,
        message: '请输入员工名称',
        trigger: 'blur',
    },
    age: {
        required: true,
        message: '请输入员工年龄',
        trigger: 'blur'
    },
    salary: {
        required: true,
        message: '请输入员工薪水',
        trigger: 'blur'
    },
    card: {
        required: true,
        message: '请输入员工银行卡号',
        trigger: 'blur'
    },
    telphone: {
        required: true,
        message: '请输入员工电话号',
        trigger: 'blur'
    },
}
const props = defineProps({
    isEdit: {
        type: Boolean,
        required: true
    },
    isShow: {
        type: Boolean,
        required: true
    },
    modelValue: {
        type: Object,
        required: true
    }
})
const emits = defineEmits(['cancel', 'submit'])
const roleDepart = computed(() => {
    return optionStore.getDepartIdFromRoleId(props.modelValue.roleId)
})
const optionStore = useOptionStore()
const formRef = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            emits('submit')
        } else {

        }
    })
}

optionStore.getRoleOptions()
optionStore.getDepartmentOptions()
</script>

<style scoped>
</style>