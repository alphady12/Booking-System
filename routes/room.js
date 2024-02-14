const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const db = require ('../db');
//const {authenticateToken} = require ('');

// Get all rooms
router.get('/api/rooms',  (req, res) => {
    try {
      db.query('SELECT * FROM room', (err, result) =>{
        if(err){
          console.error('Error fetching rooms', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.error('Error fetching rooms', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  // Get a single room by ID
  router.get('/api/rooms/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM room WHERE id = ?', [id], (err, result) => {
        if(err){
          console.error('Error fetching room', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json(result[0]);
        }
      });
    } catch (error) {
      console.error('Error fetching room', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  // Create a new room
router.post('/api/rooms', (req, res) => {
  const { room_num, price, status, description } = req.body;
  try {
    db.query('INSERT INTO room (room_num, price, status, description) VALUES (?, ?, ?, NOW())', [room_num, price, status, description], (err, result) => {
      if (err) {
        console.error('Error creating room', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(201).json({id: result.insertId});
      }
    });
  } catch (error) {
    console.error('Error creating room', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});
  
 // Update a room
router.put('/api/rooms/:id', (req, res) => {
  const { id } = req.params;
  const { room_num, price, status, description } = req.body;
  try {
    db.query('UPDATE room SET room_num = ?, price = ?, status = ?, description = ? WHERE id = ?', [room_num, price, status, description, id], (err, result) => {
      if (err) {
        console.error('Error updating room', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(200).json({id: id});
      }
    });
  } catch (error) {
    console.error('Error updating room', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});
  
  // Delete a room
  router.delete('/api/rooms/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM room WHERE id = ?', [id], (err, result) => {
        if(err){
          console.error('Error deleting room', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json({id: id});
        }
      });
    } catch (error) {
      console.error('Error deleting room', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  module.exports = router;