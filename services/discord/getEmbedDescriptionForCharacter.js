function getEmbedDescriptionForCharacter(character) {
  let description = ''
  description += `\`
  Character Name:${character.characterName}
  Race: ${character.race}
  Class: ${character.class}
  Level ${character.level}
  Session Points: ${character.sessionPoints}
  Last Session: ${character.lastSessionName}
  Date: ${character.lastSessionDate}
  City: ${character.lastCity}
  \``
  return description
}

module.exports = getEmbedDescriptionForCharacter