import Cookies from 'js-cookie'

import Layout from '../components/Layout.js'
import fetch from '../tools/fetch'
import wrapper from '../tools/wrapper'

const About = (props) => (
    <div>
        <p>This is the about page</p>
        <p>props: {JSON.stringify(props)}</p>
    </div>
)

export default wrapper(Layout(About))