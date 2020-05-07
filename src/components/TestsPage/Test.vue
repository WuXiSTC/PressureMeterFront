<template>
    <div @click="detail(uuid)" class="test">
        <span>名称：{{name}}</span>
        <span>创建日期：{{TimeStamp.toString()}}</span>
    </div>
</template>

<script>
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
                return get_date_obj(this.uuid)
            }
        },
        methods: {
            detail(ID) {
                //TODO:跳转
                console.log(ID)
            }
        }
    }


    function get_date_obj(uuid_str) {
        function get_time_int(uuid_str) {
            const uuid_arr = uuid_str.split('-'),
                time_str = [
                    uuid_arr[2].substring(1),
                    uuid_arr[1],
                    uuid_arr[0]
                ].join('');
            return parseInt(time_str, 16);
        }

        const int_time = get_time_int(uuid_str) - 122192928000000000,
            int_millisec = Math.floor(int_time / 10000);
        return new Date(int_millisec);
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