// routes.js
const nextRoutes = require('next-routes')

const routes = module.exports = nextRoutes()

routes.add('index', '/')
routes.add('login', '/login')
routes.add('about', '/about')
routes.add('posts', '/posts')
routes.add('post', '/p/:title')



