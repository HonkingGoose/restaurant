"use strict"

class Reservation {
  constructor(id, guestId, date, duration, hidePriceOfMenu, numberOfGuests) {
    this.id = id;
    this.guestId = guestId;
    this.date = date;
    this.duration = duration;
    this.hidePriceOfMenu = hidePriceOfMenu;
    this.numberOfGuests = numberOfGuests;
  }
}

const reservationBook = [];

const id = process.argv[2];
const guestId = process.argv[3];
const date = process.argv[4];
const duration = process.argv[5];
const hidePriceOfMenu = Boolean(
  Number(process.argv[6]) ); // input must be a number
const numberOfGuests = process.argv[7];

const reservation = new Reservation(id, guestId, date, duration, hidePriceOfMenu, numberOfGuests);

reservationBook.push(reservation);
console.log(reservationBook);

console.log(`The guestid is: ${reservation.guestId}.`);
console.log(`The table id is: ${reservation.id}.`);
