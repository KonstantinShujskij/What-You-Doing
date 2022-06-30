export function formatDate(date) {
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0');
}

export function formatDateMonth(date) {
    return  String(date.getDate() + 1).padStart(2, '0') + "." + String(date.getMonth() + 1).padStart(2, '0')
}

export function isNextDay(date, oldDate) {
    const millisecondsOfDay = 1000 * 60 * 60 * 24
    return (date.getDay() !== oldDate.getDay() || date.getTime() + millisecondsOfDay <= oldDate.getTime())
} 