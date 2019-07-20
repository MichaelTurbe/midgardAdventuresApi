const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlayerSchema = new Schema({
  playerName: String,
  discordUserName: String
})

PlayerSchema.index({discordUserName: 1}, {unique: true})

module.exports = mongoose.model('Player', PlayerSchema)
