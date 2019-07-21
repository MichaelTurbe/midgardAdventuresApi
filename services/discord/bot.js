if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  require('dotenv').config({path: 'env'})
}
const prefix = '!midgard'
const Discord = require('discord.js');
const _ = require('lodash')
const CharacterService = require('../character')
const handleGetMyCharacters = require('./handleGetMyCharacters')
const handleGetMyCharacterByName = require('./handleGetMyCharacterByName')
const handleUnkownCommand = require('./handleUnknownCommand')
const handleException = require('./handleException')
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
  console.log('channel name: ', message.channel.name)
  if (!message.content.startsWith(prefix) || message.author.bot) {
    console.log('this message is not for me!')
    return  
  }
  try{
    const commandString = message.content.substring(9)
    console.log('command string', commandString)
    const arguments = commandString.split(':')
    console.log('arguments:', arguments)
    const command = arguments[0]
    console.log('command', command)
    // If the message is "ping"
    if (command === 'get my characters') {
      handleGetMyCharacters(message)
    } else if (command === 'get my character') {
      handleGetMyCharacterByName(message, arguments)
    }
    else {
      handleUnkownCommand(message)
    }
  } catch(e) {
    handleException(message, e)
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.DISCORD_KEY);