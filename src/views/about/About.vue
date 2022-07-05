<template>
    <div>
        <div class=" bg-blue-500 text-center py-14 text-white">
            <h1 class="text-4xl">ABOUT US</h1>
            <div class="text-xl">
                <router-link to="/">Home</router-link>
                <span>·</span>
                <router-link to="/about">About us</router-link>
            </div>
        </div>

        <div class="flex mt-24">
            <img class="flex-none rounded-l-none rounded-r-3xl" style="max-width: 45%;height:auto;"
                src="@/assets/mmexport1650800669816.jpg" />
            <div class="ml-5 my-auto text-xl">
                <h1 class="text-3xl mb-5 border-b-2">LEARN ABOUT US</h1>
                <p>温水让你忘记前行，冷水帮你铭记梦想。吉林大学还睡呀是全国高校首款正能量平台。吉林大学“还睡呀”温暖你的努力，冻结你的颓废。</p>

                <p>虽然青春容易苍老</p>

                <p>但我们会越来越好</p>

                <p>我们一直希望予你漫漫长夜中点点星光</p>

                <p>我们一直希望能陪你们度过或许漫长</p>

                <p>但转瞬即逝的青春岁月</p>

                <p>我们也许不能为你未来护航</p>

                <p>但我们愿为你制一件温柔的盔甲</p>

                <p>来抵御世俗的冷箭</p>
                <div class="my-5">
                    <button class="bg-blue-400 rounded-lg p-1 text-white">
                        <a href="https://github.com/OceanPresentChao/CarillionBookstore-admin" target="_blank">
                            <Icon class="inline-block w-5 h-5" icon="carbon:email"></Icon>
                            <span>Click Me</span>
                        </a>
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-24">
            <div class="text-center">
                <h1 class="text-3xl border-b-red-300 border-b-2">
                    Our Story
                </h1>
                <p class="text-xl mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium ornare velit non
                </p>
            </div>
            <div class="mt-3 mx-36">
                <el-timeline class="text-xl">
                    <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card>
                            <h4>Update Github template</h4>
                            <p>Tom committed 2018/4/12 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card>
                            <h4>Update Github template</h4>
                            <p>Tom committed 2018/4/3 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>Update Github template</h4>
                            <p>Tom committed 2018/4/2 20:46</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>

        <div class="my-24">
            <div class="text-center">
                <h1 class="text-3xl border-b-yellow-300 border-b-2">
                    Our Team
                </h1>
                <p class="text-xl mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium ornare velit non
                </p>
            </div>
            <div class="flex justify-around mt-5">
                <template v-for="m in memberShip" :key="m.name">
                    <div class="round-t member-item">
                        <img :src="m.avatar" class="inline-block rounded-full member-avatar">
                        <div class="text-center">
                            <h1 class="text-2xl mt-2">{{ m.name }}</h1>
                            <p class="text-lg">{{ m.role }}</p>
                        </div>
                        <div class="member-hover round-t">
                            <Icon icon="carbon:logo-github" class="member-icon"></Icon>
                            <Icon icon="cib:tencent-qq" class="member-icon"></Icon>
                            <Icon icon="carbon:logo-wechat" class="member-icon"> </Icon>
                            <Icon icon="carbon:logo-twitter" class="member-icon"> </Icon>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const memberShip = [
    {
        name: '潮海波',
        role: '相信你那绯色樱云般的心思情愫，也一定被心间的人感知着。',
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=1255342403&s=640"
    }
]
</script>

<style scoped>
.round-t {
    border-top-left-radius: 40%;
    border-top-right-radius: 40%;
}

.member-item {
    position: relative;
    margin-bottom: 30px;
    padding: 30px;
    background: rgba(0, 0, 0, .05);
    margin: 0 1rem;
    width: 20%;
}

.member-hover {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 30px 20px;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    background: rgba(79, 132, 196, .92);
    opacity: 0;
    transition: .5s;
}

.member-item:hover .member-hover {
    opacity: 1;
}

.member-icon {
    width: 1.5rem;
    height: 1.5rem;
}

.member-avatar {
    width: 100%;
    height: auto;
}
</style>