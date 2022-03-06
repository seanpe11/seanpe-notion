const api_router = require('express').Router()
const { getRandomQuote } = require("../api/getQuote")
const { getDeadlines } = require("../api/deadlines")

api_router.get("/test", (req, res) => {
    res.send("test")
})

// create a pomodoro timer
api_router.get("/random-quote/:json?", getRandomQuote)

// deadlines

api_router.get("/deadlines", getDeadlines)

module.exports = api_router