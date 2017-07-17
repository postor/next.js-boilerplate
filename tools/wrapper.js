import React from 'react'
import { connect } from 'react-redux'

import { i18nWrapper } from './i18n-helper'
import { reduxWrapper } from './store'
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
