# TODO

- fetching same data over multiple times when selecting data from nested elements
    https://medium.com/@gajus/reducing-graphql-response-size-by-a-lot-ff5ba9dcb60
    https://github.com/gajus/graphql-deduplicator
    https://github.com/banterfm/graphql-crunch
- ideally graphql would be served through a next.js api route
- batch graphql requests for the same data

## Issues

### SSR
- client (after loading) re-queries for data that was already done during ssr
    could use 'cache-first' to solve that, but being able to use all cache strategies with ssr would be +++
- getDataFromTree doesn't work for queries that start only after another query finishes
    - source code: https://github.com/mobxjs/mst-gql/blob/2808d6ea12f14f7fd2eab87ca2559f3519af82ce/src/react.tsx#L21-L31
    - apollo's getDataFromTree works in this regard: https://github.com/apollographql/react-apollo/blob/master/packages/ssr/src/getDataFromTree.ts
    - have work-around but requires access to private (?) `store.__promises` & depends on `react-test-renderer` package which is not meant for this

### Major
- replaces fresh data with stale data when using cached queries

### Minor
- makes exact same http OPTIONS request before making any new query
- useQuery hook option "fetchPolicy" does nothing https://github.com/mobxjs/mst-gql/blob/2808d6ea12f14f7fd2eab87ca2559f3519af82ce/src/react.tsx#L76-L116

### nice-to-have
- caches stuff forever (unless you go into store.__cachedQueries and clear/garbage-collect it yourself)
- can't optimistically update queries
- batch parallel graphql requests
