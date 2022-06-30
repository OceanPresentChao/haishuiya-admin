<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <Icon icon="carbon:search" class="titleIcon"></Icon>
                <span>筛选搜索</span>
                <el-button style="float: right" @click="searchBrandList" type="primary" size="default">
                    查询结果
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="default" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="listQuery.s_name" placeholder="出版社名称/关键字"
                            @keydown.enter="searchBrandList"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <Icon icon="bi:card-list" class="titleIcon"></Icon>
            <span>数据列表</span>
            <el-button class="btn-add" @click="handleCreate">
                添加
            </el-button>
        </el-card>
        <div class="table-container">
            <suspense>
                <el-table ref="brandTable" :data="list.data" style="width: 100%"
                    @selection-change="handleSelectionChange" v-loading="list.listLoading" border>
                    <el-table-column type="selection" width="60" align="center" />
                    <el-table-column property="id" label="编号" width="100" align="center" />

                    <el-table-column property="name" label="出版社名称" align="center" />

                    <el-table-column label="是否显示" width="100" align="center">
                        <template #default="scope">
                            <el-switch @change="handleShowStatusChange(scope.$index, scope.row)" :active-value="1"
                                :inactive-value="0" v-model="scope.row.show">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="相关" width="220" align="center">
                        <template #default="scope">
                            <span>图书数：</span>
                            <el-button type="primary" size="default" text
                                @click="router.push({ path: '/product/book', query: { s_pressName: scope.row.name } })">
                                {{ scope.row.bookNum }}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template #default="scope">
                            <el-button size="default" @click="handleUpdate(scope.$index, scope.row)">编辑
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
        <el-dialog :title="dialogProps.title" v-model="dialogProps.visible" :before-close="dialogProps.handleClose"
            width="30%" append-to-body>
            <el-form ref="pressFormRef" :model="dialogProps.pressProps" :rules="dialogProps.rules" label-width="120px">
                <el-form-item label="出版社名称" prop="name">
                    <el-input v-model="dialogProps.pressProps.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogProps.visible = false">取 消</el-button>
                <el-button type="primary" @click="dialogProps.handleConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup >
import { ElMessage } from 'element-plus';
import { requestCreatePress, requestDeletePress, requestGetPressList, requestUpdatePress, requestUpdatePressShow } from '@/api/product';
const { t } = useI18n()
const router = useRouter()
const operates: Operate[] = [
    {
        label: "显示出版社",
        value: "showBrand"
    },
    {
        label: "隐藏出版社",
        value: "hideBrand"
    },
    {
        label: "删除出版社",
        value: "delBrand"
    }
]
const operateType = ref("showBrand")
const listQuery = ref({
    s_name: "",
    limit: 10,
    page: 1
})
const list = ref({
    listLoading: false,
    data: [],
    total: 0,
    totalPage: 0,
    pageSize: 0,
})
let multipleSelection: any[] = []
const pressFormRef = ref()
const dialogProps = ref({
    title: '',
    visible: false,
    isEdit: false,
    rules: {
        name: [
            { required: true, message: '请输入出版社名称', trigger: 'blur' }
        ]
    },
    pressProps: {
        name: '',
        id: -1
    },
    handleClose(done: () => void) {
        done()
    },
    handleConfirm() {
        pressFormRef.value.validate(async (valid: boolean) => {
            if (valid) {
                let res: any = ''
                if (dialogProps.value.isEdit) {
                    const { data } = await requestUpdatePress(dialogProps.value.pressProps)
                    res = data
                } else {
                    const { data } = await requestCreatePress(dialogProps.value.pressProps)
                    res = data
                }
                if (res.code >= 200 && res.code < 300) {
                    getPressList()
                    ElMessage({
                        type: "success",
                        message: res.message
                    })
                    getPressList()
                } else {
                    ElMessage({
                        type: "error",
                        message: res.message
                    })
                }
                dialogProps.value.visible = false
            } else {
            }
        });
    }
})

async function getPressList() {
    try {
        list.value.listLoading = true;
        const { data } = await requestGetPressList(listQuery.value)
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

function handleCreate() {
    dialogProps.value.visible = true;
    dialogProps.value.isEdit = false;
    dialogProps.value.title = "新建出版社";
    dialogProps.value.pressProps.name = '';
}

function handleUpdate(index: number, row: any) {
    dialogProps.value.visible = true;
    dialogProps.value.isEdit = true;
    dialogProps.value.title = "编辑出版社";
    dialogProps.value.pressProps.name = row.name;
    dialogProps.value.pressProps.id = row.id;
}

async function handleDelete(index: number, row: any) {
    const { data } = await requestDeletePress({ id: row.id! })
    if (data.code >= 200 && data.code < 300) {
        ElMessage({
            message: data.message,
            type: 'success',
            duration: 1000
        });
        getPressList()
    } else {
        ElMessage({
            message: data.message,
            type: 'error',
            duration: 1000
        });
    }
}

async function handleShowStatusChange(index: number, row: any) {
    const { data } = await requestUpdatePressShow({ id: row.id, show: row.show })
    if (data.code >= 200 && data.code < 300) {
        ElMessage({
            message: data.message,
            type: 'success',
            duration: 1000
        });
        getPressList()
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
    getPressList();
}
function handleCurrentChange(val: number) {
    listQuery.value.page = val;
    getPressList();
}
function searchBrandList() {
    listQuery.value.page = 1;
    getPressList();
}
function handleBatchOperate() {
    if (multipleSelection.length < 1) {
        ElMessage({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
        });
        return;
    }
    let showStatus = 0;
    if (operateType.value === 'showBrand') {
        showStatus = 1;
    } else if (operateType.value === 'hideBrand') {
        showStatus = 0;
    } else if (operateType.value === 'delBrand') {
        for (let i = 0; i < multipleSelection.length; i++) {
            handleDelete(0, { id: multipleSelection[i].id })
        }
        return
    } else {
        ElMessage({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
        })
        return
    }
    for (let i = 0; i < multipleSelection.length; i++) {
        handleShowStatusChange(0, { id: multipleSelection[i].id, show: showStatus })
    }
}

getPressList()
</script>
<style scoped>
</style>