import Layout from '../components/Layout.js'
import { Link } from '../tools/routes'

const PostLink = (props) => (
  <li>
    <Link route='post' params={{ title: props.title }}>
      <a>{props.title}</a>
    </Link>
  </li>
)

const Posts = () => (
  <div>
    <h1>My Posts</h1>
    <ul>
      <PostLink id="hello-nextjs" title="Hello Next.js" />
      <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
      <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
    </ul>
  </div>
)

export default Layout(Posts)