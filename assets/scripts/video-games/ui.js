const store = require('../store')
const showVideoGamesTemplate = require('../templates/handlebars/video-games/video-games-display.handlebars')
const showVideoGameDetails = require('../templates/handlebars/video-games/video-game-details.handlebars')
const videoGameForm = require('../templates/handlebars/video-games/video-game-form.handlebars')
const refreshEvents = require('./refresh-events')

// Show all video games
const showAllGamesSuccess = function (response) {
    if(response){
        store.videoGames = response.videoGames
    }
    const showVideoGamesHTML = showVideoGamesTemplate({videoGames: store.videoGames})
    $('.video-game-view, #create-video-game, #update-video-game').empty()
    $('.video-game-view').append(showVideoGamesHTML)
    $('.show-user-listings, .video-game-display, .new-game-button, .change-password-button').show()
    $('.show-all-listings, .change-password-view, .user-info-view, .update-video-game-view, .create-video-game-view').hide()
}
const showAllGamesFailure = function () {
    $('#message').text('Failed to get all video games').addClass('error')
}
// Show all user video game listings
const showUserGamesSuccess = function (response) {
    if(response){
        store.videoGames = response.videoGames
    }
    const showVideoGamesHTML = showVideoGamesTemplate({videoGames: store.videoGames})
    $('.video-game-view').empty()
    $('.video-game-view').append(showVideoGamesHTML)
    $('.show-all-listings, .video-game-display').show()
    $('.show-user-listings, .change-password-view, .user-info-view').hide()
}
const showUserGamesFailure = function () {
    $('#message').text('Failed to get user video games').addClass('error')
}
// Show video game details
const videoGameDetailsSuccess = function (response) {
    store.currentGame = response.videoGame
    const sameOwner = (store.user.id === response.videoGame.owner.id)
    const videoGameDetails = showVideoGameDetails({videoGame: response.videoGame, sameOwner: sameOwner})
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
const borrowVideoGame = function () {
    console.log('Did we make it here?')
    $('.borrow-modal').modal({ backdrop: 'static', keyboard: false , show: true})
    // showAllGamesSuccess()
}

// Switch views to create game form
const showCreateGameForm = function () {
    $('.create-video-game-view, .change-password-button, .user-info-button, .show-all-listings').show()
    $('#update-video-game, #change-password').trigger('reset')
    $('#update-video-game').empty()
    $('#create-video-game').empty()
    $('#create-video-game').append(videoGameForm)
    $('.video-game-display, .user-info-view, .change-password-view, .new-game-button, .show-user-listings').hide()
}

// Successfully create a new video game listing 
// Push new listing to store video games array and refresh listings
const createVideoGameSuccess = function (response) {
    $('#message').text('Successfully created a new video game listing').removeClass('error')
    $('.video-game-display, .new-game-button').show()
    $('.create-video-game-view').hide()
    $('#create-video-game').empty()
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
    const updateVideoGameForm = videoGameForm({gameInfo: store.currentGame})
    $('#update-video-game').append(updateVideoGameForm)
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
    $('#update-video-game').empty()
    refreshEvents.onShowAllGames()
}
const updateVideoGameFailure = function (error) {
    console.log(error)
    $('#message').text('Failed to update the video game listing').removeClass('error')
}

// Cancel out of game form create or update
const cancelGameForm = function () {
    $('.update-video-game-view, .create-video-game-view').hide()
    $('#create-video-game, #update-video-game').trigger('reset')
    $('#create-video-game, #update-video-game').empty()
    $('.video-game-view').empty()
    $('.video-game-display').show()
    showAllGamesSuccess()
}

// Successfully delete a new video game
const deleteVideoGameSuccess = function () {
    $('.video-game-display').show()
    $('.video-game-view').empty()
    $('#message').text('Successfully deleted the video game listing').removeClass('error')
    refreshEvents.onShowAllGames()
}
const deleteVideoGameFailure = function () {
    $('#message').text('Failed to delete a new video game listing').removeClass('error')
}

module.exports = {
    showAllGamesFailure,
    showAllGamesSuccess,
    showUserGamesFailure,
    showUserGamesSuccess,
    videoGameDetailsFailure,
    videoGameDetailsSuccess,
    cancelDetailVideoGame,
    borrowVideoGame,
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