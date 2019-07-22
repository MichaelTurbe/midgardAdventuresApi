const Discord = require('discord.js');
const getEmbedDescriptionForCharacter = require('./getEmbedDescriptionForCharacter')
const handleException = require('./handleException')
const CharacterService = require('../character')
const handleCharacterNotFound = require('./handleCharacterNotFound')

async function handleGetMyCharacterByName (message, parsedMessage) {
  try{
  let characterName = parsedMessage.characterName 
  let userName = parsedMessage.userName
  // let characterName = arguments[1].trim()
  console.log(`request from user: ${userName} to find character ${characterName}`)
  let character = await CharacterService.getCharacterForPlayerByName(parsedMessage.userName, characterName)
  if(!character) { return handleCharacterNotFound(message, characterName)}
  
  let embedDescription = getEmbedDescriptionForCharacter(character)

    // message.channel.send(`Got ${characters.length} characters for that user`)
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle(`${character.characterName}`)
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

module.exports = handleGetMyCharacterByName