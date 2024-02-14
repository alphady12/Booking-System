const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const db = require ('../db');
const authenticateToken = require('../auth.js/authenticateToken');

// Get all admin
router.get('/api/admin',  (req, res) => {
    try {
      db.query('SELECT * FROM admin', (err, result) =>{
        if(err){
          console.error('Error fetching admin', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.error('Error fetching admin', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
 // Get a single admin by ID
router.get('/api/admin/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query('SELECT * FROM admin WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error fetching admin', err);
        res.status(500).json({ message: 'Internal damage' });
      } else {
        res.status(200).json(result[0]);
      }
    });
  } catch (error) {
    console.error('Error fetching admin', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
 // Create a new admin
router.post('/api/admin/register', (req, res) => {
    const { username, password, fullname, contact } = req.body;
    try {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password', err);
          res.status(500).json({ message: 'Internal damage' });
        } else {
          db.query('INSERT INTO admin (username, password, fullname, contact, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())', [username, hash, fullname, contact], (err, result) => {
            if (err) {
              console.error('Error creating admin', err);
              res.status(500).json({ message: 'Internal damage' });
            } else {
              res.status(201).json({ id: result.insertId });
            }
          });
        }
      });
    } catch (error) {
      console.error('Error creating admin', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Login admin
  router.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Retrieve admin from the database
      const [rows] = await db.promise().execute('SELECT * FROM admin WHERE username = ?', [username]);
      
      // Check if admin exists
      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const admin = rows[0];
  
      // Verify password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ adminId: admin.id, username: admin.username }, 'stephen_secret_key', { expiresIn: '1h' });
  
      // Send token in response
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in admin:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Update a admin
  router.put('/api/admin/:id', (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          db.query('UPDATE admin SET username = ?, password = ? WHERE id = ?', [username, hash, id], (err, result) => {
            if (err) {
              console.error('Error updating admin', err);
              res.status(500).json({message:'Internal damage'});
            } else {
              res.status(200).json({id: id});
            }
          });
        }
      });
    } catch (error) {
      console.error('Error updating admin', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  // Delete a admin
router.delete('/api/admin/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM admin WHERE id = ?', [id], (err, result) => {
        if(err){
          console.error('Error deleting admin', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json({id: id});
        }
      });
    } catch (error) {
      console.error('Error deleting admin', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  module.exports = router;