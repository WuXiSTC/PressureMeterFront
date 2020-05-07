<template>
    <div>
        <label>
            测试名称：<input type="text" v-model="name">
            <span v-if="!NameValid">not ok</span>
        </label>
        <label>
            测试计划：<input type="file" ref="jmx" @change="changeFile">
            <span v-if="!FileValid">not ok</span>
        </label>
        <button :disabled="loading||!(NameValid&&FileValid)" @click="upload">{{loading?'创建中':'创建测试'}}</button>
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
            return {loading: false, name: "", FileValid: false}
        },
        computed: {
            NameValid() {
                return this.name.length >= 6 && !RegExp(/[^A-Za-z0-9\u4e00-\u9fa5]/).test(this.name)
            }
        },
        methods: {
            changeFile(e) {
                let files = e.target.files;
                this.FileValid = files !== undefined && files.length >= 1 && files[0].name !== "";
            },
            upload() {
                this.loading = true;
                let jmx = this.$refs.jmx;
                let form = new FormData();
                form.append("jmx", jmx.files[0]);
                axios.post("/api/Task/new/" + this.name, form, {
                    headers: {"Content-Type": "multipart/form-data"}
                }).then(res => {
                    if (res.data.ok === true || res.data.ok === "true") {
                        this.name = "";
                        this.refresh();
                    } else {
                        alert("异常:" + res.data.message ? res.data.message : res.toString());
                    }
                    this.loading = false;
                }).catch((e) => {
                    this.loading = false;
                    alert(e);
                });
            }
        }
    }
</script>

<style scoped>

</style>