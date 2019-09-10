# TODO

- fetching same data over multiple times when selecting data from nested elements
    https://medium.com/@gajus/reducing-graphql-response-size-by-a-lot-ff5ba9dcb60
    https://github.com/gajus/graphql-deduplicator
    https://github.com/banterfm/graphql-crunch
- ideally graphql would be served through a next.js api route

## Issues

- client (after loading) re-queries for data that was already done during ssr
    could use 'cache-first' to solve that, but would create another obvious problem
- caches stuff forever (unless you go into store.__cachedQueries and clear/garbage-collect it yourself)
- can't optimistically update queries
