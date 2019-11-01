'use strict'

// eslint-disable-next-line no-unused-vars
function postContactinfos() {
  const firstName = document.getElementById('firstname').value
  const prefixLastName = document.getElementById('prefix_lastname').value
  const lastName = document.getElementById('lastname').value
  const email = document.getElementById('emailaddress').value
  const phoneNumber = document.getElementById('phonenumber').value
  const domicile = document.getElementById('domicile').value
  const newContactinfos = {

    firstname: firstName,
    prefix_lastname: prefixLastName,
    lastname: lastName,
    email: email,
    telephone: phoneNumber,
   // domicile: domicile
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/contactinfos'

  xhttp.open('POST', url)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(newContactinfos))

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200)
      // eslint-disable-next-line no-undef

  }
}
