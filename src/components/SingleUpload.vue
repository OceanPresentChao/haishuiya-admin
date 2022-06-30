<template>
    <div>
        <el-upload class="upload-demo" drag :action="actionURL" :data="actionData" multiple :file-list="fileList"
            :headers="{ 'Access-Control-Allow-Origin': '*' }" :before-upload="beforeUpload"
            :on-preview="handlePictureCardPreview" list-type="picture-card">
            <Icon class="titleIcon" icon="carbon:fetch-upload-cloud"></Icon>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
        </el-upload>
        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ElMessage, type UploadProps, type UploadUserFile } from 'element-plus';
const props = defineProps({
    actionURL: {
        type: String,
        default: 'http://dev.api.yurzi.top:11451'
    },
    actionData: {
        type: Object,
        default: {}
    }
})
const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile: UploadUserFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('Picture must be JPG or PNG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
</script>
<style>
</style>