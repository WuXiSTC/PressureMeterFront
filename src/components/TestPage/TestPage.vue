<template>
    <div style="text-align: center">
        <img width="200" alt="Vue logo" src="../../assets/logo.svg">
        <h5>测试控制面板</h5>
        <div class="pane-border">
            <div class="pane">
                <ControllerPane :uuid="uuid"/>
            </div>
        </div>
        <DowloadPane :uuid="uuid"/>
    </div>
</template>

<script>
    import ControllerPane from "@/components/TestPage/ControllerPane";
    import DowloadPane from "@/components/TestPage/DowloadPane";

    export default {
        name: "TestPage",
        components: {DowloadPane, ControllerPane},
        data() {
            return {
                uuid: this.$route.params.uuid,
            }
        },
    }
</script>

<style scoped>
    .pane-border {
        margin: 0 auto;
        width: 420px;
        border-radius: 4px;
        border: 1px solid #bbb;
    }

    .pane {
        margin: 0 auto;
        width: 400px;
    }
</style>