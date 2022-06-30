<template>
    <div class="app-container">
        <div class="overview-layout">
            <el-row :gutter="20" align="middle">
                <el-col :span="6" :offset="0">
                    <el-card>
                        <template #header>
                            <h1 class="text-center font-bold text-lg">每日一句</h1>
                        </template>
                        <div class="text-center">
                            <img width="150px" height="150px"
                                src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/banner/qrcode_for_macrozheng_258.jpg">
                        </div>
                        <div class="text-center"> {{ slogan.content }}</div>
                        <div class="text-center">
                            <span class="">
                                ————{{ slogan.from }}
                            </span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="18" :offset="0">
                    <div class="address-layout">
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="out-border">
                                    <div class="layout-title">管理员</div>
                                    <div class="address-content">
                                        {{ authStore.userInfo.name }}
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="out-border">
                                    <div class="layout-title">个人博客</div>
                                    <div class="address-content">
                                        <a href="http://www.OceanPresent.art" target="_blank">OceanPresent.art</a>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="out-border">
                                    <div class="layout-title">GitHub地址</div>
                                    <div class="address-content">
                                        <a href="https://github.com/OceanPresentChao/CarillionBookstore-admin"
                                            target="_blank">Carillion
                                            Bookstore</a>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="total-layout">
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="total-frame">
                                    <Icon class="total-icon" icon="ic:baseline-point-of-sale"></Icon>
                                    <div class="total-title">今日订单总数</div>
                                    <div class="total-value">12</div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="total-frame">
                                    <Icon class="total-icon" icon="carbon:money"></Icon>
                                    <div class="total-title">今日销售总额</div>
                                    <div class="total-value">￥227</div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="total-frame">
                                    <Icon class="total-icon" icon="gridicons:product"></Icon>
                                    <div class="total-title">昨日销售总额</div>
                                    <div class="total-value">￥4069</div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="overview-layout">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="out-border">
                        <div class="layout-title">图书总览</div>
                        <div style="padding: 40px">
                            <el-row>
                                <el-col :span="8" class="color-danger overview-item-value">{{ bookReview.offSale }}
                                </el-col>
                                <el-col :span="8" class="color-danger overview-item-value">{{ bookReview.onSale }}
                                </el-col>
                                <el-col :span="8" class="color-danger overview-item-value">{{ bookReview.total }}
                                </el-col>
                            </el-row>
                            <el-row class="font-medium">
                                <el-col :span="8" class="overview-item-title">已下架</el-col>
                                <el-col :span="8" class="overview-item-title">已上架</el-col>
                                <el-col :span="8" class="overview-item-title">全部图书</el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="out-border">
                        <div class="layout-title">用户总览</div>
                        <div style="padding: 40px">
                            <el-row>
                                <el-col :span="6" class="color-danger overview-item-value">{{ userReview.today }}
                                </el-col>
                                <el-col :span="6" class="color-danger overview-item-value">{{ userReview.yesterday }}
                                </el-col>
                                <el-col :span="6" class="color-danger overview-item-value">{{ userReview.month }}
                                </el-col>
                                <el-col :span="6" class="color-danger overview-item-value">{{ userReview.total }}
                                </el-col>
                            </el-row>
                            <el-row class="font-medium">
                                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                                <el-col :span="6" class="overview-item-title">会员总数</el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="statistics-layout">
            <div class="layout-title">订单统计</div>
            <el-row>
                <el-col :span="4">
                    <div style="padding: 20px">
                        <div>
                            <div style="color: #909399;font-size: 14px">本月订单总数</div>
                            <div style="color: #606266;font-size: 24px;padding: 10px 0">227</div>
                            <div>
                                <span class="color-success" style="font-size: 14px">+5%</span>
                                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <div style="color: #909399;font-size: 14px">本周订单总数</div>
                            <div style="color: #606266;font-size: 24px;padding: 10px 0">101</div>
                            <div>
                                <span class="color-danger" style="font-size: 14px">-9%</span>
                                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <div style="color: #909399;font-size: 14px">本月销售总额</div>
                            <div style="color: #606266;font-size: 24px;padding: 10px 0">54270</div>
                            <div>
                                <span class="color-success" style="font-size: 14px">+7%</span>
                                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <div style="color: #909399;font-size: 14px">本周销售总额</div>
                            <div style="color: #606266;font-size: 24px;padding: 10px 0">24074</div>
                            <div>
                                <span class="color-danger" style="font-size: 14px">-10%</span>
                                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div style="padding: 10px;border-left:1px solid #DCDFE6">
                        <el-date-picker style="float: right;z-index: 1" size="large" v-model="orderCountDate"
                            type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                        <div ref="chartRef" style="width:50rem;height:40rem;"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { requestSlogan } from "@/api/slogan"
import { echarts } from "@/plugin/echart"
import { useAuthStore } from "@/store/auth"
import { requestGetBookReview } from "@/api/product"
import { requestGetUserReview } from "@/api/user"
const authStore = useAuthStore()
const slogan = ref({ content: '', from: '' })
const orderCountDate = ref('')
const chartRef = ref<HTMLDivElement | null>(null)
const bookReview = ref<Record<string, number>>({})
const userReview = ref<Record<string, number>>({})
async function getReview() {
    try {
        const { data: book } = await requestGetBookReview()
        const { data: user } = await requestGetUserReview()
        bookReview.value = book.result
        userReview.value = user.result
    } catch (error) {
        console.warn(error);
    }
}

async function getSlogan() {
    const { data } = await requestSlogan()
    slogan.value = { content: data.hitokoto, from: data.from }
}

onMounted(() => {
    if (chartRef.value) {
        const myChart = echarts.init(chartRef.value)
        myChart.setOption({
            title: {
                text: '订单统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['图书订单', '食品订单', '充值订单', '薪水订单'],
                right: 300
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '图书订单',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '食品订单',
                    type: 'line',
                    stack: 'Total',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '充值订单',
                    type: 'line',
                    stack: 'Total',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '薪水订单',
                    type: 'line',
                    stack: 'Total',
                    data: [320, 332, 301, 334, 390, 330, 320]
                }
            ]
        })
    }
})

getSlogan()
getReview()


</script>

<style scoped>
.app-container {
    margin: 0 10%;
}


.total-layout {
    margin-top: 1.5rem;
}

.total-frame {
    border: 1px solid #DCDFE6;
    padding: 1.25rem;
}

.total-icon {
    color: #409EFF;
    width: 30px;
    height: 30px;
}

.total-title {
    position: relative;
    color: #909399;
}

.total-value {
    position: relative;
    font-size: large;
    color: #606266;
}

.un-handle-layout {
    margin-top: 1.25rem;
    border: 1px solid #DCDFE6;
}

.layout-title {
    color: #606266;
    padding: 1rem 1.25rem;
    background: #F2F6FC;
    font-weight: bold;
}

.un-handle-content {
    padding: 1rem 2rem;
}

.un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 1rem;
}

.overview-layout {
    margin-top: 1.25rem;
}

.overview-item-value {
    font-size: 1.75rem;
    text-align: center;
}

.overview-item-title {
    margin-top: 10px;
    text-align: center;
}

.out-border {
    border: 1px solid #DCDFE6;
}

.statistics-layout {
    margin-top: 1.25rem;
    border: 1px solid #DCDFE6;
}


.address-content {
    padding: 1.25rem;
    font-size: large
}
</style>