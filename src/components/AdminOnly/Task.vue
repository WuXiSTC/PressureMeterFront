<template>
    <router-link :to="'/TestPage/' + task.ID">
        <div>{{task.ID}}</div>
        <div>{{task.Duration}}</div>
        <div>{{task.StateCode}}</div>
        <div>{{task.StartTime}}</div>
    </router-link>
</template>

<script>
    export default {
        name: "Task",
        props: {
            task: Object
        }
    }
</script>

<style scoped>

</style>