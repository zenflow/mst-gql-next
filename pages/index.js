import { useState } from 'react'
import { observer } from 'mobx-react'
import { useQuery } from '../src/models/reactUtils'

export default () => {
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

const AllTodosView = observer(() => {
  const {loading, error, data, query} = useQuery(store => store.queryTodos())
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
  const {loading, error, data, query} = useQuery(store => store.queryDoneTodos())
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
          <button onClick={todo.toggle}>
            toggle
          </button>
        </li>
      ))}
    </ul>
  )
})
