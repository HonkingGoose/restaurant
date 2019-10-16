/* eslint-disable no-unused-vars */
// GET
function getIngredients () {
  document.getElementById('ingredientTable').innerHTML = ''
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/ingredients'

  xhttp.open('GET', url)
  xhttp.send()

  xhttp.onreadystatechange = (result) => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('ingredientTable')
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
function getIngredientsById () {
  document.getElementById('ingredientTable').innerHTML = ''
  const id = +document.getElementById('ingredientId').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/ingredients/' + id

  xhttp.open('GET', url)
  xhttp.send()

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      jsonResult.forEach(element => {
        const table = document.getElementById('ingredientTableById')
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
function deleteIngredientsById () {
  const id = +document.getElementById('ingredientsId1').value
  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/ingredients/' + id

  xhttp.open('DELETE', url)
  xhttp.send()
};
// PUT BY ID
function updateIngredientsById () {
  const id = +document.getElementById('ingredient_id').value
  const name = document.getElementById('name').value
  const allergen = document.getElementById('allergen').value
  const unitOfMeasurement = document.getElementById('unit_of_measurement').value
  const amountInStock = document.getElementById('amount_in_stock').value
  const newIngredient = {
    id: id,
    name: name,
    allergen: allergen,
    unit_of_measurement: unitOfMeasurement,
    amount_in_stock: amountInStock
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/ingredients/' + id

  xhttp.open('put', url)
  xhttp.setRequestHeader('Content-Type', 'application/json')
  xhttp.send(JSON.stringify(newIngredient))
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResult = JSON.parse(xhttp.responseText)
      document.getElementById('ingredient_id').value = jsonResult.id
      document.getElementById('name').value = jsonResult.name
      document.getElementById('allergen').value = jsonResult.allergen
      document.getElementById('unit_of_measurement').value = jsonResult.unit_of_measurement
      document.getElementById('amount_in_stock').value = jsonResult.amount_in_stock
    }
  }
}
// POST

function postIngredients () {
  const name = document.getElementById('name1').value
  const allergen = document.getElementById('allergen1').value
  const unitOfMeasurement = document.getElementById('unit_of_measurement1').value
  const amountInStock = document.getElementById('amount_in_stock1').value
  const newIngredient = {
    name: name,
    allergen: allergen,
    unit_of_measurement: unitOfMeasurement,
    amount_in_stock: amountInStock
  }

  const xhttp = new XMLHttpRequest()
  const url = 'http://localhost:3000/api/ingredients'

  xhttp.open('POST', url)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(newIngredient))

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      getIngredients()
    }
  }
}
