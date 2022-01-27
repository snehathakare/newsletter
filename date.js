
module.exports = getDate;
function getDate() {
    var today = new Date()
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var currentDay = days[today.getDay()];

    return currentDay
}