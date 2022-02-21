const api_router = require('express').Router()

api_router.get("/test", (req, res) => {
    res.send("test")
})

module.exports = api_router