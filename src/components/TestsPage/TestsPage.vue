<template>
    <div class="content">
        <transition name="new" @after-leave="isTasksMode=true">
            <div v-if="isNewMode">
                <NewTest :refresh="refresh"/>
                <button @click="isNewMode=false" class="switch">查看测试↓</button>
            </div>
        </transition>
        <transition name="tests" @after-leave="isNewMode=true">
            <div v-if="isTasksMode">
                <button @click="isTasksMode=false" class="switch">创建测试↑</button>
                <h3>测试列表</h3>
                <Tests ref="tests"/>
            </div>
        </transition>
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
                this.isNewMode = false;
            }
        },
        data() {
            return {isNewMode: false, isTasksMode: true}
        }
    }
</script>

<style scoped>
    .new-leave-active, .tests-leave-active {
        transition: all .2s;
    }

    .new-enter-active, .tests-enter-active {
        transition: all .2s;
    }

    .new-enter, .new-leave-to {
        opacity: 0;
        transform: translateY(10px);
    }

    .tests-enter, .tests-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }

    .content {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }

    .switch {
        width: 400px;
    }
</style>