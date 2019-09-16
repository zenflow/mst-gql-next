const {GraphQLExtension} = require('apollo-server-express')
const {deflate} = require('graphql-deduplicator')

class ApolloDedupeExtension extends GraphQLExtension {
  willSendResponse (params) {
    if (
      params.context.req.headers['x-graphql-deduplicate']
      && params.graphqlResponse.data
      && !params.graphqlResponse.data.__schema
    ) {
      return {
        ...params,
        graphqlResponse: {
          ...params.graphqlResponse,
          data: deflate(params.graphqlResponse.data)
        }
      }
    }
    return params
  }
}

module.exports = {ApolloDedupeExtension}
