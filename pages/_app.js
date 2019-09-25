import { applySnapshot, getSnapshot } from 'mobx-state-tree'
import { createHttpClient, getDataFromTree } from 'mst-gql'
import App from 'next/app'
import Head from 'next/head'
import { RootStore, StoreContext } from '../models'
import {port} from '../server/env'

const isServer = !process.browser
const selfHost = process.browser ? global.location.host : `localhost:${port}`

let store

export function getStore (snapshot = null) {
  if (isServer || !store) {
    store = RootStore.create(undefined, {
      gqlHttpClient: createHttpClient(`http://${selfHost}/api/graphql`, {
        headers: {
          'x-graphql-deduplicate': '1',
        }
      }),
      ssr: true,
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
      const tree = <MyApp {...({Component, router, pageProps, store})}/>
      await getDataFromTree(tree, store)

      /** Head.rewind()
       *  Is that necessary?
       *    > getDataFromTree does not call componentWillUnmount
       *    > head side effect therefore need to be cleared manually
       *      - https://github.com/zeit/next.js/blob/fe7c7342c7d6ba91c5802b01cf24b60da9f3d065/examples/api-routes-apollo-server-and-client/apollo/client.js#L84-L86
       *  Is that really true?
       */

      storeSnapshot = getSnapshot(store)
    }

    return {pageProps, storeSnapshot}
  }

  constructor (props) {
    super(props)
    this.store = props.store || getStore(props.storeSnapshot)
    Object.assign(global, {store: this.store}) // for debugging
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
