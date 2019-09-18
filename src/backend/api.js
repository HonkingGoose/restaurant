"use strict"

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'app-rest',
  password: 'dkjuy34or8wr3f9w4',
  database: 'molveno_dev_personal'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const express = require('express');
const app = express();
const port = 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/contactinfos', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT * FROM contactinfos', (err, contactinfos) => {
    if (err) throw err;
    res.send(contactinfos);
  });
});

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/contactinfos', function (req, res) {
  const content = req.body;
  connection.query('INSERT INTO contactinfos SET ?', content, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
  // console.log(content);
  // res.send(content);
});

app.listen(port, () => {
  console.log('Server running on port: ', port)
});

app.delete('/api/contactinfos/:id', function (req, res) {

  const id = +req.params.id;

  connection.query('DELETE FROM contactinfos WHERE id = ?', id, (err, result) => {
    if (err) throw err;
    console.log('Deleted', result.affectedRows, ' rows');
    res.status(204).end();
  });
});

app.put('/api/contactinfos/:id', function (req, res) {
  const id = +req.params.id;
  const inputUser = req.body;

  connection.query('UPDATE contactinfos SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err;
    connection.query('SELECT * FROM contactinfos WHERE id = ?', id, (updatedErr, updatedContactinfos) => {
      if (updatedErr) throw updatedErr
      res.send(updatedContactinfos);
    });
  });
});

app.get("/api/all_menus", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  connection.query("SELECT * FROM all_menus", (err, all_menus) => {
    if (err) throw err;
    res.send(all_menus);
  });
});

app.post("/api/all_menus", (req, res) => {
  const content = req.body;
  connection.query("INSERT INTO all_menus SET ?", content, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

app.post("/api/restaurant_orders", (req, res) => {
  const content = req.body;
  connection.query("INSERT INTO restaurant_orders SET ?", content, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

app.get("/api/restaurant_orders", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  connection.query("SELECT * FROM restaurant_orders", (err, restaurant_orders) => {
    if (err) throw err;
    res.send(restaurant_orders);
    console.log(restaurant_orders);
  });
});

app.get("/api/restaurant_orders/:id", (req, res) => {
  const id = +req.params.id;
  connection.query("SELECT * FROM restaurant_orders WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/api/restaurant_orders/:id", (req, res) => {
  const id = +req.params.id;
  const inputUser = req.body;
  connection.query("UPDATE restaurant_orders SET ? WHERE id = ?", [inputUser, id], (err, response) => {
    if (err) throw err;
    connection.query("SELECT * FROM restaurant_orders WHERE id = ?", id, (updateErr, updateRestaurant_orders) => {
      if (updateErr) throw err;
      res.send(updateRestaurant_orders);
    });
  });
});

app.delete("/api/restaurant_orders/:id", (req, res) => {
  const id = +req.params.id;
  connection.query("DELETE FROM restaurant_orders WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    console.log("Deleted ", result.affectedRows, " rows");
    res.status(204).end();
  });
});

app.post("/api/reservations", (req, res) => {
  const content = req.body;
  connection.query("INSERT INTO reservations SET ?", content, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

app.get("/api/reservations", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  connection.query("SELECT * FROM reservations", (err, reservations) => {
    if (err) throw err;
    res.send(reservations);
    console.log(reservations);
  });
});

app.put("/api/reservations/:id", (req, res) => {
  const id = +req.params.id;
  const inputUser = req.body;
  connection.query("UPDATE reservations SET ? WHERE id = ?", [inputUser, id], (err, response) => {
    if (err) throw err;
    connection.query("SELECT * FROM reservations WHERE id = ?", id, (updateErr, updateReservations) => {
      if (updateErr) throw err;
      res.send(updateReservations);
    });
  });
});

app.delete("/api/reservations/:id", (req, res) => {
  const id = +req.params.id;
  connection.query("DELETE FROM reservations WHERE id = ?", id, (err, result) => {
    if (err) throw err;
    console.log("Deleted ", result.affectedRows, " rows");
    res.status(204).end();
  });
});
