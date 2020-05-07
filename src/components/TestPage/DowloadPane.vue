<template>
    <div>
        <button @click="download('jmx')">下载测试计划</button>
        <button @click="download('jtl')">下载测试结果</button>
        <button @click="download('log')">下载测试日志</button>
    </div>
</template>

<script>
    import axios from 'axios'
    import fileDownload from 'js-file-download'

    export default {
        name: "DowloadPane",
        props: {
            uuid: String
        },
        methods: {
            download(type) {
                axios.get('api/Task/get/' + this.uuid + '/' + type,
                    {responseType: 'arraybuffer'}).then(res => {
                    fileDownload(res.data, this.uuid + '.' + type);
                })
            }
        }
    }
</script>

<style scoped>

</style>