/** returns an html ready string */ 
function parseNotionText(textArr){
    let finalString = textArr.reduce((prev, current) => {
        let curString = current.plain_text
        if (current.annotations.bold){
            curString = "<b>" + curString + "</b>"
        }
        if (current.annotations.italicized){
            curString = "<i>" + curString + "</i>"
        }
        if (current.annotations.underlined){
            curString = "<u>" + curString + "</u>"
        }
        return prev + curString
    }, "")
    // console.log(finalString)
    return finalString
}

module.exports.parseNotionText = parseNotionText