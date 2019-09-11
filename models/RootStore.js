import { RootStoreBase } from './RootStore.base'

const defaultFetchPolicy = 'cache-and-network'
// mst-gql's default: 'cache-and-network'
// other options: 'cache-first', 'cache-only', 'network-only', 'no-cache'
// see https://github.com/mobxjs/mst-gql#query-caching

export const RootStore = RootStoreBase
  .actions(self => {
    const superQuery = self.query
    return {
      // sets default `fetchPolicy`
      query (query, variables, options) {
        return superQuery(query, variables, {...options, fetchPolicy: options.fetchPolicy || defaultFetchPolicy})
      }
    }
  })
