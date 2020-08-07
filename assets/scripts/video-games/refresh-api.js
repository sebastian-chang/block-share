const config = require('../config')
const store = require('../store')

// Show all video games available to be borrowed
const showAllGames = function () {
    return $.ajax({
        url: config.apiUrl + '/video-games',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + store.user.token,
        },
    })
}