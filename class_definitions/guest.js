'use strict'

class Guest {
  constructor (id, name, address, mail, telephone, dateOfBirth) {
    this.id = id
    this.name = name
    this.address = address
    this.mail = mail
    this.telephone = telephone
    this.dateOfBirth = dateOfBirth
  }
}

const id = process.argv[2]
const name = process.argv[3]
const address = process.argv[4]
const mail = process.argv[5]
const telephone = process.argv[6]
const dateOfBirth = process.argv[7]

const guest = new Guest(id, name, address, mail, telephone, dateOfBirth)

const guests = []

guests.push(guest)

console.log(guests)
