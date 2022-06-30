<template>
    <div>
        <div id="he-plugin-simple"></div>
        <div v-is="'script'">
            WIDGET = {
            "CONFIG": {
            "modules": "01234",
            "background": "1",
            "tmpColor": "FFFFFF",
            "tmpSize": "16",
            "cityColor": "FFFFFF",
            "citySize": "16",
            "aqiColor": "FFFFFF",
            "aqiSize": "16",
            "weatherIconSize": "24",
            "alertIconSize": "18",
            "padding": "10px 10px 10px 10px",
            "shadow": "0",
            "language": "auto",
            "borderRadius": "10",
            "fixed": "false",
            "vertical": "center",
            "horizontal": "center",
            "key": "79e120b1853a4af49868369657b1a90a"
            }
            }
        </div>
        <div v-is="'script'" src="https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0"></div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>