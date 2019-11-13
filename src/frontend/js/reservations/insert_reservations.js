'use strict'

function postReservations () {
  const reservationDate = document.getElementById('reservation_date').value
  const startTime = document.getElementById('start_time').value
  const hideMenuPrice = document.getElementById('hide_menu_price').checked
  const numberOfGuests = document.getElementById('number_of_guests').value
  let allergy = $('#allergy').val();
  let allergySet = allergy.toString();

  console.log(reservationDate)

  const specialNeeds = document.getElementById('special_needs').value


  // const contactInfosId = document.getElementById('contactinfos_id').value

  const newReservation = {
    reservation_date: reservationDate,
    start_time: startTime,
    hide_menu_price: hideMenuPrice,
    number_of_guests: numberOfGuests,
    allergy: allergySet,
    special_needs: specialNeeds,
    // contactinfos_id: contactInfosId
    contactinfos_id: 1
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
