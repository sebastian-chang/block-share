const store = require('../store')
const showVideoGamesTemplate = require('../templates/handlebars/video-games/video-games-display.handlebars')
const showVideoGameDetails = require('../templates/handlebars/video-games/video-game-details.handlebars')
const refreshEvents = require('./refresh-events')

// Show all video games
const showAllGamesSuccess = function (response) {
    if(response){
        store.videoGames = response.videoGames
    }
    const showVideoGamesHTML = showVideoGamesTemplate({videoGames: store.videoGames})
    $('.video-game-view').append(showVideoGamesHTML)
}
const showAllGamesFailure = function () {
    $('#message').text('Failed to get all video games').addClass('error')
}
// Show video game details
const videoGameDetailsSuccess = function (response) {
    store.currentGame = response.videoGame
    const videoGameDetails = showVideoGameDetails({videoGame: response.videoGame, userID: store.user})
    $('#message').text('Thats a fun game')
    $('.video-game-view').empty()
    $('.video-game-view').append(videoGameDetails)
}
const videoGameDetailsFailure = function () {
    $('#message').text('Failed to get the video games').addClass('error')
}
const cancelDetailVideoGame = function () {
    $('.video-game-view').empty()
    showAllGamesSuccess()
}

// Switch views to create game form
const showCreateGameForm = function () {
    $('.create-video-game-view').show()
    $('.video-game-display').hide()
}

// Successfully create a new video game listing 
// Push new listing to store video games array and refresh listings
const createVideoGameSuccess = function (response) {
    $('#message').text('Successfully created a new video game listing').removeClass('error')
    $('.video-game-display').show()
    $('.create-video-game-view').hide()
    $('#create-video-game').trigger('reset')
    $('.video-game-view').empty()
    store.videoGames.push(response.videoGame)
    showAllGamesSuccess()
}
const createVideoGameFailure = function (error) {
    console.log(error)
    $('#message').text('Failed to create a new video game listing').removeClass('error')
}

// Switch views to update game form
const showUpdateGameForm = function () {
    $('.update-video-game-view').show()
    $('.video-game-display').hide()
}
// Successfully updated a  video game listing 
// Got to figure out pushing data to refresh
const updateVideoGameSuccess = function (response) {
    $('#message').text('Successfully update the video game listing').removeClass('error')
    $('.video-game-display').show()
    $('.video-game-view').empty()
    $('.update-video-game-view').hide()
    $('#update-video-game').trigger('reset')
    // store.videoGames.push(response.videoGame) // this needs to be addressed
    refreshEvents.onShowAllGames()
}
const updateVideoGameFailure = function (error) {
    console.log(error)
    $('#message').text('Failed to update the video game listing').removeClass('error')
}

// Cancel out of game form create or update
const cancelGameForm = function () {
    $('.update-video-game-view, .create-video-game-view').hide()
    $('#create-video-game').trigger('reset')
    $('#update-video-game').trigger('reset')
    $('.video-game-view').empty()
    $('.video-game-display').show()
    showAllGamesSuccess()
    // if (store.game.over === false) {
    //     $('.game-board-view, .change-password-button, .restart').show()
    // }
    // else {
    //     $('.new-game, .change-password-button').show()
    // }
}

// Successfully delete a new video game
const deleteVideoGameSuccess = function (id) {
    console.log('this is what was passed ', id)
    console.log('I doubt Im making it here')
    $('.video-game-display').show()
    $('.video-game-view').empty()
    $('#message').text('Successfully deleted the video game listing').removeClass('error')
    // Need to figure out how to auto refresh listings
    refreshEvents.onShowAllGames()
}
const deleteVideoGameFailure = function () {
    $('#message').text('Failed to delete a new video game listing').removeClass('error')
}

module.exports = {
    showAllGamesFailure,
    showAllGamesSuccess,
    videoGameDetailsFailure,
    videoGameDetailsSuccess,
    cancelDetailVideoGame,
    showCreateGameForm,
    createVideoGameFailure,
    createVideoGameSuccess,
    showUpdateGameForm,
    updateVideoGameFailure,
    updateVideoGameSuccess,
    cancelGameForm,
    deleteVideoGameFailure,
    deleteVideoGameSuccess,
}