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

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Server running on port: ', port)
});

app.get('/api/contactinfos', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT * FROM contactinfos', (err, contactinfos) => {
    if (err) throw err;
    res.send(contactinfos);
  });
});

app.get("/api/contactinfos/:id", (req, res) => {
  const id = +req.params.id;
  connection.query("SELECT * FROM contactinfos WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});



app.post('/api/contactinfos', function (req, res) {
  const content = req.body;
  connection.query('INSERT INTO contactinfos SET ?', content, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
  // console.log(content);
  // res.send(content);
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
  console.log(inputUser);

  connection.query('UPDATE contactinfos SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err;
    connection.query('SELECT * FROM contactinfos WHERE id = ?', id, (updatedErr, updatedContactinfos) => {
      if (updatedErr) throw updatedErr
      res.send(updatedContactinfos);
    });
  });
});

//    restaurant tables

app.get('/api/restaurant_tables', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT * FROM restaurant_tables', (err, restaurant_tables) => {
    if (err) throw err;
    res.send(restaurant_tables);
  });
});

app.get("/api/restaurant_tables/:id", (req, res) => {
  const id = +req.params.id;
  connection.query("SELECT * FROM restaurant_tables WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});



app.post('/api/restaurant_tables', function (req, res) {
  const content = req.body;
  connection.query('INSERT INTO restaurant_tables SET ?', content, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
  // console.log(content);
  // res.send(content);
});

app.delete('/api/restaurant_tables/:id', function (req, res) {

  const id = +req.params.id;

  connection.query('DELETE FROM restaurant_tables WHERE id = ?', id, (err, result) => {
    if (err) throw err;
    console.log('Deleted', result.affectedRows, ' rows');
    res.status(204).end();
  });
});

app.put('/api/restaurant_tables/:id', function (req, res) {
  const id = +req.params.id;
  const inputUser = req.body;

  connection.query('UPDATE restaurant_tables SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err;
    connection.query('SELECT * FROM restaurant_tables WHERE id = ?', id, (updatedErr, updatedRestaurant_tables) => {
      if (updatedErr) throw updatedErr
      res.send(updatedRestaurant_tables);
    });
  });
});

//  einde restaurant tables

// start restaurant invoices

app.get('/api/restaurant_invoices', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT * FROM  restaurant_invoices', (err,  restaurant_invoices) => {
    if (err) throw err;
    res.send( restaurant_invoices);
  });
});

app.get("/api/restaurant_invoices/:id", (req, res) => {
  const id = +req.params.id;
  connection.query("SELECT * FROM restaurant_invoices WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.post('/api/restaurant_invoices', function (req, res) {
  const content = req.body;
  connection.query('INSERT INTO  restaurant_invoices SET ?', content, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
  // console.log(content);
  // res.send(content);
});


app.delete('/api/restaurant_invoices/:id', function (req, res) {

  const id = +req.params.id;

  connection.query('DELETE FROM  restaurant_invoices WHERE id = ?', id, (err, result) => {
    if (err) throw err;
    console.log('Deleted', result.affectedRows, ' rows');
    res.status(204).end();
  });
});

app.put('/api/restaurant_invoices/:id', function (req, res) {
  const id = +req.params.id;
  const inputUser = req.body;

  connection.query('UPDATE  restaurant_invoices SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if (err) throw err;
    connection.query('SELECT * FROM  restaurant_invoices WHERE id = ?', id, (updatedErr, updatedRestaurant_invoices) => {
      if (updatedErr) throw updatedErr
      res.send(updatedRestaurant_invoices);
    });
  });
});

// einde restaurant invoices



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
  const d = new Date();
  const year = d.getFullYear();
  const month = (d.getMonth() + 1);
  const day = (d.getDate() + 1);
  const hours = (d.getHours() + 2);
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  content["completed"] = false;
  content["order_timestamp"] = year+"-"+month+"-"+day+"-"+hours+"-"+minutes+"-"+seconds;
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

app.get("/api/reservations/:id", (req, res) => {
    const id = +req.params.id;
    connection.query("SELECT * FROM reservations WHERE id = ?", [id], (err, result) => {
        if(err) throw err;
        res.send(result);
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

app.get('/api/ingredients', (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    connection.query('SELECT * FROM ingredients', (err, ingredients) => {
        if(err) throw err;
        res.send(ingredients);
    });

});


app.get('/api/ingredients/:id', (request, response) => {
    const id = +request.params.id;
    connection.query('select * from ingredients where id=?;', [id], (err, result) => {
        if(err) throw err;
        response.send(result);
    });
  });


app.post('/api/ingredients', function (req, res) {

    let content = req.body;

    connection.query('INSERT INTO ingredients SET ?', content, (err, result) => {
        if (err) throw err;
        res.send(result)
    });

});

app.delete('/api/ingredients/:id', function(req, res) {

    let id = +req.params.id;

    connection.query('DELETE FROM ingredients WHERE id = ?', id, (err, result) => {
        if(err) throw err;
        console.log('Deleted ', result.affectedRows,' rows');
        res.status(204).end();
    });
});

app.put('/api/ingredients/:id', function(req, res) {

    let id = +req.params.id;
    let inputUser = req.body;

    connection.query('UPDATE ingredients SET ? WHERE id = ?', [inputUser, id], (err, response) => {
        if(err) throw err;
        connection.query('SELECT * FROM ingredients WHERE id = ?', id, (updatedErr, updatedingredients) => {
            if(updatedErr) throw updatedErr;
            res.send(updatedingredients);
        });
    });
});

app.get('/api/menu_items', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  connection.query('SELECT * FROM menu_items', (err, menu_items) => {
    if(err) throw err;
    res.send(menu_items);
  });
});

app.post('/api/menu_items', function (req, res) {

    let content = req.body;

    connection.query('INSERT INTO menu_items SET ?', content, (err, result) => {
        if (err) throw err;
        res.send(result)
    });

});

app.delete('/api/menu_items/:id', function(req, res) {
  let id = +req.params.id;

  connection.query('DELETE FROM menu_items WHERE id = ?', id, (err, result) => {
    if(err) throw err;
    console.log('Deleted', result.affectedRows, 'rows');
    res.status(204).end();
  });

});
app.get('/api/menu_items/:id', (request, response) => {
    const id = +request.params.id;
    connection.query('select * from menu_items where id=?;', [id], (err, result) => {
        if(err) throw err;
        response.send(result);
    });
  });

app.put('/api/menu_items/:id', function(req, res) {
  let id = +req.params.id;
  let inputUser = req.body;

  connection.query('UPDATE menu_items SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if(err) throw err;
    connection.query('SELECT * FROM menu_items WHERE id = ?', id, (updatedErr, updatedMenu_items) => {
      if(updatedErr) throw updatedErr;
      res.send(updatedMenu_items);
    });
  });
});
