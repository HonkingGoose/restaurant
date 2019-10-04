function sendRestaurantTableTable() {

  const capacity = document.getElementById('capacity').value;
  const available = document.getElementById('available').value;
  const table_callsign = document.getElementById('table_callsign').value;


  const newTable = { capacity: capacity, available: available, table_callsign: table_callsign };

  const xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/restaurant_tables';

  xhttp.open("POST", url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newTable));

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status == 200) {
      getRestaurantTables();
    }
  }
}

function getRestaurantTables() {
  document.getElementById('restauranttable').innerHTML = "";

  const xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/restaurant_tables';

  xhttp.open('GET', url);
  xhttp.send();

  xhttp.onreadystatechange = (result) => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText);
      jsonResult.forEach(element => {

        let table = document.getElementById('restauranttable');
        let insertRow = table.insertRow();

        for (let key in element) {
          let cell = insertRow.insertCell();
          cell.innerHTML = element[key];
        }
      });
    }
  }
    function getTableById(id) {
          const xhttp = new XMLHttpRequest();
          const url = 'http://localhost:3000/api/restaurant_tables/'+id;


          xhttp.open('GET', url);
          xhttp.send();
          xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200 ) {
                  const jsonResult = JSON.parse(xhttp.responseText);
                  jsonResult.forEach(element => {
                      let table = document.getElementById('restauranttable');
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
    const url = "http://localhost:3000/api/restaurant_tables/"+id;
    console.log(url);

    xhttp.open("DELETE", url);
    console.log(url);
    xhttp.send();
    //reset contactinfos
  }

  function putContactinfosById()  {
    const capacity = document.getElementById('capacity').value;
    const available = document.getElementById('available').value;
    const table_callsign = document.getElementById('table_callsign').value;

    const newContactinfosById = {
      capacity: capacity,
      available: available,
      table_callsign: table_callsign
    }

    const xhttp = new XMLHttpRequest();
    const url = "http://localhost:3000/api/restaurant_tables/"+id;

    xhttp.open("put", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(newRestaurantTablesById));
  }
}
