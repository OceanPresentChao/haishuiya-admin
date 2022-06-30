import { Icon } from "@iconify/vue"
export function renderIcon(icon: string) {
    return defineComponent({
        name: "MyIcon",
        render() {
            const attrs = this.$attrs;
            return h(
                Icon,
                {
                    icon: icon,
                    ...attrs
                },
                {
                    default: () => []
                }
            );
        }
    })
}