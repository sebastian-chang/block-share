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
// Shows user video game listings
const onShowUserGames = function () {
    api.showUserGames()
        .then(ui.showUserGamesSuccess)
        .catch(ui.showUserGamesFailure)
}
// Show the details of a selected video game
const onDetailVideoGame = function (event) {
    event.preventDefault()
    const id = $(event.target).closest('section').data('id')
    api.getGameDetails(id)
        .then(ui.videoGameDetailsSuccess)
        .catch(ui.videoGameDetailsFailure)
}
// Leave detail video game view.  Re show all video game listings
const onCancelDetailVideoGame = function (event) {
    event.preventDefault()
    ui.cancelDetailVideoGame()
}
// Send request to 'borrow' video game. Leave detail video game view.  Re show all video game listings
const onBorrowVideoGame = function (event) {
    event.preventDefault()
    ui.borrowVideoGame()
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
    console.log('This is the form date for creating a new video game listing ', formData)
    api.createGame(formData)
        .then(ui.createVideoGameSuccess)
        .catch(ui.createVideoGameFailure)
}

// Create new video game functions
// Switch to the new video game form
const onUpdateGameForm = function (event) {
    event.preventDefault()
    ui.showUpdateGameForm()
}
// Update a given video game listing
const onUpdateVideoGame = function (event) {
    event.preventDefault()
    const formData = getFormFields(event.target)
    console.log('This is the form date for updating a video game listing ', formData)
    api.updateGame(formData)
        .then(ui.updateVideoGameSuccess)
        .catch(ui.updateVideoGameFailure)
}

// Cancel function incase user didn't want to change password
const onGameFormCancel = function (event) {
    event.preventDefault()
    console.log('trying to go back')
    ui.cancelGameForm()
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
    onShowUserGames,
    onCreateGameForm,
    onCreateVideoGame,
    onUpdateGameForm,
    onUpdateVideoGame,
    onDetailVideoGame,
    onCancelDetailVideoGame,
    onBorrowVideoGame,
    onGameFormCancel,
    onDeleteVideoGame,
}