<template>
    <div>
        <div>
            <div v-if="state==='running'">运行中</div>
            <div v-else-if="state==='queueing'">排队中</div>
            <div v-else-if="state==='stopped'">{{isRunned?'已完成':'未运行'}}</div>
            <div v-else-if="state==='loading'">加载中</div>
            <div v-else>错误</div>
        </div>
        <button :disabled="state==='loading'" @click="refresh">刷新</button>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "StatePane",
        model: {
            prop: 'value',
            event: 'stateChange'
        },
        props: {
            uuid: String,
            value: String,
            isRunned: Boolean,
        },
        data() {
            return {state: this.value}
        },
        methods: {
            refresh() {
                this.state = 'loading';
                this.$emit('stateChange', this.state);
                axios.get('/api/Task/getState/' + this.uuid).then((response) => {
                    let stateCode = response.data.stateCode;
                    if (stateCode === undefined || parseInt(stateCode) === -1) {
                        this.state = 'errored';
                        this.$emit('stateChange', this.state);
                        alert("错误：任务不存在");
                        return this.$router.push("/TestsPage")
                    }
                    this.state = ['queueing', 'running', 'stopped'][parseInt(stateCode)];
                    this.$emit('stateChange', this.state);
                }).catch((e) => {
                    alert("错误：" + e.toString());
                    this.state = 'errored';
                    this.$emit('stateChange', this.state);
                })
            }
        },
        created() {
            this.refresh()
        }
    }
</script>

<style scoped>

</style>