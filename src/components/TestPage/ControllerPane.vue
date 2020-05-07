<template>
    <div>
        <div v-if="test.name!==undefined">名称：{{test.name}}</div>
        <div v-if="test.id!==undefined">创建时间：{{TimeStamp.toString()}}</div>
        <StatePane v-model="state" :is-runned="isRunned" :uuid="uuid" ref="StatePane"/>
        <div v-if="!isRunned">
            <label>
                运行时长：<input type="number" v-model="duration">分钟
            </label>
            <button :disabled="state!=='stopped'" @click="start">启动</button>
        </div>
        <button :disabled="state==='stopped'||state==='loading'" @click="stop">停止</button>
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

</style>