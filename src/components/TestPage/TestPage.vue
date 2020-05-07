<template>
    <div>
        <ControllerPane :uuid="uuid"/>
    </div>
</template>

<script>
    import ControllerPane from "@/components/TestPage/ControllerPane";

    export default {
        name: "TestPage",
        components: {ControllerPane},
        data() {
            return {
                uuid: this.$route.params.uuid,
            }
        },
    }
</script>

<style scoped>

</style>