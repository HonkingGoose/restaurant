'use strict'

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'app-rest',
  password: 'dkjuy34or8wr3f9w4',
  database: 'molveno_dev_personal'
})

connection.connect((err) => {
  if (err) throw err
  console.log('Connected!')
})

const express = require('express')
const app = express()
const port = 3000

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

app.use(bodyParser.json())

app.listen(port, () => {
  console.log('Server running on port: ', port)
})

function formatDates (input) {
  const formattedInput = input
  console.log('Before format: =>')
  console.log(formattedInput[0])

  for (let i = 0; i < Object.values(formattedInput[0]).length; i++) {
    let row = Object.values(formattedInput[0])[i]
    console.log(row)

    if (typeof (row) === 'object' && row instanceof Date) {
      row.setHours(row.getHours() + 1)
      row = row.toISOString().substring(0, 10)
    }
  }

  console.log('After format: =>')
  console.log(formattedInput)
  return formattedInput
}

// CONTACTINFOS BEGIN

app.get('/api/contactinfos', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  connection.query('SELECT * FROM contactinfos', (err, contactinfos) => {
    if (err) throw err
    res.send(contactinfos)
  })
})

app.get('/api/contactinfos/:id', (req, res) => {
  const id = +req.params.id
  connection.query('SELECT * FROM contactinfos WHERE id = ?', [id], (err, result) => {
    if (err) throw err
    res.send(result[0])
  })
})

app.post('/api/contactinfos', function (req, res) {
  const content = req.body
  console.log(content)
  connection.query('INSERT INTO contactinfos SET ?', content, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.delete('/api/contactinfos/:id', function (req, res) {
  const id = +req.params.id

  connection.query('DELETE FROM contactinfos WHERE id = ?', id, (err, result) => {
    if (err) throw err
    console.log('Deleted', result.affectedRows, ' rows')
    res.status(204).end()
  })
})

app.put('/api/contactinfos/:id', function (req, res) {
  const id = +req.params.id
  const inputUser = req.body
  console.log(inputUser)

  connection.query('UPDATE contactinfos SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err
    connection.query('SELECT * FROM contactinfos WHERE id = ?', id, (updatedErr, updatedContactinfos) => {
      if (updatedErr) throw updatedErr
      res.send(updatedContactinfos)
    })
  })
})

// CONTACTINFOS END
// RESTAURANT_TABLES BEGIN

app.get('/api/restaurant_tables', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  connection.query('SELECT * FROM restaurant_tables', (err, restauranTables) => {
    if (err) throw err
    res.send(restauranTables)
  })
})

app.get('/api/restaurant_tables/:id', (req, res) => {
  const id = +req.params.id
  connection.query('SELECT * FROM restaurant_tables WHERE id = ?', [id], (err, result) => {
    if (err) throw err
    res.send(result[0])
  })
})

app.post('/api/restaurant_tables', [
  check('capacity').isNumeric(),
  check('table_callsign').not().isEmpty()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).send(errors.array())
    // return res.status(422).json({ errors: errors.array() });
  } else {
    const id = +req.params.id
    const inputUser = req.body
    const content = req.body
    connection.query('INSERT INTO restaurant_tables SET ?', content, (err, result) => {
      if (err) throw err
      res.send(result)
    })
  }
})

app.delete('/api/restaurant_tables/:id', function (req, res) {
  const id = +req.params.id

  connection.query('DELETE FROM restaurant_tables WHERE id = ?', id, (err, result) => {
    if (err) throw err
    console.log('Deleted', result.affectedRows, ' rows')
    res.status(204).end()
  })
})

app.put('/api/restaurant_tables/:id', [
  check('capacity').isNumeric(),
  check('table_callsign').not().isEmpty()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).send(errors.array())
  } else {
    const id = +req.params.id
    const inputUser = req.body
    console.log(inputUser)

    connection.query('UPDATE restaurant_tables SET ? WHERE id = ?', [inputUser, id], (err, response) => {
      if (err) throw err
      connection.query('SELECT * FROM restaurant_tables WHERE id = ?', id, (updatedErr, updatedRestaurantTables) => {
        if (updatedErr) throw updatedErr
        res.send(updatedRestaurantTables)
      })
    })
  }
})

// RESTAURANT_TABLES END
// RESTAURANT_INVOICES BEGIN

app.get('/api/restaurant_invoices', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  connection.query('SELECT * FROM  restaurant_invoices', (err, restaurantInvoices) => {
    if (err) throw err
    res.send(restaurantInvoices)
  })
})

app.get('/api/restaurant_invoices/:id', (req, res) => {
  const id = +req.params.id
  connection.query('SELECT * FROM restaurant_invoices WHERE id = ?', [id], (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.post('/api/restaurant_invoices', function (req, res) {
  const content = req.body
  console.log(content)
  connection.query('INSERT INTO  restaurant_invoices SET ?', content, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.delete('/api/restaurant_invoices/:id', function (req, res) {
  const id = +req.params.id

  connection.query('DELETE FROM  restaurant_invoices WHERE id = ?', id, (err, result) => {
    if (err) throw err
    console.log('Deleted', result.affectedRows, ' rows')
    res.status(204).end()
  })
})

app.put('/api/restaurant_invoices/:id', function (req, res) {
  const id = +req.params.id
  const inputUser = req.body

  connection.query('UPDATE  restaurant_invoices SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err
    connection.query('SELECT * FROM  restaurant_invoices WHERE id = ?', id, (updatedErr, updatedRestauranInvoices) => {
      if (updatedErr) throw updatedErr
      res.send(updatedRestauranInvoices)
    })
  })
})

// RESTAURANT_INVOICES END
// ALL_MENUS BEGIN

app.get('/api/all_menus', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  connection.query('SELECT * FROM all_menus', (err, allMenus) => {
    if (err) throw err
    res.send(allMenus)
  })
})

app.get('/api/all_menus/:id', (req, res) => {
  const id = +req.params.id
  connection.query('SELECT * FROM all_menus WHERE id = ?', [id], (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.delete('/api/all_menus/:id', (req, res) => {
  const id = +req.params.id
  connection.query('DELETE FROM all_menus WHERE id = ?', [id], (err, result) => {
    if (err) throw err
    console.log('Deleted ', result.affectedRows, ' rows')
    res.status(204).end()
  })
})

app.put('/api/all_menus/:id', (req, res) => {
  const id = +req.params.id
  const inputUser = req.body
  connection.query('UPDATE all_menus SET ? WHERE id = ?', [inputUser, id], (err, res1) => {
    if (err) throw err
    connection.query('SELECT * FROM all_menus WHERE id = ?', id, (updateErr, result) => {
      if (updateErr) throw err
      res.send(result[0])
    })
  })
})

app.post('/api/all_menus', (req, res) => {
  const content = req.body
  connection.query('INSERT INTO all_menus SET ?', content, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

// ALL_MENUS END
// RESTAURANT_ORDERS BEGIN

app.post('/api/restaurant_orders', (req, res) => {
  const content = req.body
  const d = new Date()
  const year = d.getFullYear()
  const month = (d.getMonth() + 1)
  const day = (d.getDate() + 1)
  const hours = (d.getHours() + 2)
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  content.completed = false
  content.order_timestamp = year + '-' + month + '-' + day + '-' + hours + '-' + minutes + '-' + seconds
  connection.query('INSERT INTO restaurant_orders SET ?', content, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.get('/api/restaurant_orders', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  connection.query('SELECT * FROM restaurant_orders', (err, restaurantOrders) => {
    if (err) throw err
    res.send(restaurantOrders)
  })
})

app.get('/api/restaurant_orders/:id', (req, res) => {
  const id = +req.params.id
  connection.query('SELECT * FROM restaurant_orders WHERE id = ?', [id], (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.put('/api/restaurant_orders/:id', (req, res) => {
  const id = +req.params.id
  const inputUser = req.body
  connection.query('UPDATE restaurant_orders SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err
    connection.query('SELECT * FROM restaurant_orders WHERE id = ?', id, (updateErr, updateRestaurantOrders) => {
      if (updateErr) throw err
      res.send(updateRestaurantOrders)
    })
  })
})

app.delete('/api/restaurant_orders/:id', (req, res) => {
  const id = +req.params.id
  connection.query('DELETE FROM restaurant_orders WHERE id = ?', [id], (err, result) => {
    if (err) throw err
    console.log('Deleted ', result.affectedRows, ' rows')
    res.status(204).end()
  })
})

// RESTAURANT_ORDERS END
// RESERVATIONS BEGIN

app.post('/api/reservations', (req, res) => {
  const content = req.body
  connection.query('INSERT INTO reservations SET ?', content, (err, result) => {
    if (err) throw err
    let id = result.insertId;
    connection.query('select * from reservations where id=?', [id], (error, resultaat) => {
        res.status(201)
        res.send(resultaat[0]);
    });
  })
})

app.get('/api/reservations', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  connection.query('SELECT * FROM reservations', (err, reservations) => {
    if (err) throw err
    // Edit the date to a workable format
    for (let i = 0; i < reservations.length; i++) {
      const date = JSON.stringify(reservations[i].reservation_date)
      const dateSplit1 = date.split('T')[0]
      const dateSplit2 = dateSplit1.split('\"')[1]
      reservations[i].reservation_date = dateSplit2
    }
    res.send(reservations)
  })
})

app.get('/api/reservations/:id', (req, res) => {
  const id = +req.params.id
  if (id < 1) { res.status(404).end(); return }
  connection.query('SELECT * FROM reservations WHERE id = ?', [id], (err, result) => {
  if (err) {
    res.status(404)
    throw err
  }
  else if (result.length < 1) {
    res.status(404)
  }
    res.send(result[0])
  })
})

app.put('/api/reservations/:id', (req, res) => {
  const inputUser = req.body
  const id = +req.params.id
  if (id < 1) { res.status(404).end(); return }
  connection.query('UPDATE reservations SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err
    connection.query('select * from reservations where id=?', [id], (error, resultaat) => {
        res.status(202)
        res.send(resultaat[0]);
    });
  })
})
app.delete('/api/reservations/:id', (req, res) => {
  const id = +req.params.id
  if (id < 1) { res.status(404).end(); return }
  connection.query('DELETE FROM reservations WHERE id = ?', [id], (err, result) => {
    if (err) throw err
    console.log('Deleted ', result.affectedRows, ' rows')
    res.status(204).end()
  })
})

// RESERVATIONS END
// INGREDIENTS BEGIN

app.get('/api/ingredients', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  connection.query('SELECT * FROM ingredients', (err, ingredients) => {
    if (err) throw err
    res.send(ingredients)
  })
})

app.get('/api/ingredients/:id', (request, response) => {
  const id = +request.params.id

  if (id < 1) { response.status(404).end(); return }

  connection.query('select * from ingredients where id=?;', [id], (err, result) => {
    if (err) throw err
    response.send(result[0])
  })
})

app.post('/api/ingredients', function (req, res) {
  const content = req.body

  connection.query('INSERT INTO ingredients SET ?', content, (err, result) => {
    if (err) throw err
    res.send(result);
  })
})

app.delete('/api/ingredients/:id', function (req, res) {
  const id = +req.params.id

  if (id < 1) { res.status(404).end(); return }

  connection.query('DELETE FROM ingredients WHERE id = ?', id, (err, result) => {
    if (err) throw err
    console.log('Deleted ', result.affectedRows, ' rows')
    res.status(204).end()
  })
})

app.put('/api/ingredients/:id', function (req, res) {
  const id = +req.params.id
  const inputUser = req.body

  if (id < 1) { res.status(404).end(); return }

  connection.query('UPDATE ingredients SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err
    connection.query('SELECT * FROM ingredients WHERE id = ?', id, (updatedErr, updatedingredients) => {
      if (updatedErr) throw updatedErr
      res.send(updatedingredients)
    })
  })
})

// INGREDIENTS END
// MENU_ITEMS BEGIN

app.get('/api/menu_items', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  connection.query('SELECT * FROM menu_items', (err, menuItems) => {
    if (err) throw err
    res.send(menuItems)
  })
})

app.post('/api/menu_items', function (req, res) {
  const content = req.body

  connection.query('INSERT INTO menu_items SET ?', content, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.delete('/api/menu_items/:id', function (req, res) {
  const id = +req.params.id

  connection.query('DELETE FROM menu_items WHERE id = ?', id, (err, result) => {
    if (err) throw err
    console.log('Deleted', result.affectedRows, 'rows')
    res.status(204).end()
  })
})
app.get('/api/menu_items/:id', (request, response) => {
  const id = +request.params.id
  connection.query('select * from menu_items where id=?;', [id], (err, result) => {
    if (err) throw err
    response.send(result[0])
  })
})

app.put('/api/menu_items/:id', function (req, res) {
  const id = +req.params.id
  const inputUser = req.body

  connection.query('UPDATE menu_items SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err
    connection.query('SELECT * FROM menu_items WHERE id = ?', id, (updatedErr, updatedMenuItems) => {
      if (updatedErr) throw updatedErr
      res.send(updatedMenuItems)
    })
  })
})

// MENU_ITEMS END

// HonkingGoose test
app.use(express.static('../frontend'))
