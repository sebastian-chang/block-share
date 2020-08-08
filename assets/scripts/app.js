'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const videoGameEvents = require('./video-games/events')
// const videoGameForm = require('./templates/handlebars/video-games/video-game-form.handlebars')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here

  // Hide views
  $('.signup-view, .logged-in, .user-info-view, .change-password-view, .video-game-display, .create-video-game-view, \
   .update-video-game-view').hide()

  // Authorization event listeners
  $('#signup').on('submit', authEvents.onSignUp)
  $('#signin').on('submit', authEvents.onSignIn)
  $('#signup-button').on('click', authEvents.onSignUpSwitch)
  $('#signin-button').on('click', authEvents.onSignInSwitch)
  $('.logout-button').on('click', authEvents.onLogout)
  $('#update-user').on('submit', authEvents.onUpdateUser) // Actually updates users
  $('.change-password-button').on('click', authEvents.onChangePasswordSwitch) // Changes to the change password screen
  $('#change-password').on('submit', authEvents.onChangePassword) // Actually changes password
  $('.cancel-change-button').on('click', authEvents.onChangePasswordCancel) // Cancels out of change password screen

  // Video game event listeners
  $('.new-game-button').on('click', videoGameEvents.onCreateGameForm) // Changes to create game listing form
  $('.show-all-listings').on('click', videoGameEvents.onShowAllGames) // Gets video game listings
  $('.show-user-listings').on('click', videoGameEvents.onShowUserGames) // Gets video game listings that belong to a certain user
  $('#create-video-game').on('submit', videoGameEvents.onCreateVideoGame)
  $('#update-video-game').on('submit', videoGameEvents.onUpdateVideoGame)
  // Handlebar video game event listeners
  $('.video-game-view').on('click', '.video-game-section', videoGameEvents.onDetailVideoGame)
  $('.video-game-view').on('click', '#delete-video-game', videoGameEvents.onDeleteVideoGame)
  $('.video-game-view').on('click', '#cancel-video-game', videoGameEvents.onCancelDetailVideoGame)
  $('.video-game-view').on('click', '.close-borrow-modal', videoGameEvents.onCancelDetailVideoGame)
  $('.video-game-view').on('click', '#borrow-video-game', videoGameEvents.onBorrowVideoGame) // Send request to borrow video game
  $('#create-video-game').on('click', '#cancel-submit-button', videoGameEvents.onGameFormCancel) // Cancel posting create
  $('#update-video-game').on('click', '#cancel-submit-button', videoGameEvents.onGameFormCancel) // Cancel posting update
  $('.video-game-view').on('click', '#update-game-button', videoGameEvents.onUpdateGameForm) // Changes to update game listing
})
