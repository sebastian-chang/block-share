const store = require('../store')
const showVideoGamesTemplate = require('../templates/handlebars/video-games/video-games-display.handlebars')


// Show all video games
const showAllGamesSuccess = function (response) {
    if (response) {
        store.videoGames = response.videoGames
    }
    // $('#message').text('All game listings!').removeClass('error')
    const showVideoGamesHTML = showVideoGamesTemplate({ videoGames: store.videoGames })
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
    if (response) {
        store.videoGames = response.videoGames
    }
    const showVideoGamesHTML = showVideoGamesTemplate({ videoGames: store.videoGames })
    $('#message').text('All your game listings!').removeClass('error')
    $('.video-game-view, #create-video-game, #update-video-game').empty()
    $('.video-game-view').append(showVideoGamesHTML)
    $('.show-user-listings, .video-game-display, .new-game-button, .change-password-button').show()
    $('.show-all-listings, .change-password-view, .user-info-view, .update-video-game-view, .create-video-game-view').hide()
}
const showUserGamesFailure = function () {
    $('#message').text('Failed to get user video games').addClass('error')
}

module.exports = {
    showAllGamesFailure,
    showAllGamesSuccess,
    showUserGamesFailure,
    showUserGamesSuccess,
}