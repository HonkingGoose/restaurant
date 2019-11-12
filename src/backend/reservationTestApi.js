let ReservationMaker = require('./reservationmaker.js')
ReservationMaker = new ReservationMaker();

// dateString: dd-mm-yyyy
// timeString: hh:mm
function createNewReservation(dateString, timeString) {
    const jsDate = new Date(dateString);
    jsDate.setHours(Number(timeString.substring(0, 2)), timeString.substring(3))
    jsDate.setHours(jsDate.getHours() + 1)
}

createNewReservation('2019-11-20', '17:45');
