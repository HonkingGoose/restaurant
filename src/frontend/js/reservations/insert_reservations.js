'use strict'

function postReservations () {
  const reservationDate = document.getElementById('reservation_date').value
  const startTime = document.getElementById('start_time').value
  const hideMenuPrice = document.getElementById('hide_menu_price').checked
  const fullName = document.getElementById('fullName').value
  const telephone = document.getElementById('telephone').value
  const numberOfGuests = document.getElementById('number_of_guests').value
  const allergy = $('#allergy').val()
  const allergySet = allergy.toString()
  const specialNeeds = document.getElementById('special_needs').value

  const newReservation = {
    reservation_date: reservationDate,
    start_time: startTime,
    hide_menu_price: hideMenuPrice,
    number_of_guests: numberOfGuests,
    allergy: allergySet,
    special_needs: specialNeeds,
    fullName: fullName,
    telephone: telephone
  }

  const date = new Date();
  const nowDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  const nowTime = date.getHours() + ':' + date.getMinutes()

  const number1 = numberOfGuests === ''
  const number2 = numberOfGuests <= 0
  const checkDate = reservationDate < nowDate
  const checkTime = startTime < nowTime
  const checkName = fullName === ''
  const checkTelephone = telephone === ''

  if (number1 || number2) {
    console.log('fail')
    document.querySelector('.invalidNumber').classList.add('visible');
  }

  if (checkDate) {
    console.log('fail')
    document.querySelector('.invalidDate').classList.add('visible');
  }

  if (checkDate && checkTime) {
    console.log('fail')
    document.querySelector('.invalidTime').classList.add('visible');
  }

  if (checkName) {
    console.log('fail')
    document.querySelector('.invalidName').classList.add('visible');
  }

  if (checkTelephone) {
    console.log('fail')
    document.querySelector('.invalidTelephone').classList.add('visible')
  }

  if (number1 === true || number2 === true || checkDate === true || checkTime === true || checkName === true || checkTelephone === true) {
    return
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/reservations'
  xhttp.open('POST', url)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(newReservation))
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      console.log(newReservation)
    }
  }
}

function time () {
  const today = new Date()
  const hours = today.getHours()
  const minutes = (today.getMinutes() < 10? '0' : '') + today.getMinutes();

  const time = hours + ':' + minutes

  console.log(time)

  document.getElementById('start_time').defaultValue = time
}
time()

function date () {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  document.getElementById('reservation_date').defaultValue = date
}
date()

function resetDate () {
      document.querySelector('.invalidDate').classList.remove('visible')
}
function resetTime () {
  document.querySelector('.invalidTime').classList.remove('visible')
}
function resetNumber () {
  document.querySelector('.invalidNumber').classList.remove('visible')
}
function resetName () {
  document.querySelector('.invalidName').classList.remove('visible')
}
function resetTelephone () {
  document.querySelector('.invalidTelephone').classList.remove('visible')
}
