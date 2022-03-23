const express = require('express');
const app = express()
const port = 3000
const routes = require('./routers/index');
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.use()

app.listen(port, () => {
    console.log(`listen to port ${port}`)
})