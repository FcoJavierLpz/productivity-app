import { useEffect, useState } from 'react'

import TaskListItem from '../components/TaskListItem'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  getTasks,
  getInProgressTasks,
  getTodoTasks,
  getCompletedTasks,
  editTask,
  deleteTask,
  checkTask
} from '../store/tasks'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const TaskList = () => {
  const inProgressTasks = useAppSelector(getInProgressTasks)
  const todoTasks = useAppSelector(getTodoTasks)
  const completeTasks = useAppSelector(getCompletedTasks)

  const dispatch = useAppDispatch()

  const onDragEnd = result => {
    const { destination, draggableId } = result

    if (!result.destination) return

    dispatch(checkTask(draggableId, destination.droppableId))
  }

  const taskStatus = {
    toDo: {
      name: 'To do',
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

  return (
    <div>
      <div className="d-flex justify-content-md-center">
        <DragDropContext onDragEnd={result => onDragEnd(result)}>
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              className="d-flex flex-column align-items-center"
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? 'lightblue'
                          : 'lightgrey',
                        padding: 4,
                        width: 375,
                        minHeight: 500
                      }}
                    >
                      {column.items && column.items.length ? (
                        column.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(pvd, spshot) => (
                              <div
                                ref={pvd.innerRef}
                                {...pvd.draggableProps}
                                {...pvd.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  padding: 16,
                                  margin: '0 0 8px 0',
                                  minHeight: '50px',
                                  backgroundColor: spshot.isDragging
                                    ? '#263B4A'
                                    : '#456C86',
                                  color: 'white',
                                  ...pvd.draggableProps.style
                                }}
                              >
                                <TaskListItem
                                  {...item}
                                  onEditTask={() => dispatch(editTask(item))}
                                  onDeleteTask={() =>
                                    dispatch(deleteTask(item.id))
                                  }
                                />
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <div>Vacio</div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}

export default TaskList
