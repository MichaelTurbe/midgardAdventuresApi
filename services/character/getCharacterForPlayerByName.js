const Character = require('../../models/character')
const Player = require('../../models/player')
const Session = require('../../models/session')

async function getCharacterForPlayerByName(discordId, characterName) {
  let player = await Player.findOne({discordUserName: discordId})
  console.log('player', player)
  if(player && player._id) {
    let characters = await Character.findOne({player: player._id.toString(), characterName: characterName}).populate('lastSessionPlayed')
    return characters
  } else {
    return []
  }
}
module.exports = getCharacterForPlayerByName