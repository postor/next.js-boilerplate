import Layout from '../components/MyLayout.js'
import {Link} from '../tools/routes'

const Index = () => (
  <div>
    <h1>My Blog</h1>
    <p>
      <Link route='posts'>
        <a>See my posts >></a>
      </Link>
    </p>
    <p>
      <Link route='post'  params={{title: 'Hello Next.js'}} >
        <a>See my first post >></a>
      </Link>
    </p>
    
  </div>
)

export default Layout(Index)