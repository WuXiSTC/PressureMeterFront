<template>
    <div>
        <iframe v-if="!loading" ref="iframe"
                :src="'/atlas/index.html#'+JSON.stringify(graph)"
                title="连接图"
                width="800" height="600"></iframe>
        <NodeInfo :data="node"/>
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
                this.node = e.data;
            }, false)
        }
    }
</script>

<style scoped>

</style>