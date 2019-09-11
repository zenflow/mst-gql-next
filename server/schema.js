const store = {
  todos: [
    {
      id: '0',
      text: 'Go to the shops',
      done: false,
      assignee: 'rsanchez'
    },
    {
      id: '1',
      text: 'Pick up the kids',
      done: true,
      assignee: 'msmith'
    },
    {
      id: '2',
      text: 'Install mst-gql',
      done: false,
      assignee: 'msmith'
    }
  ],
  users: [
    {
      id: 'rsanchez',
      name: 'Rick Sanchez',
      likes: ['sex', 'technology', 'Kalaxian Crystals']
    },
    {
      id: 'msmith',
      name: 'Morty Smith',
      likes: ['being a pussy', 'whatever']
    }
  ]
}

const typeDefs = `
  type Query {
    todos: [Todo],
    doneTodos: [Todo],
    user(id: ID!): User
  }
  type Mutation {
    toggleTodo(id: ID!): Todo
  }
  type Todo {
    id: ID,
    text: String,
    done: Boolean,
    assignee: User
  }
  type User {
    id: ID,
    name: String,
    likes: [String]
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
    user: (root, args) => {
      return store.users.find(user => user.id === args.id)
    }
  },
  Mutation: {
    toggleTodo: (root, args) => {
      const todo = store.todos.find(todo => todo.id === args.id)
      todo.done = !todo.done
      return todo
    }
  },
  Todo: {
    assignee: (todo) => {
      return store.users.find(user => user.id === todo.assignee)
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
