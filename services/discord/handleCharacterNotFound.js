const Discord = require('discord.js');

async function handleCharacterNotFound (message, characterName) {
  let userName = message.author.username
    console.log(`request from user: ${userName}`)

    // message.channel.send(`Got ${characters.length} characters for that user`)
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle(`Sorry Holmes`)
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(`I can't find a character named ${characterName} for you.`);
    // Send the embed to the same channel as the message
    message.channel.send(embed);
}

module.exports = handleCharacterNotFound