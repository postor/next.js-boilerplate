
import { translate } from 'react-i18next'
import Layout from '../components/MyLayout.js'
import {Link} from '../tools/routes'
import i18nHelper from '../tools/i18n-helper'

const Index = (props) => {  
  const {t} = props
  return (<div>
    <h1>{t('My Blog')}</h1>
    <p>
      <Link route='posts'>
        <a>{t('See my posts')} >></a>
      </Link>
    </p>
    <p>
      <Link route='post'  params={{title: 'Hello Next.js'}} >
        <a>{t('See my first post')} >></a>
      </Link>
    </p>
    
  </div>
)}

Index.translateNS = ['index']

export default Layout(translate(Index.translateNS)(Index))