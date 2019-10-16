'use strict'

function sendGuest () {
  const firstname = document.getElementById('firstname').value
  const prefix_lastname = document.getElementById('prefix_lastname').value
  const lastname = document.getElementById('lastname').value
  const email = document.getElementById('email').value
  const telephone = document.getElementById('telephone').value
  const newGuest = { firstname: firstname, prefix_lastname: prefix_lastname, lastname: lastname, email: email, telephone: telephone }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/contactinfos'

  xhttp.open('POST', url)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(newGuest))

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status == 200) {
      getGuests()
    }
  }
}

function getGuests () {
  document.getElementById('guesttable').innerHTML = ''

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/contactinfos'

  xhttp.open('GET', url)
  xhttp.send()

  xhttp.onreadystatechange = (result) => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('guesttable')
        const insertRow = table.insertRow()

        for (const key in element) {
          const cell = insertRow.insertCell()
          cell.innerHTML = element[key]
        }
      })
    }
  }
}

function getGuestById () {
  const id = document.getElementById('guestId').value

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/contactinfos/' + id

  xhttp.open('GET', url)
  xhttp.send()
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('guestByIdTable')
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
function deleteContactinfosById () {
  const id = +document.getElementById('contactinfosId').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/contactinfos/' + id
  console.log(url)

  xhttp.open('DELETE', url)
  console.log(url)
  xhttp.send()
  // reset contactinfos
}

function putContactinfosById () {
  const id = +document.getElementById('contactinfosId1').value
  const firstname = document.getElementById('firstname1').value
  const prefix_lastname = document.getElementById('prefix_lastname1').value
  const lastname = document.getElementById('lastname1').value
  const email = document.getElementById('email1').value
  const telephone = document.getElementById('telephone1').value

  const newContactinfosById = {
    id: id,
    firstname: firstname,
    prefix_lastname: prefix_lastname,
    lastname: lastname,
    email: email,
    telephone: telephone
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/contactinfos/' + id

  xhttp.open('put', url)
  xhttp.setRequestHeader('Content-Type', 'application/json')
  xhttp.send(JSON.stringify(newContactinfosById))
}
