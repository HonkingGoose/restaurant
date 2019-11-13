let ReservationMaker = require('./reservationmaker.js')
ReservationMaker = new ReservationMaker();

// dateString: dd-mm-yyyy
// timeString: hh:mm
function createNewReservation(dateString, timeString, nrPeople) {
    const date = ReservationMaker.createDate(dateString, timeString)

    console.log(ReservationMaker.reservationPossible(date, nrPeople))
}

createNewReservation('2019-11-20', '10:00', 5);
