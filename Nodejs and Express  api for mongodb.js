// server.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/musicdb', { useNewUrlParser: true });
const db = mongoose.connection;

// Handle connection error
db.on('error', console.error.bind(console, 'connection error:'));

// Middlewares
app.use(bodyParser.json());

// Import album model
const Album = require('./models/album');

// Get all albums
app.get('/albums', (req, res) => {
  Album.find({}, (err, albums) => {
    if (err) return res.status(500).json({ message: 'Error getting albums', error: err });
    return res.status(200).json(albums);
  });
});

// Get single album
app.get('/albums/:id', (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    if (err) return res.status(500).json({ message: 'Error getting album', error: err });
    if (!album) return res.status(404).json({ message: 'Album not found' });
    return res.status(200).json(album);
  });
});

// Add new album
app.post('/albums', (req, res) => {
  const newAlbum = new Album({
    name: req.body.name,
    artist: req.body.artist,
    releaseYear: req.body.releaseYear,
    genre: req.body.genre,
    tracks: req.body.tracks
  });
  newAlbum.save((err, album) => {
    if (err) return res.status(500).json({ message: 'Error saving album', error: err });
    return res.status(201).json(album);
  });
});

// Update album
app.put('/albums/:id', (req, res) => {
  Album.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, album) => {
    if (err) return res.status(500).json({ message: 'Error updating album', error: err });
    return res.status(200).json(album);
  });
});

// Delete album
app.delete('/albums/:id', (req, res) => {
  Album.findByIdAndRemove(req.params.id, (err, album) => {
    if (err) return res.status(500).json({ message: 'Error deleting album', error: err });
    return res.status(200).json({ message: '
