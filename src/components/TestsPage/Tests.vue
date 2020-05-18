<template>
    <div class="content">
        <button class="refresh-btn" @click="refresh" :disabled="state==='loading'">刷新</button>
        <div v-if="state==='loading'"><h5>加载中</h5></div>
        <div v-if="state==='ok'">
            <div v-for="test of tests" :key="test[0]">
                <Test :uuid="test[0]" :name="test[1]"/>
            </div>
        </div>
        <div v-if="state==='error'"><h5>出错</h5></div>
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
            this.refresh();
        },
        methods: {
            refresh() {
                this.state = "loading";
                axios.get("/api/getTasks").then((response) => {
                    this.state = "ok";
                    this.tests = response.data;
                }).catch((e) => {
                    this.state = "error";
                    console.log(e)
                })
            }
        }
    }
</script>

<style scoped>
    .content{
        width: 400px;
        text-align: center;
    }

    .refresh-btn{
        width: 300px;
        letter-spacing: 20px;
    }

</style>