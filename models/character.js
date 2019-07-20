const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const CharacterSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  lastSessionPlayed: {
    type: Schema.Types.ObjectId,
    ref: 'Session'
  },
  characterName: String,
  race: String,
  class: String,
  level: String,
  sessionPoints: Number,
  status: Number
})

CharacterSchema.index({player: 1, characterName: 1}, {unique: true})

module.exports = mongoose.model('Character', CharacterSchema)
