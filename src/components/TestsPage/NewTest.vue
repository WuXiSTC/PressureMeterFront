<template>
    <div class="content">
        <img width="200" alt="Vue logo" src="../../assets/logo.svg">
        <h3>创建测试</h3>
        <div class="input-content">
            <div class="text-label"><label for="NAME" class="label-body">测试名称</label></div>
            <input class="text-input" type="text" v-model="name" id="NAME">
            <div class="ok"><img v-if="NameValid" height="30" alt="ok" src="../../assets/ok.svg"></div>
        </div>
        <div class="input-content">
            <div class="text-label"><label for="FILE" class="label-body">测试计划</label></div>
            <input class="text-input" type="file" ref="jmx" @change="changeFile" id="FILE">
            <div class="ok"><img v-if="FileValid" height="30" alt="ok" src="../../assets/ok.svg"></div>
        </div>
        <button :disabled="loading||!(NameValid&&FileValid)" @click="upload"
                class="submit-btn">{{loading?'创建中':'创建'}}
        </button>
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
    .content, .input-content {
        width: 400px;
        text-align: center;
    }

    .input-content {
        text-align: center;
    }

    .text-label {
        width: 96px;
        display: inline;
        text-align: right;
        float: left;
    }

    .label-body {
        font-size: 2.4rem;
        font-weight: 300;
    }

    .ok {
        width: 96px;
        height: 30px;
        float: right;
        text-align: left;
    }

    .text-input {
        display: inline;
        width: 184px;
    }

    .submit-btn {
        width: 400px;
        font-size: 2.4rem;
        font-weight: 300;
        letter-spacing: 20px;
    }
</style>