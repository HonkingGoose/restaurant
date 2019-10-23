/* eslint-disable no-undef */ // jquery symbols
const dt = $('#dataTable')

function createClickHandlers () {
  
}

function fillTable (api) {
  const columns = [
    { data: 'id' },
    { data: 'reservation_date' },
    { data: 'start_time' },
    { data: 'hide_menu_price' },
    { data: 'number_of_guests' },
    { data: 'allergy' },
    { data: 'special_needs' },
    { data: 'contactinfos_id' }
  ]

  dt.DataTable({
    order: [[0, 'asc']],
    columns: columns,
    ajax: {
      url: api,
      dataSrc: ''
    }
  })

  createClickHandlers()
}

fillTable('http://localhost:3000/api/reservations')
