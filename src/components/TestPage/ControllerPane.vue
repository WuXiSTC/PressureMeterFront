<template>
    <div>
        <div>名称：{{test.name}}</div>
        <div>创建时间：{{TimeStamp.toString()}}</div>
        <div>
            <div v-if="state==='running'">运行中</div>
            <div v-if="state==='queueing'">排队中</div>
            <div v-if="state==='stopped'">{{isRunned?'已完成':'未运行'}}</div>
            <div v-if="state==='loading'">加载中</div>
            <div v-if="state==='errored'">错误</div>
        </div>
        <div v-if="!isRunned">
            <label>
                运行时长：<input type="number" v-model="duration">分钟
            </label>
            <button :disabled="state!=='stopped'" @click="start">启动</button>
        </div>
        <button :disabled="state==='stopped'||state==='loading'" @click="stop">停止</button>
        <button :disabled="state==='loading'" @click="refresh">刷新</button>
    </div>
</template>

<script>
    import ParseDateFromUUID from '../tools/ParseDateFromUUID'
    import axios from 'axios'

    export default {
        name: "ControllerPane",
        props: {
            test: Object,
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
            }
        },
        data() {
            return {state: "loading", duration: 30}
        },
        methods: {
            refresh() {
                this.state = 'loading';
                axios.get('/api/Task/getState/' + this.test.id).then((response) => {
                    let stateCode = response.data.stateCode;
                    if (stateCode === undefined || parseInt(stateCode) === -1) {
                        this.state = 'errored';
                        alert("错误：任务不存在");
                        return this.$router.push("/TestsPage")
                    }
                    this.state = ['queueing', 'running', 'stopped'][parseInt(stateCode)]
                }).catch((e) => {
                    alert(e);
                    this.state = 'errored'
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