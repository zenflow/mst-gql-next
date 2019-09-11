import React from 'react'
import { applySnapshot, getSnapshot } from 'mobx-state-tree'
import { createHttpClient, getDataFromTree } from 'mst-gql'
import App from 'next/app'
import { RootStore, StoreContext } from '../models'

const isServer = !process.browser

let store
export function getStore (snapshot = null) {
  if (isServer || !store) {
    store = RootStore.create(undefined, {
      gqlHttpClient: createHttpClient('http://localhost:4000/graphql'),
      ssr: isServer,
    })
  }
  if (snapshot) {
    applySnapshot(store, snapshot)
  }
  return store
}

export default class MyApp extends App {
  static async getInitialProps ({Component, router, ctx}) {
    const store = getStore()

    const pageProps = (Component.getInitialProps && await Component.getInitialProps({...ctx, store})) || {}

    let storeSnapshot
    if (isServer) {
      const tree = <MyApp Component={Component} router={router} pageProps={pageProps} store={store}/>
      await getDataFromTree(tree, store)
      storeSnapshot = getSnapshot(store)
    }

    return {pageProps, storeSnapshot}
  }

  constructor (props) {
    super(props)
    this.store = props.store || getStore(props.storeSnapshot)
    global.store = this.store // for debugging
  }

  render () {
    const {Component, pageProps} = this.props
    return (
      <StoreContext.Provider value={this.store}>
        <Component {...pageProps} />
      </StoreContext.Provider>
    )
  }
}
