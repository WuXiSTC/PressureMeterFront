<template>
    <div>
        <transition name="login">
            <div v-if="isLoginMode">
                <UserInfoSubmitter :button-name="'登录'"
                                   :verify="loginVerify"
                                   :received="received"
                                   :errored="errored"/>
                <button @click="SwitchToRegister">还未注册？点此注册↓</button>
            </div>
        </transition>

        <transition name="register">
            <div v-if="!isLoginMode">
                <button @click="SwitchToLogin">已有账户？点此登录↑</button>
                <UserInfoSubmitter :button-name="'注册'"
                                   :verify="registerVerify"
                                   :received="received"
                                   :errored="errored"/>
            </div>
        </transition>
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
                this.$data.isLoginMode = false;
            },
            SwitchToLogin() {
                this.$data.isLoginMode = true;
            }
        },
        data() {
            return {isLoginMode: true}
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
    .login-leave-active, .register-leave-active {
        transition: all .2s;
    }

    .login-enter-active, .register-enter-active {
        transition: all .2s ease .2s;
    }

    .login-enter, .login-leave-to {
        opacity: 0;
        transform: translateY(-10px) rotateX(-90deg);
    }

    .register-enter, .register-leave-to {
        opacity: 0;
        transform: translateY(10px) rotateX(90deg);
    }
</style>