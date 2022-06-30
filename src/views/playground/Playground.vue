<template>
    <div>
        <TodoList></TodoList>
        <div>
            <el-card>
                <template #header>
                    <div class="card-header">
                        <Icon icon="carbon:edit" class="inline-block text-green-400"></Icon>
                        <span class="font-medium">
                            文本编辑器
                        </span>
                    </div>
                </template>
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                    :mode="mode" />
                <Editor style="height: 500px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig"
                    :mode="mode" @onCreated="handleCreated" />
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { renderIcon } from "@/utils/tool";


const mode = "default";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref("<p>Hello World</p>");

const toolbarConfig: any = { excludeKeys: "fullScreen" };
const editorConfig = { placeholder: "请输入内容..." };
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});
const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例
};
</script>

<style scoped>
</style>