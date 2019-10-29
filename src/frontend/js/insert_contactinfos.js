'use strict'

function postContactinfos () {
    const firstName = document.getElementById('firstname').value
    const prefixLastName = document.getElementById('prefix_lastname').value
    const lastName = document.getElementById('lastname').value
    const email = document.getElementById('email').value
    const phoneNumber = document.getElementById('telephone').value
    const newContactinfos = {
     //vanaf hier aanpassen//
      reservation_date: reservationDate,
      start_time: startTime,
      hide_menu_price: hideMenuPrice,
      number_of_guests: numberOfGuests,
      allergy: allergy,
      special_needs: specialNeeds,
      contactinfos_id: contactInfosId
    }
  
    const xhttp = new XMLHttpRequest()
    const url = 'http://localhost:3000/api/insert_reservations'
  
    xhttp.open('POST', url)
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(JSON.stringify(newReservation))
  
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        getreservations()
      }
    }
  }
  