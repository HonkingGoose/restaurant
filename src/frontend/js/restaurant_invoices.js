"use strict"

function sendRestaurantInvoice() {

  const totalprice = document.getElementById('total_price').value;
  const contactinfosid = document.getElementById('contactinfos_id').value;
  const newrestaurantinvoice = { totalprice: totalprice, contactinfosid: contactinfosid };

  const xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/restaurant_invoices';

  xhttp.open("POST", url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newRestaurantInvoice));

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status == 200) {
      getRestaurantInvoices();
    }
  }
}

function getRestaurantInvoices() {
  document.getElementById('guesttable').innerHTML = "";

  const xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/restaurant_invoices';

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

  function getRestaurantInvoiceById(id) {
    const xhttp = new XMLHttpRequest();
    const url = 'http://localhost:3000/api/restaurant_invoices/' + id;


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
  function deleteRestaurantInvoiceById() {
    const id = +document.getElementById("restauranttableId").value;
    const xhttp = new XMLHttpRequest();
    const url = "http://localhost:3000/api/restaurant_invoices/" + id;
    console.log(url);

    xhttp.open("DELETE", url);
    console.log(url);
    xhttp.send();
    //reset contactinfos
  }

  function putRestaurantInvoiceById() {
    const id = +document.getElementById('restaurantInvoiceId').value;
    const totalprice = document.getElementById('total_price').value;
    const contactinfosid = document.getElementById('contactinfos_id').value;

    const newRestaurantinvoicesById = {
      id: id,
      totalprice: totalprice,
      contactinfosid: contactinfosid
    }

    const xhttp = new XMLHttpRequest();
    const url = "http://localhost:3000/api/restaurant_invoices/" + id;

    xhttp.open("put", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(newContactinfosById));
  }
}
