const store = {
  todos: [
    {
      id: '0',
      text: 'Go to the shops',
      done: true
    },
    {
      id: '1',
      text: 'Pick up the kids',
      done: true
    },
    {
      id: '2',
      text: 'Install mst-gql',
      done: true
    }
  ]
}

const typeDefs = `
  type Query {
    todos: [Todo],
    doneTodos: [Todo]
  }
  type Mutation {
    toggleTodo(id: ID!): Todo
  }
  type Todo {
    id: ID,
    text: String,
    done: Boolean
  }
`

const resolvers = {
  Query: {
    todos: () => {
      return store.todos
    },
    doneTodos: () => {
      return store.todos.filter(todo => todo.done)
    }
  },
  Mutation: {
    toggleTodo: (root, args) => {
      const todo = store.todos.find(todo => todo.id === args.id)
      todo.done = !todo.done
      return todo
    }
  }
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
