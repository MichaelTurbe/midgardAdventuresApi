const _ = require('lodash')
async function updateCharacterWithQuery(character, updateObject) {
  console.log('update object to set:', updateObject)
  let keys = Object.keys(updateObject)
  _.forEach(keys, key => {
    character[key] = updateObject[key]
  })
  let result = await character.save()
  return result
}
module.exports = updateCharacterWithQuery