const _ = require('lodash')
const handleUnkownUpdateProperty = require('./handleUnkownUpdateProperty')

function convertUpdateMessageToQuery(message, parsedMessage) {
  let converterObject = {
    'session points': 'sessionPoints',
    'name': 'characterName',
    'level': 'level',
    'class': 'class',
    'race': 'race',
    'last session name': 'lastSessionName',
    'last session date:': 'lastSessionDate',
    'last city': 'lastCity'
  }
  let updateObject = {}
  let properties = Object.keys(parsedMessage.updateObject)
  let bork = false
  _.forEach(properties, property => {
    if(converterObject.hasOwnProperty(property.toLowerCase())) {
      console.log(`yes, the converter object has a property for ${property.toLowerCase()}`)
      let newProperty = converterObject[property.toLowerCase()]
      console.log(`got ${newProperty} for requested property ${property.toLowerCase()}`)
      updateObject[newProperty] = parsedMessage.updateObject[property]
    } else {
      bork = true
    }
  })
  if(bork) {
    handleUnkownUpdateProperty(message, parsedMessage)
    return null
  }
  return updateObject
}

module.exports = convertUpdateMessageToQuery