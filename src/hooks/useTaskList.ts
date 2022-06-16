import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  getTasks,
  getInProgressTasks,
  getTodoTasks,
  getCompletedTasks,
  checkTask
} from '../store/tasks'

const useTaskList = getTimeHistory => {
  const inProgressTasks = useAppSelector(getInProgressTasks)
  const todoTasks = useAppSelector(getTodoTasks)
  const completeTasks = useAppSelector(getCompletedTasks)

  const dispatch = useAppDispatch()

  const onDragEnd = (result, history) => {
    const { destination, source, draggableId } = result

    if (!result.destination) return

    const sourceColumn = source.droppableId
    const destColumn = destination.droppableId

    if (sourceColumn === 'inProgress' && destColumn === 'done') {
      const timeHistory = getTimeHistory(draggableId, history)
      return dispatch(checkTask(draggableId, timeHistory, destColumn))
    }

    dispatch(checkTask(draggableId, null, destColumn))
  }

  const taskStatus = {
    toDo: {
      name: 'To Do',
      items: todoTasks
    },
    inProgress: {
      name: 'In Progress',
      items: inProgressTasks
    },
    done: {
      name: 'Done',
      items: completeTasks
    }
  }

  const [columns, setColumns] = useState(taskStatus)

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  useEffect(() => {
    setColumns(taskStatus)
  }, [inProgressTasks, todoTasks, completeTasks])

  return { columns, onDragEnd }
}

export default useTaskList
