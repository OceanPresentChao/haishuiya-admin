<template>
    <div>
        <el-card class="form-container" shadow="never">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="填写图书信息"></el-step>
            </el-steps>
            <book-info-detail v-show="showStatus[0]" :is-edit="isEdit" @nextStep="nextStep"></book-info-detail>
        </el-card>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    }
})

const active = ref(0)
const showStatus = ref([true, false])

function hideAll() {
    for (let i = 0; i < showStatus.value.length; i++) {
        showStatus.value[i] = false;
    }
}
function prevStep() {
    if (active.value > 0 && active.value < showStatus.value.length) {
        active.value--;
        hideAll();
        showStatus.value[active.value] = true;
    }
}
function nextStep() {
    if (active.value < showStatus.value.length - 1) {
        active.value++;
        hideAll();
        showStatus.value[active.value] = true;
    }
}


</script>

<style scoped>
</style>