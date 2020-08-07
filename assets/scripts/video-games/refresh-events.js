const api = require('./api')
const ui = require('./refresh-ui')


// Show video games functions
// Shows all video game listings
const onShowAllGames = function () {
    api.showAllGames()
        .then(ui.showAllGamesSuccess)
        .catch(ui.showAllGamesFailure)
}

module.exports = {
    onShowAllGames,
}