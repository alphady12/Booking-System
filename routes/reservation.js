const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const db = require ('../db');
//const {authenticateToken} = require ('');

// Get all reservations
router.get('/api/reservations',  (req, res) => {
    try {
      db.query('SELECT * FROM reservation', (err, result) =>{
        if(err){
          console.error('Error fetching reservations', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.error('Error fetching reservations', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  // Get a single reservation by ID
  router.get('/api/reservations/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM reservation WHERE id = ?', [id], (err, result) => {
        if(err){
          console.error('Error fetching reservation', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json(result[0]);
        }
      });
    } catch (error) {
      console.error('Error fetching reservation', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  // Create a new reservation
  router.post('/api/reservations', (req, res) => {
    const { admin_id, customer_id, room_id, check_in, check_out, created_at, updated_at } = req.body;
    try {
      db.query('INSERT INTO reservation (admin_id, customer_id, room_id, check_in, check_out, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW(), NOW(), NOW())', [admin_id, customer_id, room_id, check_in, check_out, created_at, updated_at], (err, result) => {
        if (err) {
          console.error('Error creating reservation', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(201).json({id: result.insertId});
        }
      });
    } catch (error) {
      console.error('Error creating reservation', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  // Update a reservation
  router.put('/api/reservations/:id', (req, res) => {
    const { id } = req.params;
    const { admin_id, customer_id, room_id, check_in, check_out, created_at, updated_at } = req.body;
    try {
      db.query('UPDATE reservation SET admin_id = ?, customer_id = ?, room_id = ?, check_in = ?, check_out = ?, created_at = ?, updated_at = ? WHERE id = ?', [admin_id, customer_id, room_id, check_in, check_out, created_at, updated_at, id], (err, result) => {
        if (err) {
          console.error('Error updating reservation', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json({id: id});
        }
      });
    } catch (error) {
      console.error('Error updating reservation', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
 // Delete a reservation
router.delete('/api/reservations/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM reservation WHERE id = ?', [id], (err, result) => {
        if(err){
          console.error('Error deleting reservation', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json({id: id});
        }
      });
    } catch (error) {
      console.error('Error deleting reservation', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  module.exports = router;