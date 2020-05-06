<template>
    <div class="user-info">
        <label>
            用户名：<input v-model="ID" type="text" placeholder="用户名">
            密码：<input v-model="PASS" type="password" placeholder="密码">
        </label>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data: function () {
            return {ID: "", PASS: ""}
        }
    }
</script>

<style scoped>

</style>