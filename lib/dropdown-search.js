// Searches through dropdown for correct selected option
function setSelectedIndex(dropdown, selected) {
    // Loop through all the items in drop down list
    for (let i = 0; i < dropdown[0].options.length; i++) {
        if (dropdown[0].options[i].value === selected) {
            // Item is found. Set its property and exit
            dropdown[0].options[i].selected = true
            break
        }
    }
    return
}

module.exports = {
    setSelectedIndex,
}