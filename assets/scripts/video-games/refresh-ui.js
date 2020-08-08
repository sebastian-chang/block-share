const store = require('../store')
const showVideoGamesTemplate = require('../templates/handlebars/video-games/video-games-display.handlebars')


// Show all video games
const showAllGamesSuccess = function (response) {
    if (response) {
        store.videoGames = response.videoGames
    }
    const showVideoGamesHTML = showVideoGamesTemplate({ videoGames: store.videoGames })
    $('.video-game-view').empty()
    $('.video-game-view').append(showVideoGamesHTML)
    $('.show-user-listings').show()
    $('.show-all-listings').hide()
}
const showAllGamesFailure = function () {
    $('#message').text('Failed to get all video games').addClass('error')
}

module.exports = {
    showAllGamesFailure,
    showAllGamesSuccess,
}