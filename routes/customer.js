const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

const db = require ('../db');
const secretKey = require ('../secretkey/secret.js');


// Get all customers
router.get('/api/customers',  (req, res) => {
  try {
    db.query('SELECT * FROM customer', (err, result) =>{
      if(err){
        console.error('Error fetching customers', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Error fetching customers', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// Get a single customer by ID
router.get('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query('SELECT * FROM customer WHERE id = ?', [id], (err, result) => {
      if(err){
        console.error('Error fetching customer', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(200).json(result[0]);
      }
    });
  } catch (error) {
    console.error('Error fetching customer', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// Create a new customer
router.post('/api/customers', (req, res) => {
  const { fname, lname, email, contact, address } = req.body;
  try {
    db.query('INSERT INTO customer (fname, lname, email, contact, address) VALUES (?, ?, ?, ?, ?)', [fname, lname, email, contact, address], (err, result) => {
      if(err){
        console.error('Error creating customer', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(201).json({id: result.insertId});
      }
    });
  } catch (error) {
    console.error('Error creating customer', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// Update a customer
router.put('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  const { fname, mname, lname, address, contact, email } = req.body;
  try {
    db.query('UPDATE customer SET fname = ?, mname = ?, lname = ?, address = ?, contact = ?, email = ? WHERE id = ?', [fname, mname, lname, address, contact, email, id], (err, result) => {
      if(err){
        console.error('Error updating customer', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(200).json({id: id});
      }
    });
  } catch (error) {
    console.error('Error updating customer', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// Delete a customer
router.delete('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query('DELETE FROM customer WHERE id = ?', [id], (err, result) => {
      if(err){
        console.error('Error deleting customer', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(200).json({id: id});
      }
    });

    } catch (error) {
      console.error('Error deleting customer', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  module.exports = router;