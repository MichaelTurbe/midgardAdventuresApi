const Discord = require('discord.js');

async function handleHelpRequest (message, parsedMessage) {
  let userName = parsedMessage.userName
  let description = ''
  description += `
  **!midgard get my characters** - this will get all of the characters associated with your discord user name
  
  **!midgard get my character: Your Character Name**" - given a correctly spelled, complete name of one of your characters, this will return all the info for that character
  
  **!midgard update my character: Your Character Name , propertyName = value, property name = value** - This command will update any number of properties on your character.  The properties available to you are:
  **session points**,
  **name**,
  **level**,
  **class**,
  **race**,
  **last session name**,
  **last session date**,
  **last city**

  **!midgard create my character: Your Character Name** - This command will create a new character for you with the specified name.  You can also set any number of properties on your character.  The method and properties available to you are the same as for updating a character.
  `

    // message.channel.send(`Got ${characters.length} characters for that user`)
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle(`Here are the available commands, ${userName}:`)
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(description);
    // Send the embed to the same channel as the message
    message.channel.send(embed);
}

module.exports = handleHelpRequest