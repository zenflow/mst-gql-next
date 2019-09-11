import React from 'react'
import { applySnapshot, getSnapshot } from 'mobx-state-tree'
import { createHttpClient } from 'mst-gql'
import App from 'next/app'
import reactTestRenderer from 'react-test-renderer'
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

// Custom implementation of `mst-gql`s getDataFromTree to support getting queries that start only after another query finishes
async function getDataFromTree (tree, store) {
  const renderer = reactTestRenderer.create(tree)
  while (store.__promises.size > 0) {
    // console.log(`awaiting ${store.__promises.size} promises...`)
    await Promise.all(store.__promises)
  }
  renderer.unmount()
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
