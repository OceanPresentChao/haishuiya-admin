import 'pinia'
import { markRaw } from 'vue-router'
declare interface Operate {
    label: string
    value: string
}

declare module 'pinia' {
    export interface PiniaCustomProperties<Id, S, G, A> {
        $router: ReturnType<markRaw>
    }
}