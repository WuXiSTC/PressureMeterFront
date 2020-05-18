<template>
    <div class="content">
        <div class="input-content">
            <div class="text-label"><label for="ID" class="label-body">用户名</label></div>
            <input class="text-input" v-model="ID" type="text" placeholder="用户名" id="ID">
            <div class="ok"><img v-if="IDValid" height="30" alt="ok" src="../../assets/ok.svg"></div>
        </div>
        <div class="input-content">
            <div class="text-label"><label for="PASS" class="label-body">密码</label></div>
            <input class="text-input" v-model="PASS" type="password" placeholder="密码" id="PASS">
            <div class="ok"><img v-if="PASSValid" height="30" alt="ok" src="../../assets/ok.svg"></div>
        </div>
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
    .content, .input-content {
        width: 300px;
    }

    .input-content {
        text-align: center;
    }

    .text-label {
        width: 72px;
        display: inline;
        text-align: right;
        float: left;
    }

    .label-body {
        font-size: 2.4rem;
        font-weight: 300;
    }

    .ok {
        width: 30px;
        height: 30px;
        float: right;
    }

    .text-input {
        display: inline;
    }
</style>