import { useState } from 'react'
import { observer } from 'mobx-react'
import { useQuery } from "../models"

export default function Index () {
  const [showDoneTodos, setShowDoneTodos] = useState(false)
  return (
    <>
      <h3>All Todos</h3>
      <AllTodosView/>
      <hr/>
      <h3>Done Todos</h3>
      <button onClick={() => setShowDoneTodos(!showDoneTodos)}>
        {showDoneTodos ? "Hide" : "Show"}
      </button>
      {showDoneTodos && <DoneTodosView/>}
    </>
  )
}

const todoSelector = todo => todo
  .text
  .done
  .assignee(user => user.name)

const AllTodosView = observer(() => {
  const {error, data, loading, query} = useQuery(store => {
    return store.queryTodos({}, todoSelector)
  })
  if (error) return error.message
  if (!data) return "Loading..."
  return (
    <>
      {data && data.todos && <TodosList todos={data.todos}/>}
      {loading ? "Loading..." : <button onClick={query.refetch}>Refetch</button>}
    </>
  )
})

const DoneTodosView = observer(() => {
  const {error, data, loading, query} = useQuery(store => {
    return store.queryDoneTodos({}, todoSelector)
  })
  if (error) return error.message
  if (!data) return "Loading..."
  return (
    <>
      {data && data.doneTodos && <TodosList todos={data.doneTodos}/>}
      {loading ? "Loading..." : <button onClick={query.refetch}>Refetch</button>}
    </>
  )
})

const TodosList = observer(({todos}) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span style={{textDecoration: todo.done ? "line-through" : "none"}}>
            {todo.text}
          </span>
          &emsp;
          <button onClick={todo.toggle}>
            toggle
          </button>
          &emsp;
          Assignee: <UserView user={todo.assignee}/>
        </li>
      ))}
    </ul>
  )
})

const UserView = observer(({user}) => {
  const {error, data} = useQuery(store => {
    return user && store.queryUser({id: user.id}, user => user.name.likes)
  })
  if (error) return error.message
  return (
    <>
      <strong>{user.name}</strong>
      {data && (<em>
        {` (likes: ${data ? data.user.likes.join(" + ") : "?"})`}
      </em>)}
    </>
  )
})
