"use strict"

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

let id = process.argv[2];
let name = process.argv[3];
let address = process.argv[4];
let mail = process.argv[5];

let guest = new Guest(id, name, address, mail, undefined, "09-08-1968");

let guests = [];

guests.push(guest);

for( guest of guests ) {
  console.log(guest);
}
