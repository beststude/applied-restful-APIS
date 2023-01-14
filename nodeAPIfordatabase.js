const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Player = require('./models/player'); // import player model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/teamdb', { useNewUrlParser: true });
const db = mongoose.connection;

// Handle connection error
db.on('error', console.error.bind(console, 'connection error:'));

// Add a new player
router.post('/add', (req, res) => {
  const newPlayer = new Player({
    name: req.body.name,
    position: req.body.position,
    rushing_yards: req.body.rushing_yards,
    touchdown_passes: req.body.touchdown_passes,
    sacks: req.body.sacks,
    field_goals_made: req.body.field_goals_made,
    field_goals_missed: req.body.field_goals_missed,
    catches_made: req.body.catches_made
  });
  newPlayer.save((err, player) => {
    if (err) return res.status(500).json({ message: 'Error saving player', error: err });
    return res.status(200).json(player);
  });
});

// Update a player
router.put('/update/:id', (req, res) => {
  Player.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, player) => {
    if (err) return res.status(500).json({ message: 'Error updating player', error: err });
    return res.status(200).json(player);
  });
});

// Delete a player
router.delete('/delete/:id', (req, res) => {
  Player.findByIdAndRemove(req.params.id, (err, player) => {
    if (err) return res.status(500).json({ message: 'Error deleting player', error: err });
    return res.status(200).json({ message: 'Player deleted' });
  });
});

// Perform all queries
router.get('/query', (req, res) => {
  const query = req.query;
  if (query.hasOwnProperty('touchdown_passes')) {
    Player.find({ touchdown_passes: query.touchdown_passes }).sort({ touchdown_passes: -1 }).limit(1).exec((err, player) => {
      if (err) return res.status(500).json({ message: 'Error finding player', error: err });
      return res.status(200).json(player);
    });
  } else if (query.hasOwnProperty('rushing_yards')) {
    Player.find({ rushing_yards: query.rushing_yards }).sort({ rushing_yards: -1 }).limit(1).exec((err, player) => {
      if (err) return res.status(500).json({ message: 'Error finding player', error:
