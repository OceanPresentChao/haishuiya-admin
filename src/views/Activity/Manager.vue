<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 13:13:22
-->
<template>
    <Bread></Bread>
    <div style="text-align: left; margin: 10px 0;">
        <el-button type="primary" size="large" @click="handleCreate">创建活动</el-button>
    </div>
    <el-table :data="filterActList" style="width: 100%" stripe>
        <el-table-column label="活动名" prop="actName" />
        <el-table-column label="活动分类" prop="actCategory" />
        <el-table-column label="活动形式" prop="type" />
        <el-table-column label="进行中" prop="isGoing" />
        <el-table-column label="开始日期" prop="startTime" />
        <el-table-column label="结束日期" prop="endTime" />
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" placeholder="请输入活动名" />
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popconfirm
                    title="你确定要删除该活动吗？"
                    confirmButtonText="是"
                    cancelButtonText="否"
                    confirmButtonType="danger"
                    cancelButtonType="text"
                    @confirm="handleDelete(scope.$index, scope.row)"
                >
                    <template #reference>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <Teleport to="body">
        <el-dialog v-model="dialogFormVisible" title="编辑活动">
            <el-form :model="form" label-width="120px" :rules="formRules" ref="formRef">
                <el-form-item label="活动名称" v-if="!isEdit" prop="actName">
                    <el-input v-model="form.actName" />
                </el-form-item>
                <el-form-item label="活动时间" prop="time">
                    <el-date-picker
                        v-model="form.time"
                        format="YYYY年MM月DD日hh时mm分"
                        value-format="YYYY年MM月DD日hh时mm分"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        size="large"
                    />
                </el-form-item>
                <el-form-item label="活动类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio label="线上" name="type" />
                        <el-radio label="线下" name="type" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动地点" v-if="form.type === '线下'" prop="region">
                    <el-input v-model="form.region" placeholder="请输入活动地点"></el-input>
                </el-form-item>
                <el-form-item label="活动类型" prop="actCategory">
                    <el-radio-group v-model="form.actCategory">
                        <el-radio label="打卡" name="actCategory" />
                        <el-radio label="抢票" name="actCategory" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动票数" v-if="form.actCategory === '抢票'" prop="ticketNum">
                    <el-input-number
                        v-model="form.ticketNum"
                        :min="0"
                        :max="50000"
                        :step="1"
                        :controls="true"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="是否立即开始" prop="isGoing">
                    <el-switch v-model="form.isGoing" />
                </el-form-item>
                <el-form-item label="活动说明" prop="desc">
                    <el-input v-model="form.desc" type="textarea" placeholder="请输入活动说明" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </Teleport>
    <el-row justify="center">
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20]"
            layout=" prev, pager, next,sizes"
            :total="total"
        />
    </el-row>
</template>
<script setup lang="ts">
import Bread from '../../components/Bread.vue';
import formRules from './FormRules';
import { ElMessage } from 'element-plus';
interface Activity {
    actName: string,
    time: [string, string],
    type: string,
    region: string,
    actCategory: string,
    ticketNum: number,
    isGoing: boolean,
    desc: string,
    startTime?: string,
    endTime?: string,
    _id?: number
}
let currentPage = ref(1);
let pageSize = ref(5);
let total = ref(100);
let actList = ref<Activity[]>([]);
let isEdit = ref(false);//表单用于编辑还是创建
let { proxy } = getCurrentInstance() ?? {};
let search = ref('');
let filterActList = computed(() =>
    actList.value.filter((val) =>
        !search.value || val.actName.toLowerCase().includes(search.value.toLowerCase())
    )
);
let dialogFormVisible = ref(false);
let form: Activity = reactive({
    actName: '',
    time: ['', ''],
    type: '',
    region: '',
    actCategory: '',
    ticketNum: 0,
    isGoing: true,
    desc: '',
});
let selectedRow = 0;
const formRef = ref<HTMLFormElement>();
const handleCreate = () => {
    isEdit.value = false;
    dialogFormVisible.value = true;
    form.actName = '';
    form.time = ['', ''];
    form.type = '';
    form.region = '';
    form.actCategory = '';
    form.ticketNum = 0;
    form.isGoing = true;
    form.desc = '';
}
const handleEdit = (index: number, row: Activity) => {
    isEdit.value = true;
    //index为索引，row为提供该行属性的代理对象
    console.log(index, row);
    dialogFormVisible.value = true;
    form.actName = row.actName;
    form.time = [row.startTime!, row.endTime!];
    form.type = row.type;
    form.region = row.region;
    form.actCategory = row.actCategory;
    form.ticketNum = row.ticketNum;
    form.isGoing = row.isGoing;
    form.desc = row.desc;
    selectedRow = row._id!;
    //console.log(selectedRow);
}

const handleDelete = async (index: number, row: Activity) => {
    try {
        await proxy!.$API.requestDelAct({ ...row });
        getActList(currentPage.value, pageSize.value);
    } catch (err) {
        console.log(err);
    }

}

const onSubmit = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid: boolean, fields: any) => {
        if (valid) {
            let subForm = toRaw(form);
            subForm.startTime = subForm.time[0];
            subForm.endTime = subForm.time[1];
            let res;
            if (isEdit.value) { res = await proxy!.$API.requestPutAct({ ...subForm, _id: selectedRow }); }
            else { res = await proxy!.$API.requestPostAct(subForm); }
            dialogFormVisible.value = false;
            getActList(currentPage.value, pageSize.value);
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}


const getActList = async (page: number, limit: number) => {
    try {
        const res = await proxy!.$API.requestActList(page, limit);
        total.value = (res && res.total) || 0;
        actList.value = res.records || [];
        console.log(res);
    } catch (err) {
        console.log(err);
    }
    //console.log(actList);
}


//监听分页器的变化
watch([currentPage, pageSize], ([newcurpage, newpagesize]) => {
    getActList(newcurpage, newpagesize);
}, { immediate: true })
</script>
<style lang="css">
</style>