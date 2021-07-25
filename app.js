const express = require('express');
const app = express();

const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const privateKey = 'kjsdaghrt8734yerfgu';

app.use(cors());
app.use(express.json());

const con1 = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'user'
});

const con2 = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'consultation'
});

// Create an account
app.post('/createAc', (req, res) => {
  if (!(req.body.email && req.body.password && req.body.phoneNum && req.body.address)) return res.send('400: No information can be empty');

  if (req.body.phoneNum.length !== 8) return res.send('400: Invalid phone number');
  
  let sql = `INSERT INTO account (email, password, phone_number, address) VALUES ('${req.body.email}', MD5('${req.body.password}'), '${req.body.phoneNum}', '${req.body.address}')`;

  con1.query(sql, function (err, result) {
    if (err) return res.send('400: Bad request');

    res.send('200: Created account successfully');
  });
})

// Login
app.post('/login', (req, res) => {
  if (!(req.body.email && req.body.password)) return res.send('400: No information can be empty');

  let sql = `SELECT email, phone_number, address FROM account WHERE (email = '${req.body.email}' AND password = MD5('${req.body.password}'))`;

  con1.query(sql, function (err, result) {
    if (err) return res.send('400: Bad request');
    
    if (result.length > 0) {
      res.send(`200: Logged in successfully<br>Token: ${jwt.sign(JSON.parse(JSON.stringify(result[0])), privateKey)}`);
    }
    else {
      res.send('401: Incorrect email or password');
    }
  });
})

// Create consultation record
app.post('/createCon', (req, res) => {
  if (!(req.body.token && req.body.clinic && req.body.dName && req.body.pName && req.body.diag && req.body.medic && req.body.conFee && req.body.date)) return res.send('400: No information can be empty');

  // Verify indicator
  if (req.body.token.substring(0, 7) !== 'bearer ') return res.send('401: Invalid token');

  jwt.verify(req.body.token.substring(7), privateKey, (err, decoded) => {
    // Verify signature
    if (err) return res.send('401: Invalid token');

    // Verify payload
    let sql = `SELECT email FROM account WHERE (email = '${decoded.email}' AND phone_number = '${decoded['phone_number']}' AND address = '${decoded.address}')`;

    con1.query(sql, function (err, result) {
      if (err) return res.send('400: Bad request');
      
      if (result.length === 0) return res.send('401: Invalid token');

      // Create record
      sql = `INSERT INTO record (email, clinic, doctor_name, patient_name, diagnosis, medication, consultation_fee, date, follow_up) VALUES ('${decoded.email}', '${req.body.clinic}', '${req.body.dName}', '${req.body.pName}', '${req.body.diag}', '${req.body.medic}', '${req.body.conFee}', '${req.body.date}', '${req.body.followUp}')`;

      con2.query(sql, function (err, result) {
        if (err) {
          return res.send('400: Bad request');
        }
        res.send('200: Created consultation record successfully');
      });
    });
  })
})

// List consultation records
app.post('/listCon', (req, res) => {
  // Verify indicator
  if (req.body.token.substring(0, 7) !== 'bearer ') return res.send({str: '401: Invalid token'});

  jwt.verify(req.body.token.substring(7), privateKey, (err, decoded) => {
    // Verify signature
    if (err) return res.send({str: '401: Invalid token'});

    // Verify payload
    let sql = `SELECT email FROM account WHERE (email = '${decoded.email}' AND phone_number = '${decoded['phone_number']}' AND address = '${decoded.address}')`;

    con1.query(sql, function (err, result) {
      if (err) return res.send({str: '400: Bad request'});
      
      if (result.length === 0) return res.send({str: '401: Invalid token'});

      // List record
      let range = '';
      if (req.body.from) range += ` AND date >= '${req.body.from}'`;
      if (req.body.to) range += ` AND date <= '${req.body.to}'`;

      sql = `SELECT * FROM record WHERE (email = '${decoded.email}'${range}) LIMIT ${req.body.offset || 0}, ${req.body.limit || 25}`;

      con2.query(sql, function (err, result) {
        if (err) {
          return res.send({str: '400: Bad request'});
        }
        res.send(result);
      });
    });
  })
})

app.use(express.static('public'));
app.listen(80);