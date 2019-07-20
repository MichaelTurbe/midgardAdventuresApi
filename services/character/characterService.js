
const Character = require('../models/character')
const Player = require('../models/player')
const Session = require('../models/session')

class CharacterService {
  async getCharactersForPlayer(discordId) {
    let player = await Player.findOne({discordId: discordId})
    if(player && player._id) {
      let characters = Character.find({player: player._id})
    } else {
      return []
    }
  }
}
module.exports = CharacterService