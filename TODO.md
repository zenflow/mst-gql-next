# TODO

## integration
- avoid server making requests to itself!
- subscriptions over websockets

## mst-gql
- hasLoaded should accept a query selector
- `ensureLoaded(selector): Promise`
- useModel hook, e.g. `const {loading, error} = useModel(user, user => user.name.likes))``
- expose setDefaultFetchPolicy?
- getDataFromTree currently rejects if a query rejects. should it? should we simply be more explicit about how they're handled?
- optimistically update queries
- cache garbage collection
- useQuery hook option "fetchPolicy" does nothing https://github.com/mobxjs/mst-gql/blob/2808d6ea12f14f7fd2eab87ca2559f3519af82ce/src/react.tsx#L76-L116
