import {START_DATE} from './constants'

export function getStringDate(param) {
    const date = param || new Date()
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)

    return year + '' + month + '' + day
}

export function getStringTime(param) {
    const time = param || new Date()
    const hour = ('0' + time.getHours()).slice(-2)
    const minute = ('0' + time.getMinutes()).slice(-2)
    const second = ('0' + time.getSeconds()).slice(-2)

    return hour + '' + minute + '' + second
}

export function getDateFromString(string) {
    const year = parseInt(string.substr(0, 4))
    const month = parseInt(string.substr(4, 2))
    const day = parseInt(string.substr(6, 2))

    return new Date(year, month, day)
}

export function getDateDiffInDay(start, end) {
    const startDate = getDateFromString(start)
    const endDate = getDateFromString(end)
    const msInOneDay = (1000 * 60 * 60 * 24)

    return ((endDate - startDate) / msInOneDay) + 1
}

export function getThemeID() {
    return getStringDate(new Date());
}

export function getThemeIDFrom(diff) {
    const now = new Date()
    now.setDate(now.getDate() - diff)

    return getStringDate(now)
}

export function getThemeDay(now) {
    return getDateDiffInDay(START_DATE, now)
}