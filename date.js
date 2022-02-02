
exports.getDate = function () {
    var today = new Date()
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var currentDay = days[today.getDay()];

    return currentDay
}