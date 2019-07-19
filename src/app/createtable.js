"use strict";
const tables = [];

class Table {
 constructor(number, numberOfGuests, capacity, availability){
   this.number = number;
   this.numberOfGuests = numberOfGuests;
   this.capacity = capacity;
   this.availability = availability;
 }
}

function createtable(){
  const nummer = document.getElementById('Number').value;
  const aantalgasten = document.getElementById('NumberOfGuests').value;
  const capaciteit = document.getElementById('Capacity').value;
  const beschikbaarheid = document.getElementById('Availability').value;

const table = new Table(nummer, aantalgasten, capaciteit, beschikbaarheid);
tables.push(table);

alert("succesvol opgeslagen");
}
