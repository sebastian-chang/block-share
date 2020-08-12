const store = require('../store')
const videoGames = require('../video-games/events')
const refreshEvents = require('../video-games/refresh-events')

// Sign up and sign in functions
const signUpSuccess = function () {
    $('#message').text('Successfully signed up!').removeClass('error')
    $('.signin-view').show()
    $('.signup-view').hide()
    $('#signup').trigger('reset')
}
const signUpFailure = function () {
    $('#message').text('Sign up failed').addClass('error')
}
const signInSuccess = function (response) {
    $('#message').text('Successfully signed in!').removeClass('error')
    store.user = response.user
    videoGames.onShowAllGames()
    $('.logged-in, .video-game-display').show()
    $('.signin-view').hide()
    $('#signin').trigger('reset')
}
const signInFailure = function (error) {
    $('#message').text(`${error.responseJSON.message}.  Please try again.`).addClass('error')
}
// Functions to switch between signing up and signing in
const signUpSwitch = function () {
    $('#signin').trigger('reset')
    $('.signin-view').hide()
    $('.signup-view').show()
}
const signInSwitch = function () {
    $('#signup').trigger('reset')
    $('.signin-view').show()
    $('.signup-view').hide()
}

// Logout functions
const logoutSuccess = function () {
    $('#message').text('Successfully logged out!').removeClass('error')
    $('.signin-view').show()
    $('#change-password, #update-user').trigger('reset')
    $('.signup-view, .logged-in, .user-info-view, .video-game-display, \
    .update-video-game-view, .change-password-view, .create-video-game-view').hide()
    $('.video-game-view').empty()
}
const logoutFailure = function () {
    $('#message').text('Failed to logout.').addClass('error')
}

// Change password functions
const changePasswordSuccess = function () {
    $('#message').text('Password successfully changed!').removeClass('error')
    $('.user-info-view, .change-password-view').hide()
    $('.new-game, .change-password-button, .video-game-display').show()
    $('#change-password').trigger('reset')
    refreshEvents.onShowAllGames()
}
const changePasswordFailure = function () {
    $('#message').text('An error has occurred while attempting change your password.  Please try again.').addClass('error')
}
// Update user functions
const updateUserSuccess = function (response) {
    $('#message').text('User successfully updated!').removeClass('error')
    store.user = response.user
    $('.user-info-view, .change-password-view').hide()
    $('.new-game, .change-password-button, .video-game-display').show()
    $('#change-password').trigger('reset')
    refreshEvents.onShowAllGames()
}
const updateUserFailure = function (error) {
    $('#message').text(`${error.responseJSON.message}.  Please try again.`).addClass('error')
}
// Switches to change password view
const changePasswordSwitch = function () {
    $('#message').text('Update your password.').removeClass('error')
    $('.update-video-game-view, .create-video-game-view, .change-password-button, .video-game-display, .user-info-view, .show-user-listings').hide()
    $('.change-password-view, .new-game-button, .user-info-button, .show-all-listings').show()
    $('#update-video-game, #change-password, #update-user, #update-user').trigger('reset')
    $('.video-game-view').empty()
}
// Switches to user settings view
const userSettingsSwitch = function () {
    $('#message').text('Update your user settings.').removeClass('error')
    $('.update-video-game-view, .create-video-game-view, .user-info-button, .video-game-display, .show-user-listings, .change-password-view').hide()
    $('.user-info-view, .new-game-button, .change-password-button, .show-all-listings').show()
    $('#update-video-game, #change-password, #update-user, #update-user').trigger('reset')
    $('#update-user #update-email').val(store.user.email)
    $('#update-user #update-first').val(store.user.firstName)
    $('#update-user #update-last').val(store.user.lastName)
    $('#update-user #update-username').val(store.user.userName)
    $('.video-game-view').empty()
}
const changePasswordCancel = function () {
    $('#change-password, #update-user').trigger('reset')
    $('.user-info-view, .change-password-view').hide()
    $('.new-game, .change-password-button, .video-game-display .user-info-button').show()
    refreshEvents.onShowAllGames()

}

module.exports = {
    signUpFailure,
    signUpSuccess,
    signInFailure,
    signInSuccess,
    signUpSwitch,
    signInSwitch,
    logoutFailure,
    logoutSuccess,
    updateUserFailure,
    updateUserSuccess,
    changePasswordFailure,
    changePasswordSuccess,
    changePasswordSwitch,
    userSettingsSwitch,
    changePasswordCancel,
}