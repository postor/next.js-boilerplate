import React from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { I18nextProvider } from 'react-i18next'
import { connect } from 'react-redux'

import { default as fetch, getContextedFetch } from './fetch'
import { i18nWrapper } from './i18n-helper'
import { initStore, reduxWrapper } from './store'
import { setJSON } from './store/json'

export default (Page) => reduxWrapper(i18nWrapper(connect()(class MyWrapper extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch, url } = props
    dispatch(setJSON(url, 'url'))
  }

  render() {
    return <Page {...this.props} />
  }

  static async getInitialProps(ctx) {
    var pageInitialProps = {}
    Page.getInitialProps && (pageInitialProps = await Page.getInitialProps(ctx))
    return pageInitialProps
  }

  static translateNS = Page.translateNS
})))
