
import { requestGetDepartList, requestGetRoleList } from '@/api/company'
import { requestGetFoodCategories } from '@/api/food'
import { requestGetBookCategories, requestGetPressList } from '@/api/product'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

import { Types } from './type'

interface BookCategoryOption {
    id: number
    title: string
}


interface DepartmentOption {
    id: number
    name: string
}

interface RoleOption {
    id: number
    name: string
    parent: number
    depart: number
}

interface PublishStatusOption {
    id: number
    name: string
}

interface PressOption {
    id: number
    name: string
}

interface FoodCategoryOption {
    id: number
    title: string
}


export const useOptionStore = defineStore({
    id: Types.OPTION,
    state: () => {
        const bookCateOptions: BookCategoryOption[] = []
        const departmentOptions: DepartmentOption[] = []
        const roleOptions: RoleOption[] = []
        const publishStatusOptions: PublishStatusOption[] = []
        const pressOptions: PressOption[] = []
        const foodCategoryOptions: FoodCategoryOption[] = []
        return {
            bookCateOptions,
            departmentOptions,
            roleOptions,
            publishStatusOptions,
            pressOptions,
            foodCategoryOptions
        }
    },
    getters: {

    },
    actions: {
        async getDepartmentOptions() {
            try {
                const { data } = await requestGetDepartList()
                this.departmentOptions = data.record
            } catch (error) {
                ElMessage({
                    type: "error",
                    message: String(error)
                })
            }
        },
        async getRoleOptions() {
            try {
                const { data } = await requestGetRoleList()
                this.roleOptions = data.record
            } catch (error) {
                ElMessage({
                    type: "error",
                    message: String(error)
                })
            }
        },
        async getBookCateOptions() {
            try {
                const { data } = await requestGetBookCategories()
                this.bookCateOptions = data.record
            } catch (error) {
                ElMessage({
                    type: "error",
                    message: String(error)
                })
            }
        },
        async getPressOptions() {
            try {
                const { data } = await requestGetPressList({ limit: 9999, page: 1, s_name: '' })
                this.pressOptions = data.record
            } catch (error) {
                ElMessage({
                    type: "error",
                    message: String(error)
                })
            }
        },
        async getFoodCategoryOptions() {
            try {
                const { data } = await requestGetFoodCategories()
                this.foodCategoryOptions = data.list
            } catch (error) {
                ElMessage({
                    type: "error",
                    message: String(error)
                })
            }
        },
        getPublishStatusOptions() {
            this.publishStatusOptions = [{ id: 0, name: '未上架' }, { id: 1, name: '已上架' }]
        },
        getDepartIdFromRoleId(roleId: number): number {
            let res = 0
            this.roleOptions.some((v) => {
                if (v.id === roleId) {
                    res = v.depart
                    return true
                }
                return false
            })
            return res
        },
        getDepartFromId(departId: number): string {
            let name = ''
            this.departmentOptions.some((v) => {
                if (v.id === departId) {
                    name = v.name
                    return true
                }
                return false
            })
            return name
        },
        getRoleFromId(roleId: number): string {
            let name = ''
            this.roleOptions.some((v) => {
                if (v.id === roleId) {
                    name = v.name
                    return true
                }
                return false
            })
            return name
        },
        getIdFromRole(role: string): number {
            let id = -1
            this.roleOptions.some((v) => {
                if (v.name === role) {
                    id = v.id
                    return true
                }
                return false
            })
            return id
        }
    }
})


