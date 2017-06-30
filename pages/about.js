import Cookies from 'js-cookie'

import Layout from '../components/MyLayout.js'
import fetch from '../tools/fetch'

const About = (props) => (
    <div>
       <p>This is the about page</p>
       <p>props: {JSON.stringify(props)}</p>
    </div>
)

About.getInitialProps = ({req,res})=>{
    return fetch('/api/auth', {}, req, res)
    .then(r=>r.json())
    .then((user)=>{
        return {about:{user, cookieDate: Cookies.get('date')}}
    })
}

export default Layout(About)