"use strict"

function sendGuest() {

  const firstname = document.getElementById('firstname').value;
  const prefix_lastname = document.getElementById('prefix_lastname').value;
  const lastname = document.getElementById('lastname').value;
  const address = document.getElementById('address').value;
  const email = document.getElementById('email').value;
  const telephone = document.getElementById('telephone').value;
  const dateofbirth = document.getElementById('dateofbirth').value;

  const newGuest = { firstname: firstname, prefix_lastname: prefix_lastname, lastname: lastname, address: address, email: email, telephone: telephone, dateofbirth: dateofbirth };

  const xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/contactinfos';

  xhttp.open("POST", url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newGuest));

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status == 200) {
      getGuests();
    }
  }
}

function getGuests() {
  document.getElementById('guesttable').innerHTML = "";

  const xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/contactinfos';

  xhttp.open('GET', url);
  xhttp.send();

  xhttp.onreadystatechange = (result) => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText);
      jsonResult.forEach(element => {

        let table = document.getElementById('guesttable');
        let insertRow = table.insertRow();

        for (let key in element) {
          let cell = insertRow.insertCell();
          cell.innerHTML = element[key];
        }
      });
    }
  }
  function getGuestById(id) {
    const xhttp = new XMLHttpRequest();
    const url = 'http://localhost:3000/api/contactinfos/' + id;


    xhttp.open('GET', url);
    xhttp.send();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const jsonResult = JSON.parse(xhttp.responseText);
        jsonResult.forEach(element => {
          let table = document.getElementById('guesttable');
          let insertRow = table.insertRow();

          for (let key in element) {
            let cell = insertRow.insertCell();
            cell.innerHTML = element[key];
          }
        });
      }
    }
  }
  //DELETE FUNCTION
  function deleteContactinfosById() {
    const id = +document.getElementById("contactinfosId").value;
    const xhttp = new XMLHttpRequest();
    const url = "http://localhost:3000/api/contactinfos/" + id;
    console.log(url);

    xhttp.open("DELETE", url);
    console.log(url);
    xhttp.send();
    //reset contactinfos
  }

  function putContactinfosById() {
    const id = +document.getElementById('contactinfosId1').value;
    const firstname = document.getElementById('firstname1').value;
    const prefix_lastname = document.getElementById('prefix_lastname1').value;
    const lastname = document.getElementById('lastname1').value;
    const address = document.getElementById('address1').value;
    const email = document.getElementById('email1').value;
    const telephone = document.getElementById('telephone1').value;
    const dateofbirth = document.getElementById('dateofbirth1').value;

    const newContactinfosById = {
      id: id,
      firstname: firstname,
      prefix_lastname: prefix_lastname,
      lastname: lastname,
      address: address,
      email: email,
      telephone: telephone,
      dateofbirth: dateofbirth,
    }

    const xhttp = new XMLHttpRequest();
    const url = "http://localhost:3000/api/contactinfos/" + id;

    xhttp.open("put", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(newContactinfosById));
  }
}
