<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <Icon icon="carbon:search" class="titleIcon"></Icon>
                <span>筛选搜索</span>
                <el-button style="float: right" @click="searchDepartments" type="primary" size="default">
                    查询结果
                </el-button>
                <el-button style="float: right;margin-right: 15px" @click="handleResetSearch()" size="default">
                    重置
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="default" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="listQuery.s_name" placeholder="员工名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="员工部门：">
                        <el-select v-model="listQuery.s_departId" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in optionStore.departmentOptions" :key="item.id" :label="item.name"
                                :value="item.id" />
                            <el-option :key="-1" label="请选择" :value="-1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="员工职位：">
                        <el-select v-model="listQuery.s_roleId" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in optionStore.roleOptions" :key="item.id" :label="item.name"
                                :value="item.id" />
                            <el-option :key="-1" label="请选择" :value="-1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <Icon icon="bi:card-list" class="titleIcon"></Icon>
            <span>数据列表</span>
            <el-button class="btn-add" @click="handleCreate" size="default">
                添加
            </el-button>
        </el-card>
        <div class="table-container">
            <suspense>
                <el-table ref="brandTable" :data="list.data" style="width: 100%"
                    @selection-change="handleSelectionChange" v-loading="list.listLoading" border>
                    <el-table-column type="selection" width="60" align="center" />
                    <el-table-column property="id" label="编号" width="110" align="center" />
                    <el-table-column property="name" label="名称" width="160" align="center" />
                    <el-table-column property="age" label="年龄" width="120" align="center" />
                    <el-table-column property="depart_id" label="部门" width="170" align="center"
                        :formatter="(row: any, column: any, cellValue: number, index: number) => { return optionStore.getDepartFromId(cellValue) }" />
                    <el-table-column property="role_id" label="职位" width="170" align="center"
                        :formatter="(row: any, column: any, cellValue: number, index: number) => { return optionStore.getRoleFromId(cellValue) }" />
                    <el-table-column property="salary" label="薪水" width="120" align="center" />
                    <el-table-column property="phone" label="电话" width="170" align="center" />
                    <el-table-column label="操作" align="center">
                        <template #default="scope">
                            <el-button size="default" @click="handleUpdate(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button size="default" type="primary" @click="handleCharge(scope.$index, scope.row)">发放薪水
                            </el-button>
                            <el-popconfirm title="Are you sure to delete this?"
                                @confirm="handleDelete(scope.$index, scope.row)">
                                <template #reference>
                                    <el-button size="default" type="danger">删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </suspense>
        </div>
        <div class="batch-operate-container">
            <el-select size="default" v-model="operateType" placeholder="批量操作">
                <el-option v-for="item in operates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button style="margin-left: 20px" class="search-button" @click="handleBatchOperate()" type="primary"
                size="default">
                确定
            </el-button>
        </div>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.limit" :page-sizes="[5, 10, 15]"
                :current-page.sync="listQuery.page" :total="list.total">
            </el-pagination>
        </div>
        <StaffDialog :isShow="dialogProps.isShow" :isEdit="dialogProps.isEdit" v-model="staffParam"
            @cancel="dialogProps.isShow = false" @submit="handleSubmit"></StaffDialog>
    </div>
</template>
<script lang="ts" setup >
import { ElMessage, ElMessageBox } from 'element-plus';
import { requestCreateStaff, requestDeleteStaff, requestGetStaffList, requestPutSalary, requestUpdateStaff } from '@/api/company';
import { useOptionStore } from '@/store/option';
import _ from "lodash"
const { t } = useI18n()
const route = useRoute()
const operates: Operate[] = [
    {
        label: "删除员工",
        value: "delStaff"
    }
]

const operateType = ref("delStaff")
const optionStore = useOptionStore()
const defaultListQuery = {
    limit: 5,
    page: 1,
    s_name: "",
    s_roleId: -1,
    s_departId: -1,
    s_age: -1,
}

const dialogProps = ref({ isShow: false, isEdit: true })
const listQuery = ref(JSON.parse(JSON.stringify(defaultListQuery)))
const list = ref({
    listLoading: false,
    data: [],
    total: 0,
    totalPage: 0,
    pageSize: 0,
})
let multipleSelection: any[] = []
const defaultStaffParam = {
    id: 1,
    roleId: 1,
    salary: 0,
    age: 0,
    card: '',
    name: '',
    telphone: '',
}
const staffParam = ref<typeof defaultStaffParam>(JSON.parse(JSON.stringify(defaultStaffParam)))


async function getStaffList() {
    try {
        list.value.listLoading = true;
        const { data } = await requestGetStaffList(listQuery.value)
        list.value.listLoading = false
        list.value.data = data.record
        list.value.total = data.total
        list.value.totalPage = Math.floor(data.total / listQuery.value.limit) + 1
        list.value.pageSize = listQuery.value.limit
    } catch (error) {
        ElMessage({
            type: "error",
            message: String(error)
        })
    }
}

function handleSelectionChange(val: any[]) {
    multipleSelection = val;
}

function handleResetSearch() {
    listQuery.value = defaultListQuery
}

function handleCharge(index: number, row: any) {
    ElMessageBox.prompt('请填写充值金额', '充值', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern:
            /[\d]+/,
        inputErrorMessage: '不合法数额',
    })
        .then(async ({ value }) => {
            const { data } = await requestPutSalary({ id: row.id, amount: Number(value) })
            if (data.code >= 200 && data.code < 300) {
                ElMessage({
                    type: 'success',
                    message: `发放薪水成功！金额为：${value}`,
                })
                getStaffList()
            } else {
                ElMessage({
                    type: 'error',
                    message: data.message,
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '充值取消',
            })
        })
}

function handleCreate() {
    dialogProps.value.isShow = true
    dialogProps.value.isEdit = false
    staffParam.value = defaultStaffParam
}

function handleUpdate(index: number, row: any) {
    dialogProps.value.isShow = true
    dialogProps.value.isEdit = true
    staffParam.value.id = row.id
    staffParam.value.name = row.name
    staffParam.value.age = row.age
    staffParam.value.card = row.card
    staffParam.value.roleId = row.role_id
    staffParam.value.salary = Number(row.salary)
    staffParam.value.telphone = row.phone
}

async function handleSubmit() {
    let res: any = ''
    if (dialogProps.value.isEdit) {
        const { data } = await requestUpdateStaff(staffParam.value)
        res = data
    } else {
        const { data } = await requestCreateStaff(_.assign(staffParam.value, { role: staffParam.value.roleId }))
        res = data
    }
    if (res.code >= 200 && res.code < 300) {
        getStaffList()
        ElMessage({
            type: "success",
            message: res.message
        })
    } else {
        ElMessage({
            type: "error",
            message: res.message
        })
    }
    dialogProps.value.isShow = false
}

async function handleDelete(index: number, row: any) {
    const { data } = await requestDeleteStaff({ id: row.id! })
    if (data.code >= 200 && data.code < 300) {
        ElMessage({
            message: data.message,
            type: 'success',
            duration: 1000
        });
        getStaffList()
    } else {
        ElMessage({
            message: data.message,
            type: 'error',
            duration: 1000
        });
    }
}

function handleSizeChange(val: number) {
    listQuery.value.page = 1;
    listQuery.value.limit = val;
    getStaffList();
}
function handleCurrentChange(val: number) {
    listQuery.value.page = val;
    getStaffList();
}
function searchDepartments() {
    listQuery.value.page = 1;
    getStaffList();
}
function handleBatchOperate() {
    console.log(multipleSelection);
    if (multipleSelection.length < 1) {
        ElMessage({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
        });
        return;
    }
    if (operateType.value === 'delStaff') {
        for (let i = 0; i < multipleSelection.length; i++) {
            handleDelete(0, { id: multipleSelection[i].id })
        }
    } else {
        ElMessage({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
        });
        return;
    }
}


if (route.query.s_roleId) {
    listQuery.value.s_roleId = Number(route.query.s_roleId)
}

getStaffList()
optionStore.getDepartmentOptions()
optionStore.getRoleOptions()
</script>
<style scoped>
</style>