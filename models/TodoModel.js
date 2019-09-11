import { TodoModelBase } from './TodoModel.base'

export { selectFromTodo, todoModelPrimitives, TodoModelSelector } from './TodoModel.base'

export const TodoModel = TodoModelBase
  .actions(self => ({
    toggle () {
      return self.store.mutateToggleTodo(
        {id: self.id},
        todo => todo.done,
        () => { self.done = !self.done }
      )
    }
  }))
