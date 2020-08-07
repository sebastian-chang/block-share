const store = require('../store')
const videoGames = require('../video-games/events')

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
const signInFailure = function () {
    $('#message').text('Could not log in.  Please try again.').addClass('error')
}
// Functions to switch between signing up and signing in
const signUpSwitch = function () {
    $('.signin-view').hide()
    $('.signup-view').show()
}
const signInSwitch = function () {
    $('.signin-view').show()
    $('.signup-view').hide()
}

// Logout functions
const logoutSuccess = function () {
    $('#message').text('Successfully logged out!').removeClass('error')
    $('.signin-view').show()
    $('.signup-view, .logged-in, .user-settings-view, .video-game-display, \
    .update-video-game-view, .create-video-game-view').hide()
    $('.video-game-view').empty()
}
const logoutFailure = function () {
    $('#message').text('Failed to logout.').addClass('error')
}

// Change password functions
const changePasswordSuccess = function () {
    $('#message').text('Password successfully changed!').removeClass('error')
    $('.user-settings-view').hide()
    $('.change-password-button').show()
    $('#change-password').trigger('reset')
}
const changePasswordFailure = function () {
    $('#message').text('An error has occurred while attempting change your password.  Please try again.').addClass('error')
}
// Update user functions
const updateUserSuccess = function () {
    $('#message').text('User successfully updated!').removeClass('error')
    $('.user-settings-view').hide()
    $('.change-password-button').show()
    $('#change-password').trigger('reset')
}
const upDateUserFailure = function () {
    $('#message').text('An error has occurred while attempting to update your user.  Please try again.').addClass('error')
}
// Switch back to previous view before attempting to change password
const changePasswordSwitch = function () {
    $('.update-video-game-view, .create-video-game-view, .change-password-button').hide()
    $('.user-settings-view, .video-game-display').show()
    $('#create-video-game').trigger('reset')
    $('#update-video-game').trigger('reset')
    $('.video-game-view').empty()
}
const changePasswordCancel = function () {
    $('.user-settings-view').hide()
    $('.new-game, .change-password-button').show()
    videoGames.onShowAllGames()

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
    upDateUserFailure,
    updateUserSuccess,
    changePasswordFailure,
    changePasswordSuccess,
    changePasswordSwitch,
    changePasswordCancel,
}