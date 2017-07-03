import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { I18nextProvider } from 'react-i18next'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import { default as fetch, getContextedFetch } from './fetch'
import { i18nWrapper } from './i18n-helper'
import getTranslation from './get-translation'
import { initStore } from './store'
import { setJSON } from './store/json'

export default (Page) => {
  var I18nPage = i18nWrapper(Page)
  return withRedux(initStore)(class ReduxWrapper extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch, url, storeState } = props
    storeState && dispatch(setJSON(storeState))
    dispatch(setJSON(url, 'url'))
  }

  static propTypes = {
    children: PropTypes.any,
  }

  static async getInitialProps(ctx) {
    var fetch = getContextedFetch(ctx)
    var newCtx = { ...ctx, contextedFetch: fetch }
    var pageInitialProps = {}
    I18nPage.getInitialProps && (pageInitialProps = await I18nPage.getInitialProps(ctx))

    if (!ctx.isServer) return { pageInitialProps }

    var storeState = ctx.store.getState()
    return {
      storeState,
      pageInitialProps,
    }
  }

  render() {
    var { pageInitialProps } = this.props
    return <I18nPage {...pageInitialProps} />
  }
})
}


