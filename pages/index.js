import { useState } from 'react'
import { observer } from 'mobx-react'
import { useQuery } from '../models/reactUtils'
import { selectFromTodo } from '../models'

export default function Index () {
  const [showDoneTodos, setShowDoneTodos] = useState(false)
  return (
    <>
      <h3>All Todos</h3>
      <AllTodosView/>
      <hr/>
      <h3>Done Todos</h3>
      <button onClick={() => setShowDoneTodos(!showDoneTodos)}>
        {showDoneTodos ? 'Hide' : 'Show'}
      </button>
      {showDoneTodos && <DoneTodosView/>}
    </>
  )
}

const AllTodosView = observer(() => {
  const {error, data, loading, query} = useQuery(store => store.queryTodos())
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
  const {error, data, loading, query} = useQuery(store => store.queryDoneTodos())
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
          <button onClick={todo.toggle}>
            toggle
          </button>
        </li>
      ))}
    </ul>
  )
})
