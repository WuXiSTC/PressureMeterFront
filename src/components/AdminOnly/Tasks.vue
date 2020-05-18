<template>
    <div>
        运行中的任务
        <div v-for="(task,id) in tasks" :key="id">
            <router-link :to="'/TestPage/' + task.ID">
                <div>{{task.ID}}</div>
                <div>{{JSON.stringify(task)}}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tasks",
        props: {
            tasks: Array
        }
    }
</script>

<style scoped>

</style>