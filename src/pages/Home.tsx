import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getTasks } from '../store/tasks'
const Home = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(state => state.entities.tasks.list)
  console.log('home', tasks)
  useEffect(() => {
    dispatch(getTasks())
  }, [])

  return (
    <div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.id}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
