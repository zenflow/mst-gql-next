# TODO

## integration
- avoid server making requests to itself!
- subscriptions over websockets

## mst-gql
- https://github.com/mobxjs/mst-gql/issues/91
- client (after loading) re-queries for data that was already done during ssr
    - point # 2 @ https://www.apollographql.com/docs/react/features/server-side-rendering/#server-initialization
    - solution: override fetchPolicy to 'cache-first' when on server or first app render on client
- getDataFromTree doesn't work for queries that start only after another query finishes
    - source code: https://github.com/mobxjs/mst-gql/blob/2808d6ea12f14f7fd2eab87ca2559f3519af82ce/src/react.tsx#L21-L31
    - apollo's getDataFromTree works in this regard: https://github.com/apollographql/react-apollo/blob/master/packages/ssr/src/getDataFromTree.ts
    - have work-around but requires access to private (?) `store.__promises` & depends on `react-test-renderer` package which is not meant for this
    - solution: once re-querying issue (above) is fixed, and rerendering doesn't mean repeating network queries
        while(true){
          const html = renderFunction(tree)
          if (client.__promises.size === 0 {
            return html
          }
          await Promise.all(client.__promises)
        }
- deduplicate identical queries made in same tick
    - https://github.com/mobxjs/mst-gql/issues/4 (batching network requests)
- optimistically update queries
- cache garbage collection
- useQuery hook option "fetchPolicy" does nothing https://github.com/mobxjs/mst-gql/blob/2808d6ea12f14f7fd2eab87ca2559f3519af82ce/src/react.tsx#L76-L116
