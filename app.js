const express = require('express')
const app = express()
const port = 3000
const router = require('./router/index')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false }))
app.use(router)

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: true },
}))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})