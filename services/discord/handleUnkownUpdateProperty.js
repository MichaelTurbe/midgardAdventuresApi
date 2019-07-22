const Discord = require('discord.js');

async function handleUnkownUpdateProperty (message, parsedMessage) {
  let userName = parsedMessage.userName

    // message.channel.send(`Got ${characters.length} characters for that user`)
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle(`Sorry Holmes`)
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(`Sorry ${userName}, something about that update command is borked up.`);
    // Send the embed to the same channel as the message
    message.channel.send(embed);
}

module.exports = handleUnkownUpdateProperty