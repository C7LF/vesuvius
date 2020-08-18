const fetch = require('node-fetch')

const ENDPOINTS = require('../config/endpoints')

// Get data
// TODO: Abstact out?
const getData = async () => {
    const response = await fetch(ENDPOINTS.EPIC_FREE_GAMES)
    const body = await response.json()
    return body
}

// get elements from free game data.
const freeGameData = getData().then(x => 
    x.data.Catalog.searchStore.elements
)

// If effective date has passsed, the game is free, else coming soon.
// Note for this: games on sale twice will have a effectiveDate value from the first time they were on sale
// TODO: logic needed to detect the dates far in the past and change the data from effectiveData to startDate.
const validFreeGames = freeGameData.then(catalog => catalog.filter(game => Date.parse(game.effectiveDate) - Date.parse(new Date())<0))

module.exports.FreeGameTitles = validFreeGames