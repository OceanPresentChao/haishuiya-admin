<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 13:12:23
-->
<template>
    <div style="margin-bottom: 2rem;">
        <el-container>
            <el-header class="header">
                <!-- Header content -->
                <img src="@/assets/mmexport1650800669816.jpg" alt="logo">
                <span>吉林大学还睡呀</span>
            </el-header>
            <el-main class="wrapper">
                <!-- Main content -->
                <div style="font-size: 2rem;border-left: solid 5px orange;padding-left: 5px;font-weight: 600;"
                    class="content">关于我们</div>
                <el-divider direction="horizontal" content-position="left"></el-divider>

                <div class="content">
                    <p>温水让你忘记前行，冷水帮你铭记梦想。吉林大学还睡呀是全国高校首款正能量平台。吉林大学“还睡呀”温暖你的努力，冻结你的颓废。</p>
                    <p></p>
                    <p>虽然青春容易苍老</p>
                    <p></p>
                    <p>但我们会越来越好</p>
                    <p></p>
                    <p>我们一直希望予你漫漫长夜中点点星光</p>
                    <p></p>
                    <p>我们一直希望能陪你们度过或许漫长</p>
                    <p></p>
                    <p>但转瞬即逝的青春岁月</p>
                    <p></p>
                    <p>我们也许不能为你未来护航</p>
                    <p></p>
                    <p>但我们愿为你制一件温柔的盔甲</p>
                    <p></p>
                    <p>来抵御世俗的冷箭</p>
                </div>
            </el-main>
            <el-main style="margin-top: 1rem;">
                <!-- Main content -->
                <div class="link-box">
                    <div style="margin-bottom: 1rem;font-size: 1.5rem;">开发者</div>
                    <div class="detail">
                        <div style="color:grey;font-size: larger;">潮海波</div>
                        <div>邮箱:oceanpresent@163.com</div>
                        <div>QQ:1255342403</div>
                        <div><a href="https://github.com/OceanPresentChao">GitHub:OceanPresentChao</a></div>
                    </div>
                </div>
            </el-main>

        </el-container>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="css">
img {
    height: 100%;
    width: auto;
}

.wrapper {
    background-color: rgb(249, 243, 235);
}

.header {
    display: flex;
    font-size: 2.5rem;
    line-height: 5rem;
    height: 5rem;
    padding: 0;
    background-color: #FDD93B;
}

.header span {
    display: inline-block;
    margin-left: 1rem;
}

.el-main {
    padding: 0;
}

.content {
    line-height: 3rem;
    text-align: left;
    max-width: 70%;
    margin: 0 auto;
    margin-top: 1rem;
}

.content p {
    white-space: pre-wrap;
    min-height: 16px;
    font-size: 1.5rem;
}

.link-box {
    max-width: 70%;
    margin: 0 auto;
    text-align: left;
}

.detail div {
    margin-bottom: 0.25rem;
}

.detail a {
    color: gray
}

.detail a:hover {
    color: inherit
}
</style>