var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const getCharactersForPlayer = require('../services/character/getCharactersForPlayer')
const Character = require('../models/character')
const Player = require('../models/player')

/* GET users listing. */
router.route('/')
.post(authMiddleware, handleGetRequest)

async function handleGetRequest(req, res, next){
  if(req.body.discordId) {
    let discordId = req.body.discordId
    console.log(discordId)
    let characters = await getCharactersForPlayer(discordId)
    res.json(characters)
  } else {
    res.status(400).end()
  }
}

module.exports = router;
