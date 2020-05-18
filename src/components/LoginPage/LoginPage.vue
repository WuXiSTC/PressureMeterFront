<template>
    <div class="login-page">
        <img width="300" alt="Vue logo" src="../../assets/logo.svg">
        <h3>云压力测试系统</h3>
        <transition name="login" @after-leave="isRegisterMode=true">
            <div v-if="isLoginMode">
                <UserInfoSubmitter :button-name="'登录'"
                                   :verify="loginVerify"
                                   :received="loginReceived"
                                   :errored="errored"/>
                <button @click="isLoginMode=false">还未注册？点此注册→</button>
            </div>
        </transition>

        <transition name="register" @after-leave="isLoginMode=true">
            <div v-if="isRegisterMode">
                <UserInfoSubmitter :button-name="'注册'"
                                   :verify="registerVerify"
                                   :received="registerReceived"
                                   :errored="errored"/>
                <button @click="isRegisterMode=false">已有账户？点此登录→</button>
            </div>
        </transition>
    </div>
</template>

<script>
    import axios from "axios"
    import UserInfoSubmitter from "@/components/LoginPage/UserInfoSubmitter";

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
            loginReceived(ok) {
                if (ok === true || ok === "true") this.$router.push("/TestsPage");
                else alert("用户名或密码错误")
            },
            registerReceived(ok) {
                if (ok === true || ok === "true") {
                    alert("注册成功");
                    this.isRegisterMode = false;
                } else {
                    alert("用户名已存在")
                }
            },
            errored(e) {
                alert("出错：" + e);
            },
        },
        data() {
            return {isLoginMode: true, isRegisterMode: false}
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
        transition: all .2s;
    }

    .login-enter, .login-leave-to {
        opacity: 0;
        transform: rotateY(-90deg);
    }

    .register-enter, .register-leave-to {
        opacity: 0;
        transform: rotateY(90deg);
    }

    .login-page{
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>