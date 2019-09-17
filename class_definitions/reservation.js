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
