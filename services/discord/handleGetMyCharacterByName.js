const Discord = require('discord.js');
const getEmbedDescriptionForCharacter = require('./getEmbedDescriptionForCharacter')

async function handleGetMyCharacterByName (message) {
  let userName = message.author.username + '#' + message.author.discriminator
  let characterName = arguments[1].trim()
  console.log(`request from user: ${userName} to find character ${characterName}`)
  let character = await CharacterService.getCharacterForPlayerByName(userName, characterName)
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

module.exports = handleGetMyCharacterByName