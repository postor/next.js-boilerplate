/**
 * @author joshlin <postor@gmail.com>
 */

import { default as routes, Link} from './routes'

/**
 * NavItem自定义菜单组件
 * 
 * @param {Object} props 接收的属性
 * @param {Object} props.url 来自nextjs框架的url对象
 * @param {Object} props.liProps li的属性
 * @param {Object} props.linkProps Link（来自react-routes）的属性
 * @param {Object} props.activeStyle 激活状态的样式
 * @param {string} props.activeClassName 激活时追加的类
 * @param {Object} props.activeLinkStyle 激活状态的样式
 * @param {string} props.activeLinkClassName 激活时追加的类
 * @param {boolean} props.nolink 不使用Link的设置为true
 * @param {function=isActive} props.checkIsActive 验证是否为激活为激活的回调，{@link isActive}
 * @param {ReactDom} props.children 子内容
 */
const NavItem = (props)=>{
  const {url={}, liProps={}, linkProps={}, children, activeStyle={}, activeClassName='ative', activeLinkStyle={}, activeLinkClassName='', nolink, checkIsActive=isActive} = props
  if(!nolink && checkIsActive(url,linkProps)){
    //li
    liProps.style = {
      ...liProps.style,
      ...activeStyle,
    }
    var {className = ''} = liProps
    liProps.className = `${className} ${activeClassName}`

    //link
    linkProps.style = {
      ...linkProps.style,
      ...activeStyle,
    }
    var {className = ''} = linkProps
    linkProps.className = `${className} ${activeClassName}`
  }

  return <li {...liProps}>
    {nolink?children:<Link {...linkProps}>{children}</Link>}</li>

  /**
   * 检查此Link是否匹配当前的url
   * 
   * @param {string} {pathname} 接收的是来自nextjs框架的url对象，这里只用到了pathname
   * @param {string} {route} 接收的是来自props的props.linkProps对象，这里只用到了route
   * @returns {boolean}
   */
  function isActive({pathname},{route}){
    if(!pathname || !route || !routes.findByName(route)){
      console.log([pathname,route,routes.findByName(route),'not found!!!'])
      return false
    }
    return routes.findByName(route).page ===  pathname
  }
}

/**
 * 自定义导航组件
 * @param {Object} props 
 * @param {Object} props.ulProps ul的属性
 * @param {Object} props.url 来自nextjs框架的url对象
 * @param {Object} props.links 包含的链接（NavItem）
 * @param {Object} props.liProps li的属性（向NavItem传递）
 * @param {Object} props.activeStyle 激活状态的样式（向NavItem传递）
 * @param {string} props.activeClassName 激活时追加的类（向NavItem传递）
 * @param {function=isActive} props.checkIsActive 验证是否为激活为激活的回调，{@link isActive}（向NavItem传递）
 */
const MyNav = (props)=>{
  return <ul {...props.ulProps}>
    {props.links.map((link,i)=>{
      var linkProps = {
        ...props,
        ...link,
      }
      return <NavItem key={i} {...linkProps} />
    })}
  </ul>

}

export default MyNav