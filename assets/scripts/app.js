'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const videoGameEvents = require('./video-games/events')
const videoGameForm = require('./templates/handlebars/video-games/video-game-form.handlebars')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here

  // Hide views
  $('.signup-view, .logged-in, .change-password-view, .video-game-display, .create-video-game-view, \
   .update-video-game-view').hide()

  // Append handlebars to forms
  $('#create-video-game').append(videoGameForm)
  $('#update-video-game').append(videoGameForm)

  // Authorization event listeners
  $('#signup').on('submit', authEvents.onSignUp)
  $('#signin').on('submit', authEvents.onSignIn)
  $('#signup-button').on('click', authEvents.onSignUpSwitch)
  $('#signin-button').on('click', authEvents.onSignInSwitch)
  $('.logout-button').on('click', authEvents.onLogout)
  $('#change-password').on('submit', authEvents.onChangePassword) // Actually changes password
  $('.change-password-button').on('click', authEvents.onChangePasswordSwitch) // Changes to the change password screen
  $('#cancel-change-button').on('click', authEvents.onChangePasswordCancel) // Cancels out of change password screen

  // Video game event listeners
  $('.new-game-button').on('click', videoGameEvents.onCreateGameForm)
  $('.get-games-button').on('click', videoGameEvents.onShowAllGames)
  $('#create-video-game').on('submit', videoGameEvents.onCreateVideoGame)
  $('.video-game-view').on('click', '.video-game-section', videoGameEvents.onDetailVideoGame)
  $('.video-game-view').on('click', '#delete-video-game', videoGameEvents.onDeleteVideoGame)
})
