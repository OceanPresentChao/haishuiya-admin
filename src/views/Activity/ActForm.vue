<template>
    <Teleport to="body">
        <el-dialog v-model="dialogFormVisible" title="编辑活动">
            <el-form :model="value" label-width="120px" :rules="formRules" ref="formRef">
                <el-form-item label="活动名称" v-if="!isEdit" prop="actName">
                    <el-input v-model="value.actName" />
                </el-form-item>
                <el-form-item label="活动时间" prop="time">
                    <el-date-picker v-model="value.time" format="YYYY年MM月DD日hh时mm分" value-format="YYYY年MM月DD日hh时mm分"
                        type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
                        size="large" />
                </el-form-item>
                <el-form-item label="活动类型" prop="type">
                    <el-radio-group v-model="value.type">
                        <el-radio label="线上" name="type" />
                        <el-radio label="线下" name="type" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动地点" v-if="value.type === '线下'" prop="region">
                    <el-input v-model="value.region" placeholder="请输入活动地点"></el-input>
                </el-form-item>
                <el-form-item label="活动类型" prop="actCategory">
                    <el-radio-group v-model="value.actCategory">
                        <el-radio label="打卡" name="actCategory" />
                        <el-radio label="抢票" name="actCategory" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动票数" v-if="value.actCategory === '抢票'" prop="ticketNum">
                    <el-input-number v-model="value.ticketNum" :min="0" :max="50000" :step="1" :controls="true">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="是否立即开始" prop="isGoing">
                    <el-switch v-model="value.isGoing" />
                </el-form-item>
                <el-form-item label="活动说明" prop="desc">
                    <el-input v-model="value.desc" type="textarea" placeholder="请输入活动说明" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="$emit('handleSubmit', value)">提交</el-button>
                    <el-button @click="$emit('changeVis')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </Teleport>
</template>

<script setup lang="ts">
import formRules from './FormRules';
defineProps({
    dialogFormVisible: Boolean,
    isEdit: Boolean,
    value: Object
})
defineEmits(['changeVis', 'handleSubmit'])

</script>

<style scoped>
</style>