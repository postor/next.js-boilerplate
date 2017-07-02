import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { I18nextProvider } from 'react-i18next'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import { default as fetch, getContextedFetch } from './fetch'
import i18nHelper from './i18n-helper'
import getTranslation from './get-translation'
import { initStore } from './store'
import { setJSON } from './store/json'

export default (Page) => withRedux(initStore)(class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch, translations, url, storeState } = props
    this.i18n = i18nHelper.getI18n(translations)
    dispatch(setJSON(storeState))
    dispatch(setJSON(url, 'url'))
  }

  static propTypes = {
    children: PropTypes.any,
  }

  static async getInitialProps(ctx) {
    var fetch = getContextedFetch(ctx)
    var newCtx = { ...ctx, contextedFetch: fetch }

    Page.getInitialProps && await Page.getInitialProps(ctx)

    if (!ctx.isServer) return {}
    //translation
    var translateNS = [...Page.translateNS || []].filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })

    var translations = await getTranslation(
      i18nHelper.getCurrentLanguage(ctx.req),
      translateNS,
      ctx.req
    )

    const storeState = ctx.store.getState()
    return {
      translations,
      storeState
    }
  }

  render() {
    return <I18nextProvider i18n={this.i18n}>      
        <Page />
    </I18nextProvider>
  }
})


