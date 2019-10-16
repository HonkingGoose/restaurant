// GET
function getOrders () {
  document.getElementById('orderTable').innerHTML = ''
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/restaurant_orders'

  xhttp.open('GET', url)
  xhttp.send()

  xhttp.onreadystatechange = (result) => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('orderTable')
        const insertRow = table.insertRow()
        for (const key in element) {
          const cell = insertRow.insertCell()
          cell.innerHTML = element[key]
        }
      })
    };
  }
};
// GET BY ID
function getOrdersById () {
  document.getElementById('orderTable').innerHTML = ''
  const id = +document.getElementById('orderId').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/restaurant_orders/' + id

  xhttp.open('GET', url)
  xhttp.send()

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('orderTableById')
        const insertRow = table.insertRow()
        for (const key in element) {
          const cell = insertRow.insertCell()
          cell.innerHTML = element[key]
        };
      })
    };
  }
};
// DELETE BY ID
function deleteOrdersById () {
  const id = +document.getElementById('orderId1').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/restaurant_orders/' + id

  xhttp.open('DELETE', url)
  xhttp.send()
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      getOrders()
    }
  }
};
// PUT BY ID
function updateOrdersById () {
  const id = +document.getElementById('order_id').value
  const special_wishes = document.getElementById('special_wishes').value
  const completed = document.getElementById('completed').value
  const table_id = document.getElementById('table_id').value
  const menu_item_id = document.getElementById('menu_item_id').value
  const newOrder = {
    id: id,
    special_wishes: special_wishes,
    completed: completed,
    table_id: table_id,
    menu_item_id: menu_item_id
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/restaurant_orders/' + id

  xhttp.open('put', url)
  xhttp.setRequestHeader('Content-Type', 'application/json')
  xhttp.send(JSON.stringify(newOrder))
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      document.getElementById('order_id').value = jsonResult.id
      document.getElementById('special_wishes').value = jsonResult.special_wishes
      document.getElementById('order_timestamp').value = jsonResult.order_timestamp
      document.getElementById('completed').value = jsonResult.completed
      document.getElementById('table_id').value = jsonResult.table_id
      document.getElementById('menu_item_id').value = jsonResult.menu_item_id
      getOrders()
    }
  }
}
// POST
function postOrders () {
  const special_wishes = document.getElementById('special_wishes1').value
  const table_id = document.getElementById('table_id1').value
  const menu_item_id = document.getElementById('menu_item_id1').value

  const newOrder = {
    special_wishes: special_wishes,
    table_id: table_id,
    menu_item_id: menu_item_id
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/restaurant_orders'

  xhttp.open('POST', url)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(newOrder))

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      getOrders()
    }
  }
}
