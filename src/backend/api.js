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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/contactinfos', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    connection.query('SELECT * FROM contactinfos', (err, contactinfos) => {
      if(err) throw err;
      res.send(contactinfos);
    });
});

let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/contactinfos', function (req, res) {
  let content = req.body;
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

app.delete('/api/contactinfos/:id', function(req, res) {

  let id = +req.params.id;

  connection.query('DELETE FROM contactinfos WHERE id = ?', id, (err, result) => {
      if(err) throw err;
      console.log('Deleted', result.affectedRows,' rows');
      res.status(204).end();
  });
});

app.put('/api/contactinfos/:id', function(req, res) {
  let id = +req.params.id;
  let inputUser = req.body;

  connection.query('UPDATE contactinfos SET ? WHERE id = ?', [inputUser, id], (err, response) => {
    if(err) throw err;
    connection.query('SELECT * FROM contactinfos WHERE id = ?', id, (updatedErr, updatedContactinfos) => {
      if(updatedErr) throw updatedErr
      res.send(updatedContactinfos);
    });
  });
});
