const api = 'http://localhost:3000/api/restaurant_tables'

$(document).ready(function () {
  initDataTable()

  getData(api)

  $('#fetch').click(function () {
    getData(api)
  })

  $('#clear').click(function () {
    clear()
  })
  $('#addBtn').on('click', function () {
<<<<<<< HEAD
    document.getElementById('modal-title-add').innerHTML = 'Create a table'
    document.getElementById('modalFormAdd').reset()
    $('#btnsubmit1').attr('onclick', 'submitNew("' + api + '");')
    $('#postDetailAdd').modal('toggle')
=======
    document.getElementById('modal-title').innerHTML = 'Create a table'
    document.getElementById('modalForm').reset()
    $('#btnsubmit').attr('onclick', 'submitNew("' + api + '");')
    $('#postDetail').modal('toggle')
>>>>>>> 7f23250bc49d61a1615791be6fc26dc7160a29f9
  })
})

function initDataTable () {
  columns = [
    { title: 'Capacity', data: 'capacity' },
    { title: 'Available', data: 'available' },
    { title: 'Table callsign', data: 'table_callsign' }

    /*,
        {  "render": function(data, type, row, meta){
            return '<a title="Delete this table" <i class="fa fa-pencil-alt"></i> </a>';
        } }, */
  ]

<<<<<<< HEAD
  const table = $('#dataTable').DataTable({
=======
  $('#dataTable').DataTable({
>>>>>>> 7f23250bc49d61a1615791be6fc26dc7160a29f9
    order: [[0, 'asc']],
    columns: columns
  })

  $('#dataTable tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected')
    }
    deselect()
    $(this).addClass('selected')
<<<<<<< HEAD
    var data = table.row(this).data()
    console.log(data)

    // this function fetches one record and fill the modal with the data and shows the modal for editing
    // fillUpdateDiv(data, api)
    console.log(api)
    getSingleRecord(data.id, api)

    // $('#postDetail').modal('toggle');
=======
    var table = $('#dataTable').DataTable()
    var data = table.row(this).data()

    // this function fetches one record and fill the modal with the data and shows the modal for editing
    fillUpdateDiv(data, api)
    getSingleRecord(data.id, api)

    $('#postDetail').modal('toggle')
>>>>>>> 7f23250bc49d61a1615791be6fc26dc7160a29f9
  })
}

function clear () {
  $('#dataTable').DataTable().clear()
  $('#dataTable').DataTable().columns.adjust().draw()
}

function getData (api) {
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
<<<<<<< HEAD
  console.log(apiPath)
  $.get(apiPath, function (data) {
    if (data) {
      console.log('<from server')
      console.log(data)
      console.log('>from server')
=======
  $.get(apiPath, function (data) {
    if (data) {
>>>>>>> 7f23250bc49d61a1615791be6fc26dc7160a29f9
      fillUpdateDiv(data, api)
    }
  })
}

function submitNew () {
  // var formData = $("#modalForm").serializeArray().reduce(function (result, object) { result[object.name] = object.value; return result }, {});
  // for (var key in formData) {
  //     if (formData[key] == "" || formData == null) delete formData[key];
  // }

  const formData = {
    capacity: $('#capacity').val(),
<<<<<<< HEAD
    table_callsign: $('#table_callsign').val(),
    available: $('#availableAdd').is(':checked')
  }

  console.log(formData)
  console.log('Einde log formdata')

=======
    available: $('#available').val(),
    table_callsign: $('#table_callsign').val()
  }

>>>>>>> 7f23250bc49d61a1615791be6fc26dc7160a29f9
  $.ajax({
    url: api,
    type: 'post',
    data: JSON.stringify(formData),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
<<<<<<< HEAD
      console.log(data)
=======
>>>>>>> 7f23250bc49d61a1615791be6fc26dc7160a29f9
      getData(api)
    },
    error: function (error) {
      console.log(error)
    }
<<<<<<< HEAD

=======
>>>>>>> 7f23250bc49d61a1615791be6fc26dc7160a29f9
  })

  deselect()
  $('#postDetail').modal('toggle')
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
<<<<<<< HEAD
  console.log(record)
  document.getElementById('modal-title').innerHTML = 'Edit a table'

  // this function fills the modal
  fillModal(record)
  $('#postDetail').modal('toggle')
=======

  document.getElementById('modal-title').innerHTML = 'Edit a table'

  // this function fills the modal
  fillModal(record)
>>>>>>> 7f23250bc49d61a1615791be6fc26dc7160a29f9
}

//  show the usage of the popover here!
function fillModal (record) {
<<<<<<< HEAD
  console.log(record)
=======
>>>>>>> 7f23250bc49d61a1615791be6fc26dc7160a29f9
  // fill the modal
  // $("#id").val(record.id);
  $('#capacity').val(record.capacity)
  $('#available').val(record.available)
  $('#table_callsign').val(record.table_callsign)

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

  const formData = {
    capacity: $('#capacity').val(),
    available: $('#available').val(),
    table_callsign: $('#table_callsign').val()
  }
<<<<<<< HEAD
  console.log(formData)
=======

>>>>>>> 7f23250bc49d61a1615791be6fc26dc7160a29f9
  console.log('Formdata =>')
  console.log(JSON.stringify(formData))

  console.log('Updating row with id:' + id)
  console.log(formData)
  $.ajax({
    url: api + '/' + id,
    type: 'put',
    data: JSON.stringify(formData),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      getData(api)
    },
    error: function (error) {
      console.log(error)
    }
  })

  deselect()
  $('#postDetail').modal('toggle')
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
