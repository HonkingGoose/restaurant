/* eslint-disable no-unused-vars */
// GET
function getMenus () {
  document.getElementById('menuTable').innerHTML = ''
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/all_menus'

  xhttp.open('GET', url)
  xhttp.send()

  xhttp.onreadystatechange = (result) => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('menuTable')
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
function getMenusById () {
  document.getElementById('menuTable').innerHTML = ''
  const id = +document.getElementById('menuId').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/all_menus/' + id

  xhttp.open('GET', url)
  xhttp.send()

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('menuTableById')
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
function deleteMenusById () {
  const id = +document.getElementById('menuId1').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/all_menus/' + id

  xhttp.open('DELETE', url)
  xhttp.send()
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      getMenus()
    }
  }
};
// PUT BY ID
function updateMenusById () {
  const id = +document.getElementById('menu_id').value
  const menuName = document.getElementById('menu_name').value
  const newMenu = {
    id: id,
    menu_name: menuName
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/all_menus/' + id

  xhttp.open('put', url)
  xhttp.setRequestHeader('Content-Type', 'application/json')
  xhttp.send(JSON.stringify(newMenu))
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      document.getElementById('menu_id').value = jsonResult.id
      document.getElementById('menu_name').value = jsonResult.menu_name
      getMenus()
    }
  }
}
// POST
function postMenus () {
  const menuName = document.getElementById('menu_name1').value

  const newMenu = {
    menu_name: menuName
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/all_menus'

  xhttp.open('POST', url)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(newMenu))

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      getMenus()
    }
  }
}
