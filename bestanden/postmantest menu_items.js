const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Harm40!',
  database: 'molveno'
});
let bodyParser = require('body-parser');
app.use(bodyParser.json());


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });


app.listen(port, () => {
  console.log('Server running on port: ', port);
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
