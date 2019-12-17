const api = 'http://localhost:3000/api/reservations'

$(document).ready(function () {
  initDataTable()

  getData(api)


    $("#fetch").click(function () {
        getData(api);
    })

    $("#clear").click(function () {
        clear();
    })
    $("#addBtn").on('click', function () {
        document.getElementById("modal-title").innerHTML = "Create reservation";
        document.getElementById("modalForm").reset();
        $("#btnsubmit").attr('onclick', 'submitNew("' + api + '");');
        $('#postDetail').modal('toggle');
    })
  })

function initDataTable () {
  columns = [
    { title: 'Date', data: 'reservation_date' },
    { title: 'Time', data: 'start_time' },
    { title: 'Hide menu price', data: 'hide_menu_price' },
    { title: 'Number of guests', data: 'number_of_guests'},
    { title: 'allergy', data: 'allergy'},
    { title: 'Special needs', data: 'special_needs'},
    { title: 'Name', data: 'fullName'},
    { title: 'Telephone', data: 'telephone'}


    /*,
        {  "render": function(data, type, row, meta){
            return '<a title="Delete this table" <i class="fa fa-pencil-alt"></i> </a>';
        } }, */
  ]

  const table = $('#dataTable').DataTable({
    order: [[0, 'asc']],
    columns: columns
  })

  $('#dataTable tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected')
    }
    deselect()
    $(this).addClass('selected')
    var table = $('#dataTable').DataTable()
    var data = table.row(this).data()

    // this function fetches one record and fill the modal with the data and shows the modal for editing
    fillUpdateDiv(data, api)
    getSingleRecord(data.id, api)

    // $('#postDetail').modal('toggle')
  })
}

function clear () {
  $('#dataTable').DataTable().clear()
  $('#dataTable').DataTable().columns.adjust().draw()
}

function getData(api) {
   // asynchronous REST GET
   $.get(api, function (data) {
    if (data) {
      $('#dataTable').DataTable().clear()
      $('#dataTable').DataTable().rows.add(data)
      $('#dataTable').DataTable().columns.adjust().draw()
    }
  })
}

function getSingleRecord (id, api) {
  const apiPath = String(api + '/' + id)
  $.get(apiPath, function (data) {
    if (data) {
      fillUpdateDiv(data, api)
    }
  })
}

function submitNew() {

  let allergyNew = [];
  for (let i = 0; i < 15; i++) {
     if ($('.allergy' + [i]).is(":checked")) {
      allergyNew.push($('.allergy' + [i]).val())
    }
  }

    const formData = {
        reservation_date: $('#reservation_date').val(),
        start_time: $('#start_time').val(),
        hide_menu_price: $('#hide_menu_price').is(":checked"),
        number_of_guests: $('#number_of_guests').val(),
        allergy: allergyNew.toString(),
        special_needs: $('#special_needs').val(),
        fullName: $('#fullName').val(),
        telephone: $('#telephone').val()
    }


//Checks if name of guest is noted and does not contain numbers
  const checkName = fullName === ''

  if (checkName) {
      alert('invalid: guest name')
      return
  }

  for(let i = 0; i < 10; i++){
      if(formData.fullName.includes(i)){
          alert('Invalid: guest name')
      }
  }


//Checks if telephone of guest is noted
  const checkTelephone = telephone === ''
  if (checkTelephone) {
      alert('invalid: telephonenumber')
      return
  }
// Checks if date is not in the past
  const date = new Date()
  const year = date.getFullYear();
  const month = (date.getMonth() < 10 ? "0" : "") + parseInt(date.getMonth() + 1);
  const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
  const nowDate = year + '-' + month + '-' + day
  const nowTime = date.getHours() + ':' + date.getMinutes()
  const checkDate = formData.reservation_date < nowDate


  if (checkDate) {
      alert('invalid: reservation date')
      return
  }

// Checks if time is not in the past
  const checkToday = formData.reservation_date == nowDate
  const checkTime = $('#start_time').val() < nowTime

  if (checkToday && checkTime){
      alert('invalid: reservation time')
      return
  }

// after the checks -> days get + 1 to compensate for time difference
  const dateFormat = formData.reservation_date.split("-")[0] + "-" + formData.reservation_date.split("-")[1] + "-" + (parseInt(formData.reservation_date.split("-")[2]) + 1)
  formData.reservation_date = dateFormat

//Checks if number of guest is not "", 0,<0
  const number1 = formData.number_of_guests === ''
  const number2 = formData.number_of_guests <= 0
  const number3 = formData.number_of_guests >= 100

  if (number1 || number2) {
      alert('invalid: Number of guests')
      return
  } else if (number3){
      alert('invalid: too many guests. Please contact customer service.')
      return
  }
      $.ajax({
        url: api,
        type: "post",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            getData(api);
            alert('Reservation saved in database');
        },
        error: function (error) {
            console.log(error);
        }

    });

    deselect();
    $('#postDetail').modal('toggle');
}

// this function perform cleaning up of the table
// 1. remove eventually selected class
// 2. clean the form using the reset method
function deselect () {
  $('#dataTable tr.selected').removeClass('selected')

  document.getElementById('modalForm').reset()
}

function fillUpdateDiv (record, api) {
  $('#btnsubmit').attr('onclick', 'submitEdit(' + record.id + ', "' + api + '");')
  document.getElementById('modal-title').innerHTML = 'Edit reservation'

  // this function fills the modal
  fillModal(record)
  $('#postDetail').modal('toggle')
}

//  show the usage of the popover here!
function fillModal (record) {

  // fill the modal
  // $("#id").val(record.id);
  $('#reservation_date').val(record.reservation_date.split("T")[0])
  $('#start_time').val(record.start_time)
  if (record.hide_menu_price === 1){
    $('#hide_menu_price').attr("checked", true)
  } else {
    $('#hide_menu_price').attr("checked", false)
  }

  $('#number_of_guests').val(record.number_of_guests)


  const allergyItem = record.allergy.split(',');
  let allergyFill = [];

  for(let i = 0; i < allergyItem.length; i++){
    allergyFill.push(allergyItem[i])
  }

  for(let i = 0; i < 15; i++){
    if(allergyFill.includes($('.allergy' + [i]).val())){
      $('.allergy' + [i]).attr('checked', true)
      console.log('ja')
    } else {
      $('.allergy' + [i]).attr('checked', false)
      console.log('nee')
    }
  }


  $('#special_needs').val(record.special_needs)
  $('#fullName').val(record.fullName)
  $('#telephone').val(record.telephone)

  // set inline block to respect the margins if applicable
  $('#deleteButton').css('display', 'inline-block')

  // create the buttons for the confirmation
  // first the cancel button which just does nothing
  let confirmationButtons = '<button class="btn btn-secondary">Cancel</button>&nbsp;'

  // than the confirmbutton which just invokes submitDelete(...)
  confirmationButtons += `<button type="button" class="btn btn-danger" onclick="submitDelete('${record.id}', '${api}');">Confirm delete</button>`

  // set the deleteButton to be a popover
  // first dispose / distroy the popover on the deleteButton to be sure there is no active on!
  $('#deleteButton').popover('dispose')
  // the enable the popover
  $('#deleteButton').popover({
    animation: true,
    content: confirmationButtons, // just use the above created confirmButtons for confirmation
    html: true,
    container: postDetail
  })
}

function submitEdit (id) {
  // shortcut for filling the formData as a JavaScript object with the fields in the form
  // var formData = $('#modalForm').serializeArray().reduce(function (result, object) { result[object.name] = object.value; return result }, {})
  let allergyEdit = [];
  for (let i = 0; i < 15; i++) {
     if ($('.allergy' + [i]).is(":checked")) {
      allergyEdit.push($('.allergy' + [i]).val())
    }
  }

    const formData = {
        reservation_date: $('#reservation_date').val(),
        start_time: $('#start_time').val(),
        hide_menu_price: $('#hide_menu_price').is(":checked"),
        number_of_guests: $('#number_of_guests').val(),
        allergy: allergyEdit.toString(),
        special_needs: $('#special_needs').val(),
        fullName: $('#fullName').val(),
        telephone: $('#telephone').val()
    }


//Checks if name of guest is noted and does not contain numbers
    const checkName = fullName === ''

    if (checkName) {
        alert('invalid: guest name')
        return
    }

    for(let i = 0; i < 10; i++){
        if(formData.fullName.includes(i)){
            alert('Invalid: guest name')
        }
    }


//Checks if telephone of guest is noted
    const checkTelephone = telephone === ''
    if (checkTelephone) {
        alert('invalid: telephonenumber')
        return
    }
// Checks if date is not in the past
    const date = new Date()
    const year = date.getFullYear();
    const month = (date.getMonth() < 10 ? "0" : "") + parseInt(date.getMonth() + 1);
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    const nowDate = year + '-' + month + '-' + day
    const nowTime = date.getHours() + ':' + date.getMinutes()
    const checkDate = formData.reservation_date < nowDate


    if (checkDate) {
        alert('invalid: reservation date')
        return
    }

// Checks if time is not in the past
    const checkToday = formData.reservation_date == nowDate
    const checkTime = $('#start_time').val() < nowTime

    if (checkToday && checkTime){
        alert('invalid: reservation time')
        return
    }

// after the checks -> days get + 1 to compensate for time difference
    const dateFormat = formData.reservation_date.split("-")[0] + "-" + formData.reservation_date.split("-")[1] + "-" + (parseInt(formData.reservation_date.split("-")[2]) + 1)
    formData.reservation_date = dateFormat

//Checks if number of guest is not "", 0,<0
    const number1 = formData.number_of_guests === ''
    const number2 = formData.number_of_guests <= 0
    const number3 = formData.number_of_guests >= 100

    if (number1 || number2) {
        alert('invalid: Number of guest')
        return
    } else if (number3){
        alert('invalid: Too many guests. Please contact customer service.')
        return
    }

    $.ajax({
        url: api + "/" + id,
        type: 'put',
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            getData(api);
            deselect();
            $('#postDetail').modal('toggle');

        },
        error: function (error) {
          // deselect();
          $('#postDetail').modal('show');
            console.log(error);
        }
    });


}

function submitDelete (id, api) {
  console.log(`Deleting row with id: ${id}`)
  $.ajax({
    url: api + '/' + id,
    type: 'delete',
    dataType: 'json',
    success: function (data) {
      getData(api)
    },
    error: function (error) {
      console.log(error)
    }
  })
  $('#postDetail').modal('toggle')
}

