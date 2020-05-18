<template>
    <div class="content">
        <div v-if="test.name!==undefined"><h3>{{test.name}}</h3></div>
        <div v-if="test.id!==undefined">创建于{{TimeStamp.toLocaleString()}}</div>
        <StatePane v-model="state" :is-runned="isRunned" :uuid="uuid" ref="StatePane"/>
        <br>
        <div class="input-content" v-if="!isRunned">
            <div class="text-label"><label for="DURATION" class="label-body">指定运行时长</label></div>
            <input class="text-input" type="number" v-model="duration" id="DURATION">
            <button class="start-btn" :disabled="state!=='stopped'" @click="start">开始运行</button>
        </div>
        <button class="stop-btn" :disabled="state==='stopped'||state==='loading'" @click="stop">停止</button>
    </div>
</template>

<script>
    import ParseDateFromUUID from '../tools/ParseDateFromUUID'
    import axios from 'axios'
    import StatePane from "@/components/TestPage/StatePane";

    export default {
        name: "ControllerPane",
        components: {StatePane},
        props: {
            uuid: String,
        },
        data() {
            return {test: {}, duration: 30, state: "loading"}
        },
        computed: {
            TimeStamp() {
                return ParseDateFromUUID(this.test.id);
            },
            /**
             * @return {boolean}
             */
            isRunned() {
                return (this.test.jtlpath !== undefined && this.test.jtlpath !== null)
                    || (this.test.logpath !== undefined && this.test.logpath !== null)
            },
        },
        methods: {
            refresh() {
                this.loading = true;
                axios.get("/api/getTask/" + this.uuid).then((response) => {
                    this.test = response.data;
                    this.loading = false;
                    this.$refs.StatePane.refresh();
                }).catch((e) => {
                    alert("错误：" + e.toString());
                    this.$router.push("/TestsPage");
                })
            },
            start() {
                this.operate('/api/Task/start/', {params: {duration: this.duration * 60 * 1e9}})
            },
            stop() {
                this.operate('/api/Task/stop/', {})
            },
            operate(URL, opt) {
                axios.get(URL + this.test.id, opt).then((response) => {
                    let ok = response.data.ok;
                    if (ok !== undefined && (ok === 'true' || ok === true)) {
                        return this.refresh();
                    }
                    if (response.data.message !== undefined) {
                        alert(response.data.message)
                    } else {
                        alert("错误：" + response.toString())
                    }
                    this.refresh();
                }).catch((e) => {
                    alert(e);
                    this.refresh()
                });
            }
        },
        created() {
            this.refresh();
        }
    }
</script>

<style scoped>
    .content {
        text-align: center;
        width: 400px;
        margin: auto 5px;
    }

    .input-content {
        text-align: center;
    }

    .text-label {
        width: 144px;
        display: inline;
        text-align: right;
        float: left;
    }

    .label-body {
        font-size: 2.4rem;
        font-weight: 300;
    }

    .start-btn {
        width: 144px;
        float: right;
    }

    .text-input {
        display: inline;
        width: 100px;
    }

    .stop-btn{
        width: 400px;
    }
</style>