"use strict"

class Table{
 constructor(number, numberOfGuests, capacity, availability){
   this.number = number;
   this.numberOfGuests = numberOfGuests;
   this.capacity = capacity;
   this.availability = availability;
 }
}

const number = process.argv[2];
const numberOfGuests = process.argv[3];
const capacity = process.argv[4];
const availability = Boolean ( Number(process.argv[5]) );

const tableA = new Table (number, numberOfGuests, capacity, availability);
let tableCollection = [];
tableCollection.push(tableA);

console.log(tableCollection);
