const express = require('express');
const mysql = require('mysql2');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
//const cors = require('cors');
//app.use(express.json());
const authenticateToken = require('./auth.js/authenticateToken');
const db = require('./db');
//const secretKey = 'cha-secret-key'
const customers = require('./routes/customer');
const reservations = require('./routes/reservation');
//const room = require('./routes/room');
//const billing = require('./routes/billing');
const admin = require('./routes/admin');

app.use(bodyParser.json());

app.use(customers);
app.use(reservations);
//app.use(room);
//app.use(billing);
app.use(admin);

const PORT = 3001;

app.get('/api', (req, res) => {
  res.json({ message: 'Restful API Backend Using ExpresJS' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3001}/api`);
});