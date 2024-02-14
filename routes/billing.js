const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const db = require ('../db');
//const {authenticateToken} = require ('');

// Get all billings
router.get('/api/billings',  (req, res) => {
    try {
      db.query('SELECT * FROM billing', (err, result) =>{
        if(err){
          console.error('Error fetching billings', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.error('Error fetching billings', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  // Get a single billing by ID
  router.get('/api/billings/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM billing WHERE id = ?', [id], (err, result) => {
        if(err){
          console.error('Error fetching billing', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json(result[0]);
        }
      });
    } catch (error) {
      console.error('Error fetching billing', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  // Create a new billing
router.post('/api/billings', (req, res) => {
  const { reservationid, roomrate, num_of_nightstay, num_of_pax, discount, total, status, processed_by } = req.body;
  try {
    db.query('INSERT INTO billing (reservationid, roomrate, num_of_nightstay, num_of_pax, discount, total, status, processed_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [reservationid, roomrate, num_of_nightstay, num_of_pax, discount, total, status, processed_by], (err, result) => {
      if (err) {
        console.error('Error creating billing', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(201).json({id: result.insertId});
      }
    });
  } catch (error) {
    console.error('Error creating billing', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

  // Update a billing
  router.put('/api/billings/:id', (req, res) => {
    const { id } = req.params;
    const { reservationid, roomrate, num_of_nightstay, num_of_pax, discount, total, status, processed_by } = req.body;
    try {
      db.query('UPDATE billing SET reservationid = ?, roomrate = ?, num_of_nightstay = ?, num_of_pax = ?, discount = ?, total = ?, status = ?, processed_by = ? WHERE id = ?', [reservationid, roomrate, num_of_nightstay, num_of_pax, discount, total, status, processed_by, id], (err, result) => {
        if (err) {
          console.error('Error updating billing', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json({id: id});
        }
      });
    } catch (error) {
      console.error('Error updating billing', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  // Delete a billing
router.delete('/api/billings/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM billing WHERE id = ?', [id], (err, result) => {
        if(err){
          console.error('Error deleting billing', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json({id: id});
        }
      });
    } catch (error) {
      console.error('Error deleting billing', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  module.exports = router;