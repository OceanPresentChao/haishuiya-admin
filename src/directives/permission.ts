import { useAuthStore } from './../store/auth';
import type { Directive, DirectiveBinding } from "vue";

export const auth: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding;
        if (value) {
            const authStore = useAuthStore()
            const authRoles = value;
            let hasAuth: boolean = false
            if (typeof authRoles === 'string') {
                hasAuth = authStore.userInfo.roles.includes(authRoles)
            }
            if (Array.isArray(authRoles)) {
                hasAuth = authRoles.every((v) => authStore.userInfo.roles.includes(v))
            }
            if (!hasAuth) {
                if (el.parentNode) {
                    el.parentNode.removeChild(el)
                }
                else {
                    throw new Error("element doesn't have parent node!")
                }
            }
        } else {
            throw new Error("need roles! Like v-auth=\"['admin','test']\"");
        }
    }
}