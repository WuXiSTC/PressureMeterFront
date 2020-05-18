<template>
    <div class="test">
        <router-link :to="'/TestPage/' + uuid">
            <div class="content">
                <div class="name">{{name}}</div>
                <div class="date">创建于{{TimeStamp.toLocaleString()}}</div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import ParseDateFromUUID from '../tools/ParseDateFromUUID'

    export default {
        name: "Test",
        props: {
            uuid: String,
            name: String
        },
        data() {
            return {isLoaded: false}
        },
        computed: {
            TimeStamp() {
                return ParseDateFromUUID(this.uuid)
            }
        }
    }
</script>

<style scoped>
    .test {
        transition: all .5s;
        width: 400px;
        height: 30px;
    }

    .content {
        width: 400px;
        height: 25px;
        margin: 0 auto;
        border-radius: 4px;
        border: 1px solid #bbb;
    }

    .test:hover {
        transform: scale(1.1);
    }

    .name {
        display: inline-block;
        width: 90px;
        text-align: left;
        margin: auto 5px;
    }

    .date {
        display: inline-block;
        width: 290px;
        text-align: right;
        margin: auto 5px;
    }
</style>