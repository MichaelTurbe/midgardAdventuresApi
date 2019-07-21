function getEmbedDescriptionForCharacters(characters) {
  let description = ''
  _.forEach(characters, character => {
    description += `\n\`${character.characterName} is a level ${character.level} ${character.race} ${character.class} with ${character.sessionPoints} session points.\``
  })
  return description
}

module.exports = getEmbedDescriptionForCharacters