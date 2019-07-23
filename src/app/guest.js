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
  const naam = document.getElementById('guestName').value;
  const geboortedatum = document.getElementById('dateOfBirth').value;
  const adress = document.getElementById('address').value;
  const mail = document.getElementById('email').value;
  const telefoonnummer = document.getElementById('phoneNumber').value;


  const guest = new Guest(naam, geboortedatum, adress, mail, telefoonnummer);
  gasten.push(guest);

  alert("saved succesfully");
}
