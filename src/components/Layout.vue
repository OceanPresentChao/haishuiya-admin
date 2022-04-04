<!--
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-15 10:47:45
-->
<template>
    <div class="body-box">
        <el-container>
            <el-aside>
                <LeftMenu />
            </el-aside>
            <el-container>
                <el-header>
                    <HeadNav />
                </el-header>
                <el-main>
                    <Content />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import LeftMenu from './LeftMenu.vue';
import Content from './Content.vue';
import HeadNav from './HeadNav.vue';


</script>
<style lang="css">
</style>