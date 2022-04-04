<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 10:47:45
-->
<template>
    <el-container>
        <LeftMenu />
        <el-container>
            <el-header style="display:flex;align-items: center;" height="4rem">
                <HeadNav></HeadNav>
            </el-header>
            <el-main style="padding-top: 0;">
                <Content />
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
</script>
<style scoped>
html,
body {
    overflow: hidden;
}
</style>