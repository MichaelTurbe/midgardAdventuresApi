const Discord = require('discord.js');
const getEmbedDescriptionForCharacter = require('./getEmbedDescriptionForCharacter')
const handleException = require('./handleException')
const CharacterService = require('../character')
const handleCharacterNotFound = require('./handleCharacterNotFound')
const convertUpdateMessageToQuery = require('./convertUpdateMessageToQuery')

async function handleUpdateMyCharacterByName (message, parsedMessage) {
  try{
  let userName = parsedMessage.userName
  let characterName = parsedMessage.characterName
  console.log(`request from user: ${userName} to update character ${characterName}`)
  let character = await CharacterService.getCharacterForPlayerByName(userName, characterName)
  if(!character) { return handleCharacterNotFound(message, parsedMessage)}
  let updateQuery = convertUpdateMessageToQuery(message, parsedMessage)
  if(!updateQuery) { return }
  let result = await CharacterService.updateCharacterWithQuery(character, updateQuery)
  let updatedCharacter =  await CharacterService.getCharacterForPlayerByName(userName, characterName)

  let embedDescription = getEmbedDescriptionForCharacter(updatedCharacter)

    // message.channel.send(`Got ${characters.length} characters for that user`)
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle(`${character.characterName} has been updated:`)
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(embedDescription);
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  }
  catch(ex) {
    console.log(ex)
    handleException(message, ex)
  }
}

module.exports = handleUpdateMyCharacterByName