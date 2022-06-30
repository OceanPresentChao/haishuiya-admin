<template>
    <el-container>
        <el-header>
            <div style="display: flex;column-gap: 1.5rem;">
                <el-input v-model="inputText" placeholder="请输入任务" size="large" clearable @keydown.enter="handleClick">
                </el-input>
                <el-button type="primary" text style="flex: none;" :circle="true" :disabled="!inputText.trim().length"
                    @click="handleClick">
                    <Icon icon="carbon:cloud-upload" class="todo-icon text-red-400"></Icon>
                </el-button>
            </div>
        </el-header>
        <el-main>
            <transition-group name="list">
                <el-card v-for="(item, index) in todoList" :key="item._id" shadow="hover"
                    :body-style="{ padding: '8px' }">
                    <div style="display: flex;">
                        <div>
                            <el-button type="danger" text size="default" @click="handleDel(item._id)">
                                <Icon icon="ep:delete" class="todo-icon"></Icon>
                            </el-button>
                        </div>
                        <div style="display: flex;flex-direction: column;margin-left: 2rem;">
                            <div>{{ item.title }}</div>
                            <div>Tasks</div>
                        </div>
                        <div style="margin-left: auto; flex:none;margin-right: 1rem;">
                            <el-button class="button" text :disabled="item.isFinished" @click="handleAC(item._id)">
                                <Icon icon="carbon:checkmark" class="todo-icon"></Icon>
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </transition-group>
        </el-main>
        <el-main v-if="ac_todoList.length">
            <div style="text-align: left;padding-bottom: 8px;">
                <Icon icon="akar-icons:arrow-up-thick" class="todo-icon inline-block text-cyan-300"></Icon>
                已完成：{{ ac_todoList.length }}
            </div>
            <transition-group name="list">
                <el-card v-for="(item, index) in ac_todoList" :key="item._id" shadow="hover"
                    :body-style="{ padding: '8px' }">
                    <div style="display: flex;">
                        <div>
                            <el-button type="danger" text size="default" @click="handleDelAC(item._id)"
                                style="cursor:pointer">
                                <Icon icon="ep:delete" class="todo-icon"></Icon>
                            </el-button>
                        </div>
                        <div style="display: flex;flex-direction: column;margin-left: 2rem;">
                            <div>{{ item.title }}</div>
                            <div>Tasks</div>
                        </div>
                        <div style="margin-left: auto; flex:none;margin-right: 1rem;">
                            <el-button class="button" type="text" @click="handleRedo(item._id)">
                                <Icon icon="ep:finished" class="todo-icon"></Icon>
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </transition-group>
        </el-main>
    </el-container>
</template>
<script setup lang="ts">

interface Todo {
    title: string,
    isFinished: boolean,
    _id: string
}
const inputText = ref('');
const todoList = ref<Todo[]>([]);
const ac_todoList = ref<Todo[]>([]);
useLocalStorage('todoList', todoList);
useLocalStorage('ac_todoList', ac_todoList);
function handleClick(): void {
    const newTodo: Todo = {
        title: inputText.value.trim(),
        isFinished: false,
        _id: new Date().toString()
    }
    todoList.value!.push(newTodo);
    inputText.value = "";
}

function handleDel(id: string): void {
    todoList.value.forEach((item, index) => {
        if (item._id !== id) { return; }
        todoList.value.splice(index, 1);
    })
}

function handleAC(id: string): void {
    todoList.value.forEach((item, index) => {
        if (item._id !== id) { return; }
        item.isFinished = true;
        ac_todoList.value.push(item);
        todoList.value.splice(index, 1);
    })
}

function handleDelAC(id: string): void {
    ac_todoList.value.forEach((item, index) => {
        if (item._id !== id) { return; }
        ac_todoList.value.splice(index, 1);
    })
}

function handleRedo(id: string): void {
    ac_todoList.value.forEach((item, index) => {
        if (item._id !== id) { return; }
        item.isFinished = false;

        todoList.value.push(item);
        ac_todoList.value.splice(index, 1);
    })
}

</script>
<style lang="css">
.todo-icon {
    width: 1.5rem;
    height: 1.5rem;
}

.list-move {
    transition: transform 0.3s ease;
}

.list-item {
    display: inline-block;
    margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
    transition: all .3s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>