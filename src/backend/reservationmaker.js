const durationOfVisit = 180; // minutes

const SQLHandler = require('./sql.js')

module.exports = class ReservationMaker {
  constructor () {
    this.fetchTables();
    this.fetchReservations();
  }

  fetchTables() {
    this.tables = [
      new Table(3, 3),
      new Table(4, 6),
      new Table(5, 4),
      new Table(8, 7),
      new Table(10, 2),
      new Table(13, 3),
      new Table(20, 4)
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
      new Reservation(this.createDate('2019-11-20', '17:00'), [0, 3]),// tables 3 and 8
      new Reservation(this.createDate('2019-11-20', '16:00'), [2, 4, 5]),// tables 5, 10 and 13
      new Reservation(this.createDate('2019-11-20', '18:00'), [1])// table 4
    ]
  }

  convertToEndDate(startDate) {
    let endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + durationOfVisit)

    return endDate;
  }

  removeIndexesFromArray(array, indexes) {
    const workingArray = []
    for (let i = 0; i < array.length; i++) {
      if (!indexes.includes(i)) workingArray.push(array[i])
    }

    return workingArray;
  }

  pickTables(availableTables, nrPeople) {
    let totalSeatsAvailable = 0;
    for (const table of availableTables) {
      totalSeatsAvailable += table.capacity
    }

    if (totalSeatsAvailable >= nrPeople) {
      console.log("There is enough space")
    } else {
      console.log("Not enough space at this date + time!")
      return false
    }

    // attempt to find a perfect solution
    for (const table of availableTables) {
      if (table.capacity == nrPeople) {
        // solution found
      }
    }

    // find the most optimal alternative
    /*

      a => number of table seats wasted
      b => number of extra tables used (-min amount of tables necessary)

      c = abs((a * 2 + b) / b - 1)
      optimal solution is where c is as low as possible

    */

    return true
  }

  checkOverlap(reservation, date) {
    const reservationStart = reservation.startDate.getTime()
    const reservationEnd = reservation.endDate.getTime()
    const dateStart = date.getTime()
    const dateEnd = this.convertToEndDate(date)

    return (dateStart >= reservationStart && dateStart < reservationEnd) || (dateEnd < reservationEnd && dateEnd > reservationStart) ? true : false
  }

  reservationPossible(date, nrPeople) {
    var tablesClone = JSON.parse(JSON.stringify(this.tables))

    const tableIndexesToExclude = []
    for (const reservation of this.reservations) {
      if (this.checkOverlap(reservation, date)) {
        for (const tableIndex of reservation.tables) {
          tableIndexesToExclude.push(tableIndex)
        }
      }
    }

    tablesClone = this.removeIndexesFromArray(tablesClone, tableIndexesToExclude)

    if (this.pickTables(tablesClone, nrPeople)) {
      return true;
    }

    return false;
  }
}

class Table {
  constructor(id, capacity) {
    this.id = id;
    this.capacity = capacity;
  }

  static compare(table1, table2) {
    if (table1.capacity < table2.capacity) return -1
    if (table1.capacity > table2.capacity) return 1
    return 0
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