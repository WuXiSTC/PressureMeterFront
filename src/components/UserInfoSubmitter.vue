<template>
    <div>
        <UserInfo ref="UserInfo"/>
        <transition name="button">
            <button @click="Submit()" v-if="!waiting">{{ buttonName }}</button>
        </transition>
        <transition name="waiting">
            <div ref="waiting" v-if="waiting">等待中</div>
        </transition>
    </div>
</template>

<script>
    import UserInfo from "@/components/UserInfo";

    export default {
        name: "UserInfoSubmitter",
        components: {UserInfo},
        props: {
            buttonName: String,//提交按钮的名称
            verify: Function,//用于提交验证的函数，返回true/false
            received: Function,//当提交成功时调用，接收verify返回的true/false
            rejected: Function,//当提交失败时调用
            errorred: Function,//当提交出错时调用
        },
        methods: {
            Submit() {
                let ID = this.$refs.UserInfo.$data.ID;//取ID
                let PASS = this.$refs.UserInfo.$data.PASS;//取PASS
                this.$data.waiting = true;//开始等待
                this.$props.verify(ID, PASS).then((result) => {
                    this.$data.waiting = false;//完成时结束等待
                    this.$props.received(result);//并调用接收完成函数
                }).catch((e) => {
                    this.$data.waiting = false;//出错时结束等待
                    this.$props.errorred(e)//并调用出错处理函数
                })
            }
        },
        data: function () {
            return {
                waiting: false,
            };
        }
    }
</script>

<style scoped>
    .waiting-enter-active, .waiting-leave-active {
        transition: opacity .5s;
    }

    .waiting-enter, .waiting-leave-to {
        opacity: 0;
    }
</style>