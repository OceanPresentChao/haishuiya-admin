/*
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-19 14:31:17
 */
import { reactive } from 'vue'
export default reactive({
    actName: {
        required: true,
        message: '请输入活动名称',
        trigger: 'blur',
    },
    time: {
        required: true,
        message: '请选择活动时间',
        trigger: 'blur'
    },
    type: {
        required: true,
        message: '请选择活动形式',
        trigger: 'change'
    },
    actCategory: {
        required: true,
        message: '请选择活动类型',
        trigger: 'change'
    },
})