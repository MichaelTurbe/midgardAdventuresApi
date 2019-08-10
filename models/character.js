const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const CharacterSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  characterName: String,
  race: String,
  class: String,
  level: String,
  sessionPoints: Number,
  status: Number,
  lastSessionName: String,
  lastSessionDate: String,
  lastCity: String,
  system: String
})

CharacterSchema.index({player: 1, characterName: 1}, {unique: true})

module.exports = mongoose.model('Character', CharacterSchema)
