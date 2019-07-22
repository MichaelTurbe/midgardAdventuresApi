const _ = require('lodash')
function parseMessage(message) {
  let parsedMessage = {}
  try{
    let userName = message.author.username + '#' + message.author.discriminator
    const prefix = '!midgard'
    if(message.channel.name !== 'character-tracker' && message.channel.name !== 'bot-testing') {
      parsedMessage.ignore = true
      console.log('wrong channel, move along', userName)
      return parsedMessage
    }
    if (!message.content.startsWith(prefix) || message.author.bot) {
      console.log('this message is not for me!')
      parsedMessage.ignore = true
      return parsedMessage 
    }
    
    parsedMessage.userName = userName
    // !midgard get my character: Dyre
    // !midgard update my character: Dyre, session points = 5
    const commandString = message.content.substring(9)
    // update my character: Dyre, session points = 5, city = Zobeck
    console.log('command string', commandString)
    const parts = commandString.split(':')
    console.log('parts:', parts)
    const command = parts[0]
    //update my character
    parsedMessage.command = command
    if(parts.length > 1) {
      let argumentsString = parts[1]
      let arguments = argumentsString.split(',')
      console.log('arguments:', arguments)
      if(arguments.length > 0) {
        let characterName = arguments[0].trim()
        parsedMessage.characterName = characterName
      }
      // all of the rest of the arguments will be value setters
      // turn them into an update object
      if(arguments.length >= 1){
        parsedMessage.updateObject = {}
        arguments.shift()
        let setterArguments = arguments
        console.log('setterArguments:', setterArguments)
        _.forEach(setterArguments, setter => {
          let pieces = setter.split('=')
          console.log('pieces:', pieces)
          console.log('pieces length:', pieces.length)
          
          if(pieces.length == 2) {
            let property = pieces[0].trim()
            let value = pieces[1].trim()
            parsedMessage.updateObject[property] = value
          }
        })
      }
    }
    return parsedMessage
  } catch(e) {
    console.log(e)
    parsedMessage.broken = true
    return parsedMessage
  }

}
module.exports = parseMessage