const _ = require('lodash')
const handleUnkownUpdateProperty = require('./handleUnkownUpdateProperty')

function convertUpdateMessageToQuery(message, parsedMessage) {
  let converterObject = {
    'session points': 'sessionPoints'
  }
  let updateObject = {}
  let properties = Object.keys(parsedMessage.updateObject)
  let bork = false
  _.forEach(properties, property => {
    if(converterObject.hasOwnProperty(property)) {
      let newProperty = converterObject[property]
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