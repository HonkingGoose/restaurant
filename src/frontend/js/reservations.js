//GET
function getReservations(){
  document.getElementById("reservationTable").innerHTML = "";
    const xhttp = new XMLHttpRequest();
    const url = "http://localhost:3000/api/reservations";

    xhttp.open("GET", url);
    xhttp.send();

  xhttp.onreadystatechange = (result) => {
    if (xhttp.readyState === 4 && xhttp.status === 200){
      const jsonResult = JSON.parse(xhttp.responseText);
      jsonResult.forEach(element => {
        let table = document.getElementById("reservationTable");
        let insertRow = table.insertRow();
        for(let key in element){
          let cell = insertRow.insertCell();
          cell.innerHTML = element[key];
        }
      });
      };
    };
};
//GET BY ID
function getReservationsById(){
  document.getElementById("reservationTable").innerHTML = "";
  const id = +document.getElementById("reservationId").value;
  const xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/reservations/'+id;

  xhttp.open('GET', url);
  xhttp.send();

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200 ) {
      const jsonResult = JSON.parse(xhttp.responseText);
      jsonResult.forEach(element => {
        let table = document.getElementById('reservationTableById');
        let insertRow = table.insertRow();
        for (let key in element) {
          let cell = insertRow.insertCell();
          cell.innerHTML = element[key];
        };
      });
    };
  };
};
//DELETE BY ID
function deleteReservationsById(){
  const id = +document.getElementById("reservationsId1").value;
  const xhttp = new XMLHttpRequest();
  const url = "http://localhost:3000/api/reservations/"+id;

  xhttp.open("DELETE", url);
  xhttp.send();
};
//PUT BY ID
function updateReservationsById() {
  const id = +document.getElementById("reservation_id").value;
  const reservation_date = document.getElementById("reservation_date").value;
  const start_time = document.getElementById("start_time").value;
  const hide_menu_price = document.getElementById("hide_menu_price").value;
  const number_of_guests = document.getElementById("number_of_guests").value;
  const allergy = document.getElementById("allergy").value;
  const special_needs = document.getElementById("special_needs").value;
  const contactinfos_id = document.getElementById("contactinfos_id").value;
  const newReservation = {
    id: id,
    reservation_date: reservation_date,
    start_time: start_time,
    hide_menu_price: hide_menu_price,
    number_of_guests: number_of_guests,
    allergy: allergy,
    special_needs: special_needs,
    contactinfos_id: contactinfos_id
  }

  const xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/reservations/'+id;

  xhttp.open("put", url);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(newReservation));
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200 ) {
          const jsonResult = JSON.parse(xhttp.responseText);
          document.getElementById("reservation_id2").value = jsonResult.id;
          document.getElementById("reservation_date").value = jsonResult.reservation_date;
          document.getElementById("start_time").value = jsonResult.start_time;
          document.getElementById("hide_menu_price").value = jsonResult.hide_menu_price;
          document.getElementById("number_of_guests").value = jsonResult.number_of_guests;
          document.getElementById("allergy").value = jsonResult.allergy;
          document.getElementById("special_needs").value = jsonResult.special_needs;
          document.getElementById("contactinfos_id").value = jsonResult.contactinfos_id;
      }
  }
}
//POST



function postReservations(){
  const reservation_date = document.getElementById("reservation_date").value;
  const start_time = document.getElementById("start_time").value;
  const hide_menu_price = document.getElementById("hide_menu_price").value;
  const number_of_guests = document.getElementById("number_of_guests").value;
  const allergy = document.getElementById("allergy").value;
  const special_needs = document.getElementById("special_needs").value;
  const contactinfos_id = document.getElementById("contactinfos_id").value;

  const newReservation = {
    reservation_date: reservation_date,
    start_time: start_time,
    hide_menu_price: hide_menu_price,
    number_of_guests: number_of_guests,
    allergy: allergy,
    special_needs: special_needs,
    contactinfos_id: contactinfos_id
  };

  const xhttp = new XMLHttpRequest();
  const url = "http://localhost:3000/api/reservations";

  xhttp.open("POST", url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newReservation));

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200){
      getReservations();
    }
  }
}
