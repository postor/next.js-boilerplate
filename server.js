const express = require('express')
const next = require('next')
const spdy = require('spdy')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { redirect, http2 } = require('certbot-express')
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
    server.use('/static', express.static('static'))

    //redirect to http2, dev do nothing
    !dev && server.use(redirect)

    //cookie
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())
    server.use(cookieParser())

    //api
    server.use('/api', apiRoute)

    //next routes
    server.use(handle)

    //http && http2
    return http2({
      dev,  // only http for dev
      app: server,
      keyPath: '/etc/letsencrypt/live/test.i18ntech.com/privkey.pem',    //free cert refer https://github.com/postor/certbot-express
      certPath: '/etc/letsencrypt/live/test.i18ntech.com/fullchain.pem', //free cert refer https://github.com/postor/certbot-express
    }).listen()
  })
  .then(() => {
    console.log('> Ready http on http://localhost')
    !dev && console.log('> Ready http2 on https://localhost')
    process.send && process.send('http ready')
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })