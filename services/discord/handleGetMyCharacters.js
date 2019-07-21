const Discord = require('discord.js');
const getEmbedDescriptionForCharacters = require('./getEmbedDescriptionForCharacters')
const handleException = require('./handleException')
const CharacterService = require('../character')

async function handleGetMyCharacters (message) {
  try{
  let userName = message.author.username + '#' + message.author.discriminator
  console.log(`request from user: ${userName}`)
  let characters = await CharacterService.getCharactersForPlayer(userName)
  let embedDescription = getEmbedDescriptionForCharacters(characters)

  // message.channel.send(`Got ${characters.length} characters for that user`)
  const embed = new Discord.RichEmbed()
    // Set the title of the field
    .setTitle(`Here are the current characters for ${userName}:`)
    // Set the color of the embed
    .setColor(0xFF0000)
    // Set the main content of the embed
    .setDescription(embedDescription);
  // Send the embed to the same channel as the message
  message.channel.send(embed);
  } catch(ex) {
    console.log(ex)
    handleException(message, ex)
  }
}

module.exports = handleGetMyCharacters