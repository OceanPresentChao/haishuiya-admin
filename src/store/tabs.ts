import { defineStore } from 'pinia'
import { type Tab, Types } from './type'

export const useTabsStore = defineStore({
    id: Types.TABS,
    state: () => {
        let data: Tab[] = []
        return {
            collapse: false,
            tabsList: data,
        }
    },
    getters: {
        //获取collapse
        getCollapse(): boolean {
            return this.collapse;
        },
        getTabsList(): any[] {
            return this.tabsList
        },
        getAmount(): number {
            return this.tabsList.length
        }
    },
    actions: {
        setCollapse(collapse: boolean) {
            this.$state.collapse = collapse
        },
        addTab(tab: Tab) {
            if (this.$state.tabsList.some(item => item.path === tab.path)) return;
            this.$state.tabsList.push(tab)
        },
        clearTabs() {
            this.tabsList.splice(0, this.tabsList.length)
        }
    }

})