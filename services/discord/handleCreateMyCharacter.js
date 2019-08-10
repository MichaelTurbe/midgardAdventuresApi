const Discord = require('discord.js');
const getEmbedDescriptionForCharacter = require('./getEmbedDescriptionForCharacter')
const handleException = require('./handleException')
const CharacterService = require('../character')
const handleCharacterAlreadyExists = require('./handleCharacterAlreadyExists')
const convertUpdateMessageToQuery = require('./convertUpdateMessageToQuery')
const Player = require('../../models/player')
const Character = require('../../models/character')

async function handleCreateMyCharacter (message, parsedMessage) {
  try{
  let userName = parsedMessage.userName
  let player = await processPlayer(userName)
  console.log('Player is', JSON.stringify(player, null, 2))
  let characterName = parsedMessage.characterName
  console.log(`new character name is: ${characterName}`)
  console.log(`request from user: ${userName} to create character ${characterName}`)
  // make sure the character doesn't already exist
  let character = await CharacterService.getCharacterForPlayerByName(userName, characterName)
  if(character) { return handleCharacterAlreadyExists(message, parsedMessage)}
  let updateQuery = convertUpdateMessageToQuery(message, parsedMessage)
  if(!updateQuery) { return }
  let newCharacter = new Character(updateQuery)
  newCharacter.player = player._id
  newCharacter.characterName = characterName
  await newCharacter.save()
  let updatedCharacter =  await CharacterService.getCharacterForPlayerByName(userName, characterName)

  let embedDescription = getEmbedDescriptionForCharacter(updatedCharacter)

    // message.channel.send(`Got ${characters.length} characters for that user`)
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle(`${updatedCharacter.characterName} has been created!`)
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(embedDescription);
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  }
  catch(ex) {
    console.log(ex)
    handleException(message, ex)
  }
}

async function processPlayer(userName) {
  let foundPlayer = await Player.findOne({discordUserName: userName})
  if(foundPlayer) {
    console.log('player already exists')
    return foundPlayer
  } else {
    let newPlayer = new Player({
      playerName: userName,
      discordUserName: userName,
    })
    await newPlayer.save()
    console.log('creating player')
    return newPlayer
  }
}

module.exports = handleCreateMyCharacter