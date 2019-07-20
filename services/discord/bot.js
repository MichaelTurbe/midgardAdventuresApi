if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  require('dotenv').config({path: 'env'})
}
const prefix = '!midgard'
const auth = require('./auth.json');
const Discord = require('discord.js');
const _ = require('lodash')
const getCharactersForPlayer = require('../character/getCharactersForPlayer')

// Create an instance of a Discord client
const client = new Discord.Client();


/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', async message => {
  console.log(message)
  if (!message.content.startsWith(prefix) || message.author.bot) {
    console.log('this message is not for me!')
    return  
  } 
  const command = message.content.substring(9).toLowerCase()
  console.log('command', command)
  // If the message is "ping"
  if (command === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
  } else if (command === 'get my characters') {
    let userName = message.author.username + '#' + message.author.discriminator
    console.log(`request from user: ${userName}`)
    let characters = await getCharactersForPlayer(userName)
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
  }
  else if (command === 'how to embed') {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle('A slick little embed')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription('Hello, this is a slick embed!');
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  }
});

// async function getCharactersForPlayer(discordUserName) {
//   const apiKey = 'xe1ECd39qkexmm9JLK1r2A=='
//   console.log(`apiKey: ${apiKey}`)
//   let sourceOptions = {
//     method: 'POST',
//     // uri: `${targetAPI}/support/migrate/up`,
//     uri: `http://localhost:3000/characters`,
//     headers: {
//         'User-Agent': 'Request-Promise',
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Authorization': apiKey
//     },
//     json: true, // Automatically parses the JSON string in the response
//     body: {
//       discordId: discordUserName
//     }
//   }
//   let parsedBody = await requestPromise(sourceOptions)
//   return parsedBody
// }

function getEmbedDescriptionForCharacters(characters) {
  let description = ''
  _.forEach(characters, character => {
    description += `\n\`${character.characterName} is a level ${character.level} ${character.race} ${character.class} with ${character.sessionPoints} session points.\``
  })
  return description
}

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);