<template>
    <div>
        <label>
            测试名称：<input type="text" v-model="name">
            <span v-if="NameValid">not ok</span>
        </label>
        <label>
            测试计划：<input type="file" ref="jmx">
            <span v-if="FileValid">not ok</span>
        </label>
        <button :disabled="!NameValid&&!FileValid">{{loading?'创建中':'创建测试'}}</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "NewTest",
        props: {
            refresh: Function,
        },
        data() {
            return {loading: false, name: ""}
        },
        computed: {
            NameValid() {
                return this.name.length >= 6 && !RegExp(/[^A-Za-z0-9\u4e00-\u9fa5]/).test(this.name)
            },
            FileValid() {
                return this.$refs.jmx.files.length >= 1 && this.$refs.jmx.files[0].name !== "";
            }
        },
        methods: {
            upload() {
                this.loading = true;
                let jmx = this.$refs.jmx;
                let form = new FormData();
                form.append("jmx", jmx.files[0]);
                axios.post("/api/Task/new/" + this.name, form, {
                    headers: {"Content-Type": "multipart/form-data"}
                }).then(res => {
                    if (res.data.statusCode === 200) {
                        this.name = "";
                        this.refresh();
                    } else {
                        alert(res.data);
                    }
                    this.loading = false;
                }).catch(alert);
            }
        }
    }
</script>

<style scoped>

</style>