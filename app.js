if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
  
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./router/index')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false }))

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: true },
}))

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})