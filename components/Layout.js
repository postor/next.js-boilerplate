import React from 'react'
import Header from './Header'

const layout = (Page) => class Layout extends React.Component {
  render() {
    return (<div className="wrapper">
      <Header />
      <Page />
    </div>)
  }
  static translateNS = [...Header.translateNS, ...Page.translateNS || []]
  static getInitialProps = async (ctx) => {
    return await Promise.all([
      Header.getInitialProps(ctx),
      Page.getInitialProps ? Page.getInitialProps(ctx) : Promise.resolve(true),
    ])
  }
}


export default layout