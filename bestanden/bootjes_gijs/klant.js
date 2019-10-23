let api = "http://localhost:3000/api/klant/";

$(document).ready(function () {
  initDataTable();



  // $(".btn").click(function () {
  //     getData(api);
  // });

  $(".btn").ready(function () {
      getData(api);
  });

  $(".btn-warning").click(function () {
      clear();
  });
});

function initDataTable() {

  columns = [
      { "data": "id" },
      { "data": "klantnaam" }
      // ,{
      //     "render": function (data, type, row, meta) {
      //         // data : data for the cell
      //         // type seems to be the class of the table (e.g. display)
      //         // row seems to be the per iteration object (in this case a user)
      //         return `<a onclick="remove(${row.id});" title="Remove this table"> <i class="fa fa-pencil-alt">XXX ${row.id}</i> </a>`;
      //         // return '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add</button>';
      //     }
      // },
  ];

  // he guys, this is a jQuery Plugin
  let dataTable = $('#dataTable').DataTable({
      "order": [[0, "asc"]],
      "columns": columns
  });

  $('#dataTable tbody').on('click', 'tr', function () { // means ... when I click on
      console.log("entering");

     var klantData = dataTable.row(this).data();

        console.log(klantData);


        const xhttp = new XMLHttpRequest();
        const url = 'http://localhost:3000/api/klant/' + klantData.id;

       xhttp.open('GET', url);
       xhttp.send();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
            const jsonResult = JSON.parse(xhttp.responseText);
            $("#klantId1").val(jsonResult.id);
            $("#naamklant1").val(jsonResult.klantnaam);

            // document.getElementById('naamboot1').value=jsonResult.naamboot;

            $('#modalDeleteAndUpdate').modal('show');


      //
          }
        }


      });
}

function clear() {
  $("#dataTable").DataTable().clear();
  $("#dataTable").DataTable().columns.adjust().draw();
}

function getData(api) {
  clear()

  $.get(
      {
          url: api,
          dataType: "json",
          success: function (data) {
              // if (data) {
              //     $("#dataTable").DataTable().clear();
              //     for(let i=0; i < data.length; i++) {
              //       if (data[i].beschikbaar == 1) {
              //       data[i].beschikbaar = 'beschikbaar';
              //     }
              //
              //     else {
              //       data[i].beschikbaar = 'in bedrijf'
              //     }
              //   }
              // }
                  $("#dataTable").DataTable().rows.add(data);
                  $("#dataTable").DataTable().columns.adjust().draw();
                  // console.log(data[0].beschikbaar);
          }
      }

  );
}




function getDataAlternate(api) {

  // asynchronous REST GET
  $.get(api, function (data) {

      if (data) {
          $("#dataTable").DataTable().clear();
          $("#dataTable").DataTable().rows.add(data);
          $("#dataTable").DataTable().columns.adjust().draw();
      }
  });
}


$('#exampleModal').on('show.bs.modal', function (event) {
var button = $(event.relatedTarget) // Button that triggered the modal
var recipient = button.data('whatever') // Extract info from data-* attributes
// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
var modal = $(this)
modal.find('.modal-title').text('New message to ' + recipient)
modal.find('.modal-body input').val(recipient)
})

// $('modalDeleteAndUpdate').on('show.bs.modal', function (event) {
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   var recipient = button.data('whatever') // Extract info from data-* attributes
//   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//   var modal = $(this)
//   modal.find('.modal-title').text('New message to ' + recipient)
//   modal.find('.modal-body input').val(recipient)
// })




"use strict"
function sendKlant() {

const klantnaam = document.getElementById('naamklant').value;
// const beschikbaar = document.getElementById('beschikbaar').value;

const newKlant = { klantnaam: klantnaam };

const xhttp = new XMLHttpRequest();
const url = 'http://localhost:3000/api/klant';

xhttp.open("POST", url);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send(JSON.stringify(newKlant));

xhttp.onreadystatechange = () => {
  if (xhttp.readyState === 4 && xhttp.status == 200) {
    getData(api)
  }
}
$("#naamklant").val('');
}


// function getKlantById() {
//   const id = klantData.id;
//
//   console.log(id);
//   // const id = document.getElementById("bootId").value;
//
//   const xhttp = new XMLHttpRequest();
//   const url = 'http://localhost:3000/api/klant/' + id;
//
//
//   xhttp.open('GET', url);
//   xhttp.send();
//   xhttp.onreadystatechange = () => {
//     if (xhttp.readyState === 4 && xhttp.status === 200) {
//       const jsonResult = JSON.parse(xhttp.responseText);
//       jsonResult.forEach(element => {
//         let table = document.getElementById('klantByIdTable');
//         let insertRow = table.insertRow();
//
//         for (let key in element) {
//           let cell = insertRow.insertCell();
//           cell.innerHTML = element[key];
//         }
//       });
//     }
//   }
// }
//DELETE FUNCTION
function deleteKlantById() {
  const id = +document.getElementById("klantId1").value;
  const xhttp = new XMLHttpRequest();
  const url = "http://localhost:3000/api/klant/" + id;

  xhttp.open("DELETE", url);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 204) {
      console.log('de data is opgehaald')
        getData(api);
        console.log('de data is opgehaald')
    }
  }
}

function putKlantById() {
  const id = document.getElementById("klantId1").value;
  const klantnaam = document.getElementById('naamklant1').value;

  const newKlantById = { klantnaam: klantnaam };


  const xhttp = new XMLHttpRequest();
  const url = "http://localhost:3000/api/klant/" + id;

  xhttp.open("put", url);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(newKlantById));

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        getData(api);
    }
  }

}
