<template>
    <div>
        <div>{{title}}</div>
        <Tasks v-if="Object.keys(tasks).length>0" :tasks="tasks"/>
        <JsonViewer :value="info" :expand-depth=2
                    copyable boxed sort expanded/>
    </div>
</template>

<script>
    import 'vue-json-viewer/style.css'
    import JsonViewer from 'vue-json-viewer'
    import Tasks from "@/components/AdminOnly/Tasks";

    export default {
        name: "NodeInfo",
        components: {Tasks, JsonViewer},
        props: {
            data: Object
        },
        computed: {
            title() {
                if (this.data.S2SInfo !== undefined) {
                    return "测试主机：" + this.data.S2SInfo.ServerInfo.ServerID;
                }
                if (this.data.ClientInfo !== undefined) {
                    return "测试从机：" + this.data.ClientInfo.ClientID;
                }
                return "未知"
            },
            info() {
                if (this.data.S2SInfo !== undefined) {
                    return this.data.S2SInfo;
                }
                if (this.data.ClientInfo !== undefined) {
                    return this.data.ClientInfo;
                }
                return {}
            },
            tasks() {
                if (this.data.S2SInfo === undefined) return {};
                let tasks = {};
                let TaskList = this.data.S2SInfo.ServerInfo.AdditionalInfo.TaskList;
                if (TaskList === undefined) return tasks;
                TaskList = JSON.parse(TaskList);
                for (let id of TaskList.AllTasks) {
                    tasks[id] = {ID: id}
                }
                for (let id in TaskList.TaskStates) {
                    tasks[id] = TaskList.TaskStates[id];
                }
                return tasks;
            }
        }
    }
</script>

<style scoped>

</style>