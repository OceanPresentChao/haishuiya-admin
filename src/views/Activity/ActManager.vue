<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 13:13:22
-->
<template>
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
                <el-popconfirm title="你确定要删除该活动吗？" confirmButtonText="是" cancelButtonText="否" confirmButtonType="danger"
                    cancelButtonType="text" @confirm="handleDelete(scope.$index, scope.row)">
                    <template #reference>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <ActForm v-model="form" @finish="handleSubmit" @cancel="triggerFromVis" :is-edit="isEdit" v-if="dialogFormVisible">
    </ActForm>
    <el-row justify="center">
        <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
            layout=" prev, pager, next,sizes" :total="total" />
    </el-row>
</template>
<script setup lang="ts">

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
const triggerFromVis = () => { dialogFormVisible.value = !dialogFormVisible.value; }
let defaultForm: Activity = {
    actName: '',
    time: ['', ''],
    type: '',
    region: '',
    actCategory: '',
    ticketNum: 0,
    isGoing: true,
    desc: '',
};
let form = ref<Activity>(Object.assign({}, unref(defaultForm)));

let selectedRow = 0;

const handleCreate = () => {
    isEdit.value = false;
    dialogFormVisible.value = true;
    console.log(dialogFormVisible.value);
    form.value = defaultForm;
}
const handleEdit = (index: number, row: Activity) => {
    isEdit.value = true;
    //index为索引，row为提供该行属性的代理对象
    console.log("Edit:", index, row);
    dialogFormVisible.value = true;
    form.value.actName = row.actName;
    form.value.time = [row.startTime!, row.endTime!];
    form.value.type = row.type;
    form.value.region = row.region;
    form.value.actCategory = row.actCategory;
    form.value.ticketNum = row.ticketNum;
    form.value.isGoing = row.isGoing;
    form.value.desc = row.desc;
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

const handleSubmit = async () => {
    let subForm = unref(form);
    subForm.startTime = subForm.time[0];
    subForm.endTime = subForm.time[1];
    let res: any;
    if (isEdit.value) { res = await proxy!.$API.requestPutAct({ ...subForm, _id: selectedRow }); }
    else { res = await proxy!.$API.requestPostAct(subForm); }
    dialogFormVisible.value = false;
    getActList(currentPage.value, pageSize.value);
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