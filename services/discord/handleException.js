const Discord = require('discord.js');

async function handleException (message, e) {
  let userName = message.author.username

    // message.channel.send(`Got ${characters.length} characters for that user`)
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle(`Seriously?`)
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(`You broke the whole fucking thing ${userName}!
      ${e}`);
    // Send the embed to the same channel as the message
    message.channel.send(embed);
}

module.exports = handleException