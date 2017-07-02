
import { translate } from 'react-i18next'
import Layout from '../components/Layout.js'
import { Link } from '../tools/routes'
import wrapper from '../tools/wrapper'

const translateNS = ['index']

const Index = (props) => {
  const { t } = props
  return (<div>
    <h1>{t('My Blog')}</h1>
    <p>
      <Link route='posts'>
        <a>{t('See my posts')} >></a>
      </Link>
    </p>
    <p>
      <Link route='post' params={{ title: 'Hello Next.js' }} >
        <a>{t('See my first post')} >></a>
      </Link>
    </p>

  </div>
  )
}

Index.translateNS = translateNS

export default wrapper(Layout(translate(translateNS)(Index)))