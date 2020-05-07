<template>
    <div>
        <ControllerPane :uuid="uuid"/>
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

</style>