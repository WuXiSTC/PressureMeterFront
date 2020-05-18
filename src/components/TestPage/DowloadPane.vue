<template>
    <div class="content">
        <button class="btn" @click="download('jmx')">下载测试计划</button>
        <button class="btn" @click="download('jtl')">下载测试结果</button>
        <button class="btn" @click="download('log')">下载测试日志</button>
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
    .content {
        width: 420px;
        margin: 5px auto;
    }

    .btn {
        width: 136px;
        margin: auto 2px;
    }
</style>