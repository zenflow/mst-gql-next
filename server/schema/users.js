const {store} = require('../store')

module.exports = {
  typeDefs: `
    extend type Query {
      user(id: ID!): User
    }
    type User {
      id: ID,
      name: String,
      likes: [String]
    }
  `,
  resolvers: {
    Query: {
      user: (root, args) => {
        return store.users.find(user => user.id === args.id)
      },
    },
    User: {},
  },
}
