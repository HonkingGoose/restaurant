/* eslint-disable no-unused-vars */
function sendRestaurantTableTable () {
  const capacity = document.getElementById('capacity').value
  const available = document.getElementById('available').value
  const tableCallsign = document.getElementById('table_callsign').value

  const newTable = { capacity: capacity, available: available, table_callsign: tableCallsign }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/restaurant_tables'

  xhttp.open('POST', url)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(newTable))

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status == 200) {
      getRestaurantTables()
    }
  }
}

function getRestaurantTables () {
  document.getElementById('restauranttable').innerHTML = ''

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/restaurant_tables'

  xhttp.open('GET', url)
  xhttp.send()

  xhttp.onreadystatechange = (result) => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('restauranttable')
        const insertRow = table.insertRow()

        for (const key in element) {
          const cell = insertRow.insertCell()
          cell.innerHTML = element[key]
        }
      })
    }
  }
}
function getRestaurantTableById () {
  const id = document.getElementById('restaurant_table_id').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/restaurant_tables/' + id

  xhttp.open('GET', url)
  xhttp.send()
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('tableById')
        const insertRow = table.insertRow()

        for (const key in element) {
          const cell = insertRow.insertCell()
          cell.innerHTML = element[key]
        }
      })
    }
  }
}
// DELETE FUNCTION
function deleteRestaurantTableTableById () {
  const id = document.getElementById('restaurantTableId').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/restaurant_tables/' + id
  console.log(url)

  xhttp.open('DELETE', url)
  console.log(url)
  xhttp.send()
  // reset contactinfos
}

function putRestaurantTableById () {
  const id = +document.getElementById('restauranttableId1').value
  const capacity = document.getElementById('Capacity1').value
  const available = document.getElementById('Available1').value
  const tableCallsign = document.getElementById('Table_Callsign1').value

  const newRestaurantTableById = {
    id: id,
    capacity: capacity,
    available: available,
    table_callsign: table_callsign
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/restaurant_tables/' + id

  xhttp.open('put', url)
  xhttp.setRequestHeader('Content-Type', 'application/json')
  xhttp.send(JSON.stringify(newRestaurantTableById))
}
