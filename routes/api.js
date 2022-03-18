const api_router = require('express').Router()
const { getRandomQuote } = require("../api/getQuote")
const { getDeadlines, getDropDates } = require("../api/deadlines")

api_router.get("/test", (req, res) => {
    res.send("test")
})

// create a pomodoro timer
api_router.get("/random-quote/:json?", getRandomQuote)

// deadlines

api_router.get("/deadlines", getDeadlines)

api_router.get("/dropdates", getDropDates)

module.exports = api_router