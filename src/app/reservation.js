const sendButton = document.querySelector("#sendButton");

const reservationDatabase = [];

const inputBooker = document.querySelector("#booker");
const inputNrGuests = document.querySelector("#nrguests");
const inputDate = document.querySelector("#date");
const inputStart = document.querySelector("#starttime");
const inputEnd = document.querySelector("#endtime");
const inputTable = document.querySelector("#table");
const inputHidePrice = document.querySelector("#hideprice");

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

sendButton.addEventListener("click", () => {
  reservationDatabase.push(new Reservation(undefined, Number(inputBooker.value), inputDate.value, inputStart.value, Boolean(inputHidePrice.checked), Number(inputNrGuests.value)));

  console.log(reservationDatabase);

  alert("Saved!");
});
