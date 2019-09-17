  function verstuurGast() {

    const firstname = document.getElementById('firstname').value;
    const prefix_lastname = document.getElementById('prefix_lastname').value;
    const lastname = document.getElementById('lastname').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const dateofbirth = document.getElementById('dateofbirth').value;
    const greeting = document.getElementById('greeting').value;

    const newGuest = { firstname:firstname, prefix_lastname:prefix_lastname, lastname:lastname, address:address, email:email, telephone:telephone, dateofbirth:dateofbirth, greeting:greeting };

    const xhttp = new XMLHttpRequest();
    const url = 'http://localhost:3000/api/contactinfos';

    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(newGuest));

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status ==200) {
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
      if (xhttp.readyState === 4 && xhttp.status === 200 ) {
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
          const url = 'http://localhost:3000/api/contactinfos/'+id;

          
          xhttp.open('GET', url);
          xhttp.send();
          xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200 ) {
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
