import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { I18nextProvider } from 'react-i18next'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import Header from './Header'
import { default as fetch, getContextedFetch } from '../tools/fetch'
import i18nHelper from '../tools/i18n-helper'
import getTranslation from '../tools/get-translation'
import { initStore, startClock, addCount, serverRenderClock } from '../tools/store'
import {setJSON} from '../tools/store/json'

export default (Page,mapDispatchToProps) => withRedux(initStore, null, mapDispatchToProps)(class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.i18n = i18nHelper.getI18n(props.translations)
  }

  static propTypes = {
    children: PropTypes.any,
    user: PropTypes.object,
  }


  static async getInitialProps(ctx) {
    var fetch = getContextedFetch(ctx)
    ctx.store.dispatch(setJSON({pathname:ctx.pathname},'url'))

    if(!ctx.isServer) return
    //translation
    var translateNS = [...Page.translateNS||[],...Header.translateNS||[]].filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })

    var translations = await getTranslation(
      i18nHelper.getCurrentLanguage(ctx.req),
      translateNS,
      ctx.req
    )

    return {
      translations
    }
  }



  render() {
    var props = {
      ...this.props,
      ...this.state
    }
    return <I18nextProvider i18n={this.i18n}>
      <div className="wrapper">
        <Header {...props} />
        <Page {...props} />
      </div>
    </I18nextProvider>
  }
})


