const Character = require('../../models/character')
const Player = require('../../models/player')

async function getCharactersForPlayer(discordId) {
  let player = await Player.findOne({discordUserName: discordId})
  console.log('player', player)
  if(player && player._id) {
    let characters = await Character.find({player: player._id.toString()})
    return characters
  } else {
    return []
  }
}
module.exports = getCharactersForPlayer