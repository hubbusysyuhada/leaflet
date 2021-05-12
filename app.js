if (process.env.NODE_ENV === 'development') require('dotenv').config()
const session = require('express-session')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const cors = require('cors')
const router = require('./routes')
app.use(session({
  secret: "it's a secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.static("public"));
app.set('view engine', 'ejs')
app.use(cors())
app.use(express.urlencoded({extended:true}))
// app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})