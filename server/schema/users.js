const {store} = require('../store')

module.exports = {
  typeDefs: `
    extend type Query {
      user(id: ID!): User
      users: [User]!
    }
    type User {
      id: ID!,
      name: String!
      likes: [String]!
      unobservedProp: String
    }
  `,
  resolvers: {
    Query: {
      user: (root, args) => {
        return store.users.find(user => user.id === args.id)
      },
      users: () => {
        return store.users
      },
    },
    User: {
      unobservedProp: (user) => {
        return 'foo'
      }
    },
  },
}
