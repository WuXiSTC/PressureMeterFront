<template>
    <div @click="detail(uuid)" class="test">
        <span>名称：{{name}}</span>
        <span>创建日期：{{TimeStamp.toString()}}</span>
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
        },
        methods: {
            detail(ID) {
                //TODO:跳转
                console.log(ID)
            }
        }
    }
</script>

<style scoped>
    .test {
        transition: all .5s;
    }

    .test:hover {
        transform: translateX(10px);
    }
</style>