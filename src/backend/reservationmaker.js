const durationOfVisit = 180; // minutes

const SQLHandler = require('./sql.js')

module.exports = class ReservationMaker {
  constructor () {
    this.fetchTables();
    this.fetchReservations();
  }

  fetchTables() {
    this.tables = [
      new Table(3, 5),
      new Table(4, 5),
      new Table(5, 5),
      new Table(8, 5),
      new Table(10, 5),
      new Table(13, 5),
      new Table(20, 5)
    ]
  }

  // debug only
  createDate(dateString, timeString) {
    const jsDate = new Date(dateString);
    jsDate.setHours(Number(timeString.substring(0, 2)), timeString.substring(3))
    jsDate.setHours(jsDate.getHours() + 1)

    return jsDate;
  }

  fetchReservations() {
    this.reservations = [
      new Reservation(this.createDate('2019-11-20', '17:00'), [0, 3]),
      new Reservation(this.createDate('2019-11-20', '17:00'), [2, 4, 5]),
      new Reservation(this.createDate('2019-11-20', '17:00'), [1])
    ]
  }

  convertToEndDate(startDate) {
    let endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + durationOfVisit)

    return endDate;
  }

  checkOverlap(reservation, date) {
    const reservationStart = reservation.startDate.getTime()
    const reservationEnd = reservation.endDate.getTime()
    const dateStart = date.getTime()
    const dateEnd = this.convertToEndDate(date)

    return (dateStart >= reservationStart && dateStart < reservationEnd) || (dateEnd < reservationEnd && dateEnd >= reservationStart) ? true : false
  }

  reservationPossible(date, nrPeople) {
    const tablesClone = JSON.parse(JSON.stringify(this.tables))

    for (const reservation of this.reservations) {
      if (this.checkOverlap(reservation, date)) {
        
      }
    }
  }
}

class Table {
  constructor(id, capacity) {
    this.id = id;
    this.capacity = capacity;
  }
}

class Reservation {
  constructor(date, tables) {
    const endDate = new Date(date.getTime())
    endDate.setMinutes(endDate.getMinutes() + durationOfVisit)

    this.startDate = date
    this.endDate = endDate;
    this.tables = tables

    console.log(this.startDate)
    console.log(this.endDate)
  }
}