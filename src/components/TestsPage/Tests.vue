<template>
    <div>
        <div v-if="state==='loading'">加载中</div>
        <button @click="refresh" :disabled="state==='loading'">刷新</button>
        <div v-if="state==='ok'">
            <div v-for="test of tests" :key="test">
                <Test :uuid="test[0]" :name="test[1]"/>
            </div>
        </div>
        <div v-if="state='error'">出错</div>
    </div>
</template>

<script>
    import Test from "@/components/TestsPage/Test";
    import axios from "axios"

    export default {
        name: "Tests",
        components: {Test},
        data() {
            return {tests: [], state: "loading"}
        },
        created() {
            this.methods.refresh();
        },
        methods: {
            refresh() {
                this.state = "loading";
                axios.get("/api/getTasks").then((response) => {
                    this.state = "ok";
                    this.tests = JSON.parse(response.data);
                }).catch((e) => {
                    this.state = "error";
                    console.log(e)
                })
            }
        }
    }
</script>

<style scoped>

</style>