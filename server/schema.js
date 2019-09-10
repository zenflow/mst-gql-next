const store = {
  todos: [
    {
      id: 0,
      text: 'Go to the shops',
      done: false,
      user_id: 'rsanchez'
    },
    {
      id: 1,
      text: 'Pick up the kids',
      done: true,
      user_id: 'msmith'
    },
    {
      id: 2,
      text: 'Install mst-gql',
      done: false,
      user_id: 'msmith'
    }
  ],
  users: [
    {
      id: 'rsanchez',
      name: 'Rick Sanchez',
    },
    {
      id: 'msmith',
      name: 'Morty Smith',
    }
  ]
}

const typeDefs = `
  type Query {
    todos: [Todo],
    doneTodos: [Todo],
    users: [User]
  }
  type Mutation {
    toggleTodo(id: ID!): Todo
  }
  type Todo {
    id: ID,
    text: String,
    done: Boolean,
    user: User
  }
  type User {
    id: ID,
    name: String
  }
`

const resolvers = {
  Query: {
    todos: (/*root, args, context*/) => {
      return store.todos
    },
    doneTodos: () => {
      return store.todos.filter(todo => todo.done)
    },
    users: () => {
      return store.users
    }
  },
  Mutation: {
    toggleTodo: (root, args) => {
      const todo = store.todos[args.id]
      todo.done = !todo.done
      return todo
    }
  },
  Todo: {
    user: (root) => {
      return store.users.find(user => user.id === root.user_id)
    }
  },
}

module.exports = {
  typeDefs,
  resolvers,
  context: (headers, secrets) => {
    return {
      headers,
      secrets
    }
  }
}
