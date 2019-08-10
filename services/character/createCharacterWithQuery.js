const _ = require('lodash')
async function updateCharacterWithQuery(parsedMessage, characterName, updateQuery) {
  // first check if there is a player yet with this user name:
  let player = await Player.findOne({discordUserName: parsedMessage.userName})
  // if not, create them: 
  if(!player) {
    let newPlayer = new Player({
      discordUserName: parsedMessage.userName,
    })
    player = await newPlayer.save()
  }
  // create the new character

  // assign whatever properties we've been given
  console.log('update object to set:', updateObject)
  let keys = Object.keys(updateObject)
  _.forEach(keys, key => {
    character[key] = updateObject[key]
  })
  // save the thing
  let result = await character.save()
  return result
}
module.exports = updateCharacterWithQuery