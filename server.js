const express = require('express')
const next = require('next')
const spdy = require('spdy')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const apiRoute = require('./tools/api-route')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })


//routes
const routes = require('./tools/routes')
const handle = routes.getRequestHandler(app)

app.prepare()
.then(() => {
  const server = express()

  //static
  server.use('/static',express.static('static'))

  //cookie
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())
  server.use(cookieParser())

  //api
  server.use('/api',apiRoute)

  //next routes
  server.use(handle)

  //http
  server.listen(80, (err) => {
    if (err) throw err
    console.log('> Ready http on http://localhost')
  })

  //http2
  spdy.createServer({
      key: fs.readFileSync(__dirname + '/server.key'),
      cert:  fs.readFileSync(__dirname + '/server.crt')
  }, server)
  .listen(433, (err) => {
    if (err) throw err
    console.log('> Ready http2 on https://localhost')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})