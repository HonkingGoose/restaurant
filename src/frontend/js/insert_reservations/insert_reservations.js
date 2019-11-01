'use strict'

function postReservations () {
    const reservationDate = document.getElementById('reservation_date').value
    const startTime = document.getElementById('start_time').value
    const hideMenuPrice = document.getElementById('hide_menu_price').value
    const numberOfGuests = document.getElementById('number_of_guests').value
    const allergy = document.getElementById('allergy').value
    const specialNeeds = document.getElementById('special_needs').value
    const contactInfosId = document.getElementById('contactinfos_id').value
    
    const newReservation = {
      reservation_date: reservationDate,
      start_time: startTime,
      hide_menu_price: hideMenuPrice,
      number_of_guests: numberOfGuests,
      allergy: allergy,
      special_needs: specialNeeds,
      contactinfos_id: contactInfosId
    }
  
    const xhttp = new XMLHttpRequest()
    const url = 'http://localhost:3000/api/reservations'
  
    xhttp.open('POST', url)
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(JSON.stringify(newReservation))
  
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        
      }
    }
  }
  