const express = require('express')
const next = require('next')
const spdy = require('spdy')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

//csrf
const csurf = require('csurf')
const csrfProtection = csurf({ cookie: true })
const csrfSetHeader = (req,res,next)=>{  
  res.header('csrf-token', req.csrfToken())
  res.header('Access-Control-Allow-Origin', '*')
  
  next()
}

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

  //example user
  const user = {
    username: 'test',
    passwd: '123456',
    tempkey: 'tempkey',
  }

  //login
  server.post('/auth', csrfProtection, csrfSetHeader, (req, res) => {
    if(req.body && req.body.username === user.username && req.body.passwd === user.passwd){
      res.cookie('user',JSON.stringify(user))
      res.header('custom-set-cookie',res.getHeader('set-cookie'))
      res.json(user)
    }else{
      res.json({error: 'wrong pass or no such account',body:req.body})
    }
  })

  //this api acts different after login
  server.get('/auth', csrfProtection, csrfSetHeader, (req, res) => {
    res.cookie('date',new Date())
    res.header('custom-set-cookie',res.getHeader('set-cookie'))
    var tuser = req.cookies.user
    tuser = tuser && JSON.parse(tuser)
    if(tuser && tuser.tempkey === user.tempkey && tuser.username === user.username){
      res.json(user)
    }else{
      res.json({error: 'not loged in',tuser})
    }
  })

  

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