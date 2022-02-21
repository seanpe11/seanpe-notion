const express = require('express')
const { Client } = require("@notionhq/client")
const app = express()
const port = process.env.port || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// routes
const api = require('./routes/api')
const widgets = require('./routes/widgets')
app.use('/widgets', widgets)
app.use('/api', api)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})