<template>
    <div style="margin-top: 50px">
        <el-form :model="bookParam" ref="bookInfoForm" label-width="auto" status-icon>
            <el-form-item label="商品名称：" prop="requiredProp">
                <el-input v-model="bookParam.name">
                </el-input>
            </el-form-item>
            <el-form-item label="商品分类：">
                <el-select v-model="bookParam.categoryId" placeholder="Select" style="width: 240px">
                    <el-option v-for="item in optionStore.bookCateOptions" :key="item.id" :label="item.title"
                        :value="item.id" />
                    <el-option :key="-1" label="请选择" :value="-1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图书作者：">
                <el-input :autoSize="true" v-model="bookParam.author" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="图书出版社：">
                <el-select v-model="bookParam.pressId" placeholder="请选择出版社">
                    <el-option v-for="item in optionStore.pressOptions" :key="item.id" :label="item.name"
                        :value="item.id">
                    </el-option>
                    <el-option :key="-1" label="请选择" :value="-1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图书简介：">
                <el-input :autoSize="true" v-model="bookParam.desc" type="textarea" placeholder="请输入内容">
                </el-input>
            </el-form-item>
            <el-form-item label="图书出版日期：">
                <el-date-picker v-model="bookParam.pubDate" type="date" placeholder="Pick a day" format="YYYY年MM月DD日"
                    value-format="YYYY-MM-DD" size="default" />
            </el-form-item>
            <el-form-item label="图书版本：">
                <el-input v-model="bookParam.version"></el-input>
            </el-form-item>
            <el-form-item label="商品售价：">
                <el-input v-model="bookParam.price"></el-input>
            </el-form-item>
            <!-- <el-form-item label="商品库存：">
                <el-input v-model="bookParam.stock"></el-input>
            </el-form-item> -->
            <el-form-item label="属性图片：" class="pb-4" v-if="isEdit">
                <single-upload style="display: inline-block;margin-left: 10px" :actionURL="ACTION_URL" :actionData="{}">
                </single-upload>
            </el-form-item>
            <el-form-item label="是否上架:">
                <el-switch v-model="bookParam.isShow"></el-switch>
            </el-form-item>
            <div class="text-center">
                <el-button type="primary" @click="handleCommit(isEdit)">完成，提交图书</el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { requestCreateBook, requestGetBook, requestUpdateBook } from '@/api/product';
import { useOptionStore } from '@/store/option';

import { ElMessage, ElMessageBox } from 'element-plus';
import _ from 'lodash';

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    }
})
const route = useRoute()
const router = useRouter()
const ACTION_URL = 'http://dev.api.yurzi.top:11451/v1/book/avatar/'
const defaultBookParam = {
    id: -1,
    pressId: -1,
    categoryId: -1,
    isShow: 1,
    desc: '',
    name: '',
    pubDate: '',
    version: 0,
    author: '',
    price: 0,
    page: 0,
    // //会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
    // memberPriceList: [],
    // //商品满减
    // productFullReductionList: [{ fullPrice: 0, reducePrice: 0 }],
    // //商品阶梯价格
    // productLadderList: [{ count: 0, discount: 0, price: 0 }],
    // promotionType: 0
}
const bookParam = ref<typeof defaultBookParam>(JSON.parse(JSON.stringify(defaultBookParam)))

const optionStore = useOptionStore()

//选中商品分类的值
const bookInfoForm = ref()

function handleNext() {
    bookInfoForm.value.validate((valid: boolean) => {
        if (valid) {
            // emits('nextStep')
        } else {
            ElMessage({
                message: '验证失败',
                type: 'error',
                duration: 1000
            });
            return false;
        }
    });
}

function handleCommit(isEdit: boolean) {
    ElMessageBox.confirm('是否要提交该图书', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        let code = 0
        let message = ''
        if (isEdit) {
            const { data } = await requestUpdateBook(bookParam.value)
            code = data.code
            message = data.message

        } else {
            const { data } = await requestCreateBook(bookParam.value)
            code = data.code
            message = data.message
        }
        if (code >= 200 && code < 300) {
            ElMessage({
                type: 'success',
                message: message,
                duration: 1000
            });
            location.reload();
        } else {
            ElMessage({
                type: 'error',
                message: message,
                duration: 1000
            });
        }
        router.back();
    })
}

async function initBookInfo() {
    if (props.isEdit) {
        const bookId = route.query.id
        if (bookId) {
            bookParam.value.id = Number(route.query.id)
            const { data } = await requestGetBook({ id: Number(bookId) })
            const bookData = data.record[0]
            _.assign(bookParam.value, bookData)
        }
    }
}

optionStore.getBookCateOptions()
optionStore.getPressOptions()
initBookInfo()


</script>

<style scoped>
</style>