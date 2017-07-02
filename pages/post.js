import Layout from '../components/Layout.js'
import wrapper from '../tools/wrapper'

const Post = (props) => (
    <div>
        <h1>{props.url.query.title}</h1>
        <p>This is the blog post content.</p>
        <p>props: {JSON.stringify(props)}</p>
    </div>
)

export default wrapper(Layout(Post))