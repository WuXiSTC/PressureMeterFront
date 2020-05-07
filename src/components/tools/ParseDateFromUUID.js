module.exports = function (uuid_str) {
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
};