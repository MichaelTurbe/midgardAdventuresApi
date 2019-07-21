function getEmbedDescriptionForCharacter(character) {
  let description = ''
  description += `\`
  Character Name:${character.characterName}
  Race: ${character.race}
  Class: ${character.class}
  Level ${character.level}
  Session Points: ${character.sessionPoints}
  Last Session: ${character.lastSessionPlayed.sessionName}
  Date: ${character.lastSessionPlayed.date}
  City: ${character.lastSessionPlayed.city}
  \``
  return description
}

module.exports = getEmbedDescriptionForCharacter