<template>
    <div>
        运行中的任务
        <div v-for="(task,id) in tasks" :key="id">
            <router-link :to="'/TestPage/' + task.ID">
                <div>
                    <span :title="JSON.stringify(task)">{{task.ID}}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tasks",
        props: {
            tasks: Object
        }
    }
</script>

<style scoped>

</style>