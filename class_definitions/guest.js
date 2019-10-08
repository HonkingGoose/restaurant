"use strict"

module.exports = class Guest {
  constructor(id, name, address, mail, telephone, dateOfBirth){
    this.id = id;
    this.name = name;
    this.address = address;
    this.mail = mail;
    this.telephone = telephone;
    this.dateOfBirth = dateOfBirth;
  }
}