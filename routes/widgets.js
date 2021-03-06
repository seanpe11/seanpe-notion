const widget_router = require('express').Router()
const { dirname } = require('path')
const path = require('path')

widget_router.get('/timer', (req, res) => {
    console.log('route')

    res.sendFile(path.join(__dirname, './widgets/timer.html'))
})

widget_router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, './widgets/test.html'))
})

widget_router.get("/deadlines", (req, res) => {
    res.sendFile(path.join(__dirname, './widgets/deadline-widget.html'))
})

widget_router.get("/dropdates", (req, res) => {
    res.sendFile(path.join(__dirname, './widgets/dropdate-widget.html'))
})


module.exports = widget_router