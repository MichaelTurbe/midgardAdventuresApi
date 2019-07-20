const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
  sessionName: String,
  date: String,
  city: String,
  system: String
})

SessionSchema.index({sessionName: 1, date: 1}, {unique: true})

module.exports = mongoose.model('Session', SessionSchema)
