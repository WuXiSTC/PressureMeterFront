<template>
    <div class="Demo">
        <div class="Before">
            <UserInfoSubmitter :button-name="'登录'"
                               :verify="loginVerify"
                               :received="received"
                               :errored="errored"/>
            <button @click="SwitchToRegister">还未注册？点此注册-></button>
        </div>
        <div class="After">
            <UserInfoSubmitter class="After"
                               :button-name="'注册'"
                               :verify="registerVerify"
                               :received="received"
                               :errored="errored"/>
            <button @click="SwitchToLogin">已有账户？点此登录-></button>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import UserInfoSubmitter from "@/components/UserInfoSubmitter";

    export default {
        name: "Login",
        components: {UserInfoSubmitter},
        methods: {
            loginVerify(ID, PASS) {
                return Verify(ID, PASS, "/api/login");
            },
            registerVerify(ID, PASS) {
                return Verify(ID, PASS, "/api/register");
            },
            received(ok) {
                if (ok) this.$router.push("tasks")
            },
            errored(e) {
                alert("出错：" + e);
            },
            SwitchToRegister() {

            },
            SwitchToLogin() {

            }
        }
    }

    function Verify(ID, PASS, URL) {
        return new Promise((resolve, reject) => {
            axios.get(URL, {params: {ID, PASS}})
                .then((response) => {
                    if (response.data === "false" || !response.data) resolve(false);
                    resolve(true);
                }).catch(reject)
        });
    }
</script>

<style scoped>
    .Demo {
        width: 533px;
        height: 300px;
        margin-top: 300px;
        margin-left: 500px;
        position: relative;
        perspective: 800px;
        box-sizing: border-box;


    }

    .Before {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        background-position: center center;
        backface-visibility: hidden;
        transition: 3s;
        border: 1px solid yellow;

    }

    .After {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        background-color: #fff;
        text-indent: 2em;
        transform: rotateY(-180deg);
        backface-visibility: hidden;
        transition: 3s;
        border: 1px solid yellow;
    }

    .Demo:hover .Before {
        transform: rotateY(180deg);
    }

    .Demo:hover .After {
        transform: rotateY(0deg);
    }
</style>