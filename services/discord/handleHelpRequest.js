const Discord = require('discord.js');

async function handleHelpRequest (message, parsedMessage) {
  let userName = parsedMessage.userName
  let description = ''
  description += `\`
  "!midgard get my characters" - this will get all of the characters associated with your discord user name
  "!midgard get my character: <insert character name>" - given a correctly spelled, complete name of one of your characters, this will return all the info for that character
  "!midgard update my character: <insert character name>, session points = <insert session point number>" - this will update a character's session points to whatever you have entered
  \``

    // message.channel.send(`Got ${characters.length} characters for that user`)
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle(`Here are the available commands ${userName}:`)
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(description);
    // Send the embed to the same channel as the message
    message.channel.send(embed);
}

module.exports = handleHelpRequest