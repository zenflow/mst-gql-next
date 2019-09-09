const store = {
  todos: [
    {
      id: 0,
      text: "Go to the shops",
      done: false
    },
    {
      id: 1,
      text: "Pick up the kids",
      done: true
    },
    {
      id: 2,
      text: "Install mst-gql",
      done: false
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
    done: Boolean,
  }
`

const resolvers = {
  Query: {
    todos: (root, args, context) => {
      return store.todos
    },
    doneTodos: (root, args, context) => {
      return store.todos.filter(todo => todo.done)
    }
  },
  Mutation: {
    toggleTodo: (root, args, context) => {
      const todo = store.todos[args.id]
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
