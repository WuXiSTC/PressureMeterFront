<template>
    <div>
        <NewTest :refresh="refresh"/>
        <Tests ref="tests"/>
    </div>
</template>

<script>
    import NewTest from "@/components/TestsPage/NewTest";
    import Tests from "@/components/TestsPage/Tests";

    export default {
        name: "TestsPage",
        components: {Tests, NewTest},
        methods: {
            refresh() {
                this.$refs.tests.refresh()
            }
        }

    }
</script>

<style scoped>

</style>