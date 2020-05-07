<template>
    <div>
        <div v-if="loading">加载中</div>
        <ControllerPane v-if="!loading" :test="test"/>
    </div>
</template>

<script>
    import ControllerPane from "@/components/TestPage/ControllerPane";
    import axios from 'axios'

    export default {
        name: "TestPage",
        components: {ControllerPane},
        data() {
            return {
                uuid: this.$route.params.uuid,
                test: {},
                loading: true
            }
        },
        methods: {
            refresh() {
                this.loading = true;
                axios.get("/api/getTask/" + this.uuid).then((response) => {
                    this.test = response.data;
                    this.loading = false;
                }).catch((e) => {
                    alert("错误：" + e.toString());
                    this.$router.push("/TestsPage");
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