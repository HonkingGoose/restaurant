const express = require('express')
const controller = express()
const port = 3000

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Harm40!',
  database: 'molveno'
})

connection.connect((err) => {
  if (err) {
    throw err
  } else {
    console.log('connected to database!')
  }
})

// import body-parser module here
const bodyParser = require('body-parser')

// say to the app (express instance) that he might sometimes render
// the body of a POST/PUT from JSON to an Object
controller.use(bodyParser.json())

// for now this is to say that everyone can reach this webserver
// from everywhere
controller.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

controller.get('/api/ingredients', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  connection.query('SELECT * FROM ingredients', (err, ingredients) => {
    if (err) throw err
    res.send(ingredients)
  })
})

// eerst testen met Postman
controller.get('/api/ingredients/:id', (request, response) => {
  const id = +request.params.id
  connection.query('select * from ingredients where id=?;', [id], (err, result) => {
    if (err) throw err
    response.send(result)
  })
})

controller.listen(port, () => {
  console.log('Server running on port: ', port)
})

controller.post('/api/ingredients', function (req, res) {
  const content = req.body

  connection.query('INSERT INTO ingredients SET ?', content, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

controller.delete('/api/ingredients/:id', function (req, res) {
  const id = +req.params.id

  connection.query('DELETE FROM ingredients WHERE id = ?', id, (err, result) => {
    if (err) throw err
    console.log('Deleted ', result.affectedRows, ' rows')
    res.status(204).end()
  })
})

controller.put('/api/ingredients/:id', function (req, res) {
  const id = +req.params.id
  const inputUser = req.body

  connection.query('UPDATE ingredients SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err
    connection.query('SELECT * FROM ingredients WHERE id = ?', id, (updatedErr, updatedingredients) => {
      if (updatedErr) throw updatedErr
      res.send(updatedingredients)
    })
  })
})
