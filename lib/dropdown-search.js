function setSelectedIndex(dropdown, selected) {
    // Loop through all the items in drop down list
    for (let i = 0; i < dropdown[0].options.length; i++) {
        console.log('the option right now is ', dropdown[0].options[i].value)
        console.log('the valsearch right now is ', selected)
        if (dropdown[0].options[i].value === selected) {
            // Item is found. Set its property and exit
            dropdown[0].options[i].selected = true
            console.log('found something ', dropdown[0].options[i])
            break
        }
    }
    console.log('this is valsearch ', selected)
    return
}

module.exports = {
    setSelectedIndex,
}