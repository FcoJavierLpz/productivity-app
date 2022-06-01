import { useEffect } from 'react'

import TaskListItem from '../components/TaskListItem'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getTasks } from '../store/tasks'

const TaskList = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(state => state.entities.tasks.list)

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  return (
    <div>
      <ul>
        {tasks.map(task => (
          <TaskListItem
            key={task.id}
            {...task}
            onClick={() => console.log('onClick TaskListItem')}
          />
        ))}
      </ul>
    </div>
  )
}

export default TaskList
