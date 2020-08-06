const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

// Show video games functions
// Shows all video game listings
const onShowAllGames = function () {
    api.showAllGames()
        .then(ui.showAllGamesSuccess)
        .catch(ui.showAllGamesFailure)
}
// Show the details of a selected video game
const onDetailVideoGame = function (event) {
    event.preventDefault()
    const id = $(event.target).closest('section').data('id')
    api.getGameDetails(id)
        .then(ui.videoGameDetailsSuccess)
        .catch(ui.videoGameDetailsFailure)
}

// Create new video game functions
// Switch to the new video game form
const onCreateGameForm = function (event) {
    event.preventDefault()
    ui.showCreateGameForm()
}
// Create a new video game listing
const onCreateVideoGame = function (event) {
    event.preventDefault()
    const formData = getFormFields(event.target)
    console.log('This is the form date for creating a new video game listing ',formData)
    api.createGame(formData)
        .then(ui.createVideoGameSuccess)
        .catch(ui.createVideoGameFailure)
}

// Delete video game
const onDeleteVideoGame = function (event) {
    event.preventDefault()
    const id = $(event.target).closest('section').data('id')
    api.deleteGame(id)
        .then(ui.deleteVideoGameSuccess(id))
        .catch(ui.deleteVideoGameFailure)
}

module.exports = {
    onShowAllGames,
    onCreateGameForm,
    onCreateVideoGame,
    onDetailVideoGame,
    onDeleteVideoGame,
}