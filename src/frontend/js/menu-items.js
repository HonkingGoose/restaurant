/* eslint-disable no-unused-vars */
// GET
function getMenuItems () {
  document.getElementById('menuItemsTable').innerHTML = ''
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/menu_items'

  xhttp.open('GET', url)
  xhttp.send()

  xhttp.onreadystatechange = (result) => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('menuItemsTable')
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
function getMenuItemsById () {
  document.getElementById('menuItemTableById').innerHTML = ''
  const id = +document.getElementById('menuItemId').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/menu_items/' + id

  xhttp.open('GET', url)
  xhttp.send()

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('menuItemTableById')
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
function deleteMenuItemsById () {
  const id = +document.getElementById('menuItemsId1').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/menu_items/' + id

  xhttp.open('DELETE', url)
  xhttp.send()
};
// PUT BY ID
function updateMenuItemsById () {
  const id = +document.getElementById('menuItem_id').value
  const name = document.getElementById('name').value
  const description = document.getElementById('description').value
  const price = document.getElementById('price').value
  const newMenuItem = {
    id: id,
    name: name,
    description: description,
    price: price
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/menu_items/' + id

  xhttp.open('put', url)
  xhttp.setRequestHeader('Content-Type', 'application/json')
  xhttp.send(JSON.stringify(newMenuItem))
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      document.getElementById('menuItem_id').value = jsonResult.id
      document.getElementById('name').value = jsonResult.name
      document.getElementById('description').value = jsonResult.description
      document.getElementById('price').value = jsonResult.price
    }
  }
}
// POST

function postMenuItems () {
  const name = document.getElementById('name1').value
  const description = document.getElementById('description1').value
  const price = document.getElementById('price1').value
  const newMenuItem = {
    name: name,
    description: description,
    price: price
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/menu_items'

  xhttp.open('POST', url)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(newMenuItem))

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      getMenuItems()
    }
  }
}
