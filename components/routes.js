// routes.js
const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('index', '/')
routes.add('login', '/login')
routes.add('about', '/about')
routes.add('post', '/p/:title')

const Link = routes.Link

const NavItem = (props)=>{
  const {url, liProps, linkProps, children, activeStyle, nolink} = props
  !nolink && isActive(url,linkProps) && (liProps.style = {
    ...liProps.style,
    ...activeStyle,
  })

  return <li {...liProps}>
    {nolink?children:<Link {...linkProps}>{children}</Link>}</li>

  function isActive({pathname},{route}){
    if(!pathname || !route || !routes.findByName(route)){
      console.log([pathname,route,routes.findByName(route),'not found!!!'])
      return false
    }
    console.log([pathname,routes.findByName(route).page,pathname,routes.findByName(route).pattern ===  pathname])
    return routes.findByName(route).page ===  pathname

  }
}

routes.MyNav = (props)=>{
  return <ul {...props.ulProps}>
    {props.links.map((link,i)=><NavItem key={i} {...link} />)}
  </ul>

}


