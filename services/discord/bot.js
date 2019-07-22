if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  require('dotenv').config({path: 'env'})
}

const Discord = require('discord.js');
const _ = require('lodash')
const CharacterService = require('../character')
const handleGetMyCharacters = require('./handleGetMyCharacters')
const handleGetMyCharacterByName = require('./handleGetMyCharacterByName')
const handleUnkownCommand = require('./handleUnknownCommand')
const handleException = require('./handleException')
const parseMessage = require('./parseMessage')
const handleUpdateMyCharacter = require('./handleUpdateMyCharacterByName')
const handleHelpRequest = require('./handleHelpRequest')
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

  try{
    let parsedMessage = parseMessage(message)
    if(parsedMessage.ignore) { return }
    console.log('parsed message', parsedMessage)
    if (parseMessage.broken) {return handleUnkownCommand(message)}

    if (parsedMessage.command === 'get my characters') {
      handleGetMyCharacters(message, parsedMessage)
    } else if (parsedMessage.command === 'get my character') {
      handleGetMyCharacterByName(message, parsedMessage)
    } else if (parsedMessage.command === 'update my character') {
      handleUpdateMyCharacter(message, parsedMessage)
    } else if (parsedMessage.command === 'help') {
      console.log('got a help request')
      handleHelpRequest(message, parsedMessage)
    }
    else {
      handleUnkownCommand(message, parsedMessage)
    }
  } catch(e) {
    console.log(e)
    handleException(message, e)
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.DISCORD_KEY);