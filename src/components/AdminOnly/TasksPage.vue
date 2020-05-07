<template>
    <div>
        当前运行中的任务列表
        <Tests/>
    </div>
</template>

<script>
    import Tests from "@/components/TestsPage/Tests";

    export default {
        name: "Tasks",
        components: {Tests}
    }
</script>

<style scoped>

</style>