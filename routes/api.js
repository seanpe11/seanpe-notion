const api_router = require('express').Router()
const { getRandomQuote } = require("../api/client")

api_router.get("/test", (req, res) => {
    res.send("test")
})

// create a pomodoro timer

api_router.get("/random-quote", getRandomQuote)

module.exports = api_router