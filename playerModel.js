const mongoose = require('mongoose')

const playerModel = new mongoose.Schema({
    Title: String,
    Player: String,
    Rating: Number,
    Ranking: String,
    Federation: String
})

module.exports = mongoose.model('ChessPlayers', playerModel, 'ChessPlayers')