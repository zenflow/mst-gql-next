const {store} = require('../store')

module.exports = {
  typeDefs: `
    extend type Query {
      todos: [Todo],
      doneTodos: [Todo],
    }
    extend type Mutation {
      toggleTodo(id: ID!): Todo
    }
    type Todo {
      id: ID,
      text: String,
      done: Boolean,
      assignee: User
    }
  `,
  resolvers: {
    Query: {
      todos: () => {
        return store.todos
      },
      doneTodos: () => {
        return store.todos.filter(todo => todo.done)
      },
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
  },
}
