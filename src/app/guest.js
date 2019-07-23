"use strict";

const gasten = [];

class Guest {
  constructor(id, name, address, mail, telephone, dateOfBirth){
    this.id = id;
    this.name = name;
    this.address = address;
    this.mail = mail;
    this.telephone = telephone;
    this.dateOfBirth = dateOfBirth;
  }
}


function createguest() {
  const name = document.getElementById('guestName').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const address = document.getElementById('address').value;
  const mail = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phoneNumber').value;


  const guest = new Guest(name, dateOfBirth, address, mail, phoneNumber);
  gasten.push(guest);

  alert("saved succesfully");
}
