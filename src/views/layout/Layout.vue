<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 10:47:45
-->
<template>
    <el-container style="width: 100%;height:100%;">
        <LeftMenu></LeftMenu>
        <el-container>
            <el-header>
                <HeadNav></HeadNav>
            </el-header>
            <el-main style="padding-top: 0;">
                <Content></Content>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.el-header {
    display: flex;
    align-items: center;
}

.el-main {
    overflow-x: hidden;
}
</style>