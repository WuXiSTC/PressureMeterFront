<template>
    <div class="container">
        <div class="graph">
            <iframe v-if="!loading" ref="iframe"
                    :src="'/atlas/index.html#'+JSON.stringify(graph)"
                    title="连接图"
                    width="100%" height="100%"></iframe>
        </div>
        <div class="node-info">
            <button style="width: 100%" :disabled="loading" @click="refresh">刷新</button>
            <NodeInfo :data="node"/>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import NodeInfo from "@/components/AdminOnly/NodeInfo";

    export default {
        name: "Graph",
        components: {NodeInfo},
        data() {
            return {
                loading: true,
                graph: {},
                node: {},
                tests: []
            }
        },
        methods: {
            refresh() {
                this.loading = true;
                axios.get("/api/getGraph").then((response) => {
                    this.graph = response.data;
                    this.loading = false;
                }).catch((e) => {
                    alert("错误：" + e.toString());
                    this.loading = false;
                })
            }
        },
        created() {
            this.refresh();
            window.addEventListener('message', (e) => {
                if (e.data.S2SInfo !== undefined || e.data.ClientInfo !== undefined)
                    this.node = e.data;
            }, false)
        }
    }
</script>

<style scoped>
    .container {
        width: 100%;
    }

    .graph {
        width: 65%;
        min-width: 400px;
        height: 600px;
        display: inline-block;
        float: left;
    }

    .node-info {
        width: 30%;
        min-width: 300px;
        height: 600px;
        display: inline-block;
        padding: 5px;
        float: right;
    }
</style>