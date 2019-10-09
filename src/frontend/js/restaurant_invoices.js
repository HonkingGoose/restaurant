"use strict"

function sendRestaurantInvoice() {

  const totalprice = document.getElementById('total_price').value;
  const contactinfosid = document.getElementById('contactinfos_id').value;
  const newrestaurantinvoice = { total_price: totalprice, contactinfos_id: contactinfosid };

    const xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/restaurant_invoices';

  xhttp.open("POST", url);
  xhttp.setRequestHeader("Content-type", "application/json");
  console.log(newrestaurantinvoice);
  xhttp.send(JSON.stringify(newrestaurantinvoice));

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status == 200) {
      getRestaurantInvoices();
      let response = JSON.parse(xhttp.responseText);

      console.log(response.insertId+" is het laatste id");
    }
  }
}

function getRestaurantInvoices() {
  document.getElementById('restaurantInvoices').innerHTML = "";

  const xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/restaurant_invoices';

  xhttp.open('GET', url);
  xhttp.send();

  xhttp.onreadystatechange = (result) => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText);
      jsonResult.forEach(element => {

        let table = document.getElementById('restaurantInvoices');
        let insertRow = table.insertRow();

        for (let key in element) {
          let cell = insertRow.insertCell();
          cell.innerHTML = element[key];
        }
      });
    }
  }
}

  function getRestaurantInvoiceById() {
    const id = document.getElementById("restauranttableId").value;

    const xhttp = new XMLHttpRequest();
    const url = 'http://localhost:3000/api/restaurant_invoices/' + id;


    xhttp.open('GET', url);
    xhttp.send();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const jsonResult = JSON.parse(xhttp.responseText);
        jsonResult.forEach(element => {
          let table = document.getElementById('restaurantInvoiceByIdTable');
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
  function deleteRestaurantInvoiceById() {
    const id = +document.getElementById("restaurantInvoiceId").value;
    const xhttp = new XMLHttpRequest();
    const url = "http://localhost:3000/api/restaurant_invoices/" + id;
    console.log(url);

    xhttp.open("DELETE", url);
    console.log(url);
    xhttp.send();
    //reset contactinfos
  }

  function putRestaurantInvoiceById() {
    const id = +document.getElementById('restaurantInvoiceId1').value;
    const totalprice = document.getElementById('total_price1').value;
    const contactinfosid = document.getElementById('contactinfos_id1').value;
    const newRestaurantinvoicesById = {
      id: id,
      total_price: totalprice,
      contactinfos_id: contactinfosid,
    }

    const xhttp = new XMLHttpRequest();
    const url = "http://localhost:3000/api/restaurant_invoices/" + id;

    xhttp.open('put', url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(newRestaurantinvoicesById));
    console.log(newRestaurantinvoicesById)
  }
