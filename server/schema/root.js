const {store} = require('../store')

module.exports = {
  typeDefs: `
    type Query {
      _void: String
    }
    type Mutation {
      _void: String
    }
  `,
  resolvers: {
    Query: {},
    Mutation: {},
  },
}
