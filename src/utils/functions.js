export function getStringDate(date) {
    var date = date || new Date();
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);

    return year + '' + month + '' + day;
}

export function getStringTime(time) {
    var time = time || new Date();
    var hour = ('0' + time.getHours()).slice(-2);
    var minute = ('0' + time.getMinutes()).slice(-2);
    var second = ('0' + time.getSeconds()).slice(-2);

    return hour + '' + minute + '' + second;
}

export function getThemeID() {
    return getStringDate(new Date());
}