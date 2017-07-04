import Layout from '../components/Layout.js'

const Post = (props) => (
    <div>
        <h1>{props.url.query.title}</h1>
        <p>This is the blog post content.</p>
        <p>props: {JSON.stringify(props)}</p>
    </div>
)

export default Layout(Post)