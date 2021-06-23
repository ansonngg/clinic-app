const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const md5 = require('md5');

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'user'
});

app.post('/createAc', (req, res) => {
  console.log(req.body);
  con.connect(err => {
    if (err) throw err;

    let sql = `INSERT INTO account (email, password, phone_number, address) VALUES ('${req.body.email1}', '${md5(req.body.password1)}', '${req.body.phoneNum}', '${req.body.address}')`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send('sent');
    });
  });
})

app.use(express.static('public'));
app.listen(80);