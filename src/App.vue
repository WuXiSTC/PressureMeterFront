<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <LoginPage/>
        <TestsPage/>
    </div>
</template>

<script>
    import LoginPage from "@/components/LoginPage/LoginPage";
    import TestsPage from "@/components/TestsPage/TestsPage";

    export default {
        name: 'App',
        components: {
            TestsPage,
            LoginPage,
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
