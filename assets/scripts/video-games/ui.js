const store = require('../store')
const showVideoGamesTemplate = require('../templates/handlebars/video-games/video-games-display.handlebars')
const showVideoGameDetails = require('../templates/handlebars/video-games/video-game-details.handlebars')
const videoGameForm = require('../templates/handlebars/video-games/video-game-form.handlebars')
const refreshEvents = require('./refresh-events')
const dropdownSearch = require('../../../lib/dropdown-search')

// Show all video games
const showAllGamesSuccess = function (response) {
    if(response){
        store.videoGames = response.videoGames
    }
    const showVideoGamesHTML = showVideoGamesTemplate({videoGames: store.videoGames})
    $('#message').text('All game listings!').removeClass('error')
    $('.video-game-view, #create-video-game, #update-video-game').empty()
    $('.video-game-view').append(showVideoGamesHTML)
    // Sets is available option from database
    for (let i in store.videoGames){
        $(`[data-img=${store.videoGames[i].id}]`).css({ 'background-image': `url(${store.videoGames[i].poster})`, 'object-fit': 'contain' })
    }
    $('.show-user-listings, .video-game-display, .new-game-button, .change-password-button, .user-info-button').show()
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
    $('#message').text('All your game listings!').removeClass('error')
    $('.video-game-view, #create-video-game, #update-video-game').empty()
    $('.video-game-view').append(showVideoGamesHTML)
    // Sets is available option from database
    for (let i in store.videoGames) {
        $(`[data-img=${store.videoGames[i].id}]`).css({ 'background-image': `url(${store.videoGames[i].poster})`, 'object-fit': 'contain' })
    }
    $('.show-all-listings, .video-game-display, .new-game-button, .change-password-button, .user-info-button').show()
    $('.show-user-listings, .change-password-view, .user-info-view, .update-video-game-view, .create-video-game-view').hide()
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
    $('.borrow-modal').modal({ backdrop: 'static', keyboard: false , show: true})
}

// Switch views to create game form
const showCreateGameForm = function () {
    $('#message').text('Lets create a new video game posting!').removeClass('error')
    $('.create-video-game-view, .change-password-button, .user-info-button, .show-all-listings').show()
    $('#update-video-game, #change-password, #update-user, #update-user').trigger('reset')
    $('#update-video-game, #create-video-game').empty()
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
    $('#message').text('Failed to create a new video game listing').removeClass('error')
}

// Switch views to update game form
const showUpdateGameForm = function () {
    $('.update-video-game-view').show()
    const updateVideoGameForm = videoGameForm({gameInfo: store.currentGame})
    $('#message').text(`Lets update ${store.currentGame.title}!`).removeClass('error')
    $('#update-video-game').append(updateVideoGameForm)
    dropdownSearch.setSelectedIndex($('.video-game-rating'), store.currentGame.rating)
    dropdownSearch.setSelectedIndex($('.video-game-platform'), store.currentGame.platform)
    if(store.currentGame.isAvailable){
        $('#check-on').attr('checked', 'checked')
    }
    $('.video-game-display').hide()
}
// Successfully updated a  video game listing 
// Got to figure out pushing data to refresh
const updateVideoGameSuccess = function () {
    $('#message').text(`Successfully updated ${store.currentGame.title} listing`).removeClass('error')
    $('.video-game-display').show()
    $('.video-game-view').empty()
    $('.update-video-game-view').hide()
    $('#update-video-game').trigger('reset')
    $('#update-video-game').empty()
    refreshEvents.onShowAllGames()
}
const updateVideoGameFailure = function (error) {
    $('#message').text('Failed to update the video game listing').removeClass('error')
}

// Cancel out of game form create or update
const cancelGameForm = function () {
    $('.update-video-game-view, .create-video-game-view').hide()
    $('#create-video-game, #update-video-game').trigger('reset')
    $('#create-video-game, #update-video-game').empty()
    $('.video-game-view').empty()
    $('.video-game-display').show()
    $('#message').text('All game listings!').removeClass('error')
    // showAllGamesSuccess()
    refreshEvents.onShowAllGames()
}

// Successfully delete a new video game
const deleteVideoGameSuccess = function () {
    $('.video-game-display').show()
    $('.video-game-view').empty()
    $('#message').text(`Successfully deleted ${store.currentGame.title} listing`).removeClass('error')
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