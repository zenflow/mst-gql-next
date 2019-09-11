import { useState } from 'react'
import { observer } from 'mobx-react'
import { useQuery } from '../models/reactUtils'
import { selectFromTodo, selectFromUser } from '../models'

export default function Index () {
  const [showDoneTodos, setShowDoneTodos] = useState(false)
  return (
    <>
      <div>
        <h3>All Todos</h3>
        <AllTodosView/>
      </div>
      <div>
        <h3>Done Todos</h3>
        <button onClick={() => setShowDoneTodos(!showDoneTodos)}>
          {showDoneTodos ? 'Hide' : 'Show'}
        </button>
        {showDoneTodos && <DoneTodosView/>}
      </div>
    </>
  )
}

const todoFragment = selectFromTodo()
  .text
  .done
  .assignee(user => user.name)

const AllTodosView = observer(() => {
  const {error, data, loading, query} = useQuery(store => {
    return store.queryTodos({}, todoFragment)
  })
  if (error) return error.message
  if (!data) return 'Loading...'
  return (
    <>
      <TodosList todos={data.todos}/>
      {loading ? 'Loading...' : <button onClick={query.refetch}>Refetch</button>}
    </>
  )
})

const DoneTodosView = observer(() => {
  const {error, data, loading, query} = useQuery(store => {
    return store.queryDoneTodos({}, todoFragment)
  })
  if (error) return error.message
  if (!data) return 'Loading...'
  return (
    <>
      <TodosList todos={data.doneTodos}/>
      {loading ? 'Loading...' : <button onClick={query.refetch}>Refetch</button>}
    </>
  )
})

const TodosList = observer(({todos}) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span style={{textDecoration: todo.done ? 'line-through' : 'none'}}>
            {todo.text}
          </span>
          &emsp;
          Assignee: <UserView user={todo.assignee}/>
          &emsp;
          <button onClick={todo.toggle}>
            toggle
          </button>
        </li>
      ))}
    </ul>
  )
})

const userFragment = selectFromUser()
  .name
  .likes

const UserView = observer(({user}) => {
  const {error, data, loading, query} = useQuery(store => {
    return user && store.queryUser({id: user.id}, userFragment)
  })
  if (error) return error.message
  return `${user.id}  (${user.name}, likes ${data ? data.user.likes.join() : '?'})`
})
