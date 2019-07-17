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
  const naam = document.getElementById('Gastnaam').value;
  const geboortedatum = document.getElementById('Geboortedatum').value;
  const adress = document.getElementById('Adress').value;
  const mail = document.getElementById('E-mailadress').value;
  const telefoonnummer = document.getElementById('Telefoonnummer').value;


  const guest = new Guest(naam, geboortedatum, adress, mail, telefoonnummer);
  gasten.push(guest);

  alert("saved succesfully");
}
