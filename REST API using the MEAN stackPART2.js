// routes/players.js

const express = require('express');
const router = express.Router();
const Player = require('../models/player');

// Get all players
router.get('/', (req, res) => {
  Player.find({}, (err, players) => {
    if (err) return res.status(500).json({ message: 'Error getting players', error: err });
    return res.status(200).json(players);
  });
});

// Get single player
router.get('/:id', (req, res) => {
  Player.findById(req.params.id, (err, player) => {
    if (err) return res.status(500).json({ message: 'Error getting player', error: err });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    return res.status(200).json(player);
  });
});

// Add new player
router.post('/', (req, res) => {
  const newPlayer = new Player({
    name: req.body.name,
    position: req.body.position,
    stats: req.body.stats
  });
  newPlayer.save((err, player) => {
    if (err) return res.status(500).json({ message: 'Error saving player', error: err });
    return res.status(201).json(player);
  });
});

// Update player
router.put('/:id', (req, res) => {
  Player.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, player) => {
    if (err) return res.status(500).json({ message: 'Error updating player', error: err });
    return res.status(200).json(player);
  });
});

// Delete player
router.delete('/:id', (req, res) => {
  Player.findByIdAndRemove(req.params.id, (err, player) => {
    if (err) return res.status(500).json({ message: 'Error deleting player', error: err });
    return res.status(200
