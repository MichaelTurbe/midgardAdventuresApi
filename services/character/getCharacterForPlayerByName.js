const Character = require('../../models/character')
const Player = require('../../models/player')
const Session = require('../../models/session')

async function getCharacterForPlayerByName(discordId, characterName) {
  let player = await Player.findOne({discordUserName: discordId})
  console.log('player', player)
  if(player && player._id) {
    const query = {player: player._id.toString(), characterName: characterName}
    console.log('query', query)
    let character = await Character.findOne(query).populate('lastSessionPlayed')
    return character
  } else {
    return null
  }
}
module.exports = getCharacterForPlayerByName