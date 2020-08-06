const config = require('../config')
const store = require('../store')

// Show all video games available to be borrowed
const showAllGames = function () {
    return $.ajax({
        url: config.apiUrl + '/video-games',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + store.user.token,
        },
    })
}
// Show details of selected video game
const getGameDetails = function (videoGameID) {
    return $.ajax({
        url: config.apiUrl + '/video-games/' + videoGameID,
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + store.user.token,
        },
    })
}

// Create new listing of a video game
const createGame = function (formData) {
    return $.ajax({
        url: config.apiUrl + '/video-games',
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + store.user.token,
        },
        data: formData
    })
}

// Update new listing of a video game
const updateGame = function (formData) {
    const videoGameID = store.currentGame.id
    console.log(videoGameID)
    return $.ajax({
        url: config.apiUrl + '/video-games/' + videoGameID,
        method: 'PATCH',
        headers: {
            Authorization: 'Bearer ' + store.user.token,
        },
        data: formData
    })
}

// Delete a video game listing
const deleteGame = function (videoGameID) {
    return $.ajax({
        url: config.apiUrl + '/video-games/' + videoGameID,
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + store.user.token,
        },
    })
}

module.exports = {
    showAllGames,
    getGameDetails,
    createGame,
    updateGame,
    deleteGame,
}