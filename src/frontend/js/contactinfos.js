"use strict"

function sendGuest() {

  const firstname = document.getElementById('firstname').value;
  const prefix_lastname = document.getElementById('prefix_lastname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const telephone = document.getElementById('telephone').value;
  const newGuest = { firstname: firstname, prefix_lastname: prefix_lastname, lastname: lastname, email: email, telephone: telephone };

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
}

  function getGuestById() {
    const id = +document.getElementById("guestId").value;

    const xhttp = new XMLHttpRequest();
    const url = 'http://localhost:3000/api/contactinfos/' + id;


    xhttp.open('GET', url);
    xhttp.send();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const jsonResult = JSON.parse(xhttp.responseText);
        jsonResult.forEach(element => {
          let table = document.getElementById('guestByIdTable');
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
    const email = document.getElementById('email1').value;
    const telephone = document.getElementById('telephone1').value;

    const newContactinfosById = {
      id: id,
      firstname: firstname,
      prefix_lastname: prefix_lastname,
      lastname: lastname,
      email: email,
      telephone: telephone,
    }

    const xhttp = new XMLHttpRequest();
    const url = "http://localhost:3000/api/contactinfos/" + id;

    xhttp.open("put", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(newContactinfosById));
}



//////////////////////////////////////////////////////




        function addRow(col1Text, col1Width,
                        col2Text, col2Width,
                        col3Text, col3Width,
                        col4Text, col4Width,
                        col5Text, col5Width,
                        col6Text, col6Width) {
            if (!document.getElementsByTagName) {
                return;
            }
            var x = document.getElementById("entries").rows.length;
            tabBody=document.getElementsByTagName("tbody").item(0);
            row=document.createElement("tr");
            row.id=x;
            cell1 = document.createElement("td");
            cell2 = document.createElement("td");
            cell3 = document.createElement("td");
            cell4 = document.createElement("td");
            cell5 = document.createElement("td");
            cell6 = document.createElement("td");
            cell1.width=col1Width+"px";
            cell2.width=col2Width+"px";
            cell3.width=col3Width+"px";
            cell4.width=col4Width+"px";
            cell5.width=col5Width+"px";
            cell6.width=col6Width+"px";
            textnode1=document.createTextNode(col1Text);
            textnode2=document.createTextNode(col2Text);
            textnode3=document.createTextNode(col3Text);
            textnode4=document.createTextNode(col4Text);
            textnode5=document.createTextNode(col5Text);
            textnode6=document.createTextNode(col6Text);
            cell1.appendChild(textnode1);
            cell2.appendChild(textnode2);
            cell3.appendChild(textnode3);
            cell4.appendChild(textnode4);
            cell5.appendChild(textnode5);
            cell6.appendChild(textnode6);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);
            row.appendChild(cell5);
            row.appendChild(cell6);
            tabBody.appendChild(row);
            tableHighlightRow();
        }

        // window.onload=function(){
        //     for (let r = 0; r < 25; r++ ) {
        //         addRow( r+",1", 200, // 200px width
        //                 r+",2", 200,
        //                 r+",3", 200,
        //                 r+",4", 200, // 200px width
        //                 r+",5", 200,
        //                 r+",6", 200);
        //     }
        // }


//////////////////////////////////////////////////////////////////


var selected = null;

//
// This function highlights a table row as the mouse hovers
// over it. It also adds code to mark a row as selected when
// clicked on and toggle it when selected again
//
function tableHighlightRow() {
  if (document.getElementById && document.createTextNode) {
    var tables=document.getElementsByTagName('table');
    for ( var i=0; i<tables.length; i++ ) {
      if ( tables[i].className==='TableListJS' ) {
        var trs=tables[i].getElementsByTagName('tr');
        for ( var j=0; j<trs.length; j++) {
          if (trs[j].parentNode.nodeName==='TBODY') {
            trs[j].onmouseover=function(){
                // 'highlight' color is set in tablelist.css
                if ( this.className === '') {
                    this.className='highlight';
                }
                return false
            }
            trs[j].onmouseout=function(){
                if ( this.className === 'highlight') {
                    this.className='';
                }
                return false
            }
            trs[j].onmousedown=function(){
                //
                // Toggle the selected state of this row
                //

                // 'clicked' color is set in tablelist.css.
                if ( this.className !== 'clicked' ) {
                    // Clear previous selection
                    if ( selected !== null ) {
                        selected.className='';
                    }

                    // Mark this row as selected
                    this.className='clicked';
                    selected = this;
                }
                else {
                    this.className='';
                    selected = null;
                }

                return true
            }
          }
        }
      }
    }
  }
}


/////////////////////////////////////////////////////////////////////
