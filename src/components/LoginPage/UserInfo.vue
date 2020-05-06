<template>
    <div>
        <label>
            用户名：
            <input v-model="ID" type="text" placeholder="用户名">
            <span v-if="IDValid">ok</span>
            密码：
            <input v-model="PASS" type="password" placeholder="密码">
            <span v-if="PASSValid">ok</span>
        </label>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data: function () {
            return {ID: "", PASS: ""}
        },
        computed: {
            /**
             * @return {boolean}
             */
            IDValid() {
                return Valid(this.$data.ID)
            },
            /**
             * @return {boolean}
             */
            PASSValid() {
                return Valid(this.$data.PASS)
            }
        }
    }

    /**
     * @return {boolean}
     */
    function Valid(str) {
        return str.length >= 6 && !RegExp(/[^A-Za-z0-9]/).test(str)
    }
</script>

<style scoped>

</style>