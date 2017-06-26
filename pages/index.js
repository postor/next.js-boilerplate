import Layout from '../components/MyLayout.js'
import {Link} from '../tools/routes'
import i18nHelper from '../tools/i18n-helper'

const translateNS = 'index'

const Index = () => {  
  const t = i18nHelper.getFixedT(translateNS)
  return (<div>
    <h1>{t('My Blog')}</h1>
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
)}

Index.getInitialProps = function() {
  return Promise.resolve({translateNS:[translateNS]})
}

export default Layout(Index)