function getEmbedDescriptionForCharacter(character) {
  let description = ''
  description += `\`
  Character Name:${character.characterName}
  Race: ${race}
  Class: ${character.class}
  Level ${character.level}
  Session Points: ${character.sessionPoints}\``
  return description
}

module.exports = getEmbedDescriptionForCharacter