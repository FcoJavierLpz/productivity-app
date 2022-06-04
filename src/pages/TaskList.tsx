import { useEffect, useState } from 'react'

import TaskListItem from '../components/TaskListItem'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  getTasks,
  getActiveTasks,
  getDesactiveTasks,
  getCompletedTasks,
  editTask,
  deleteTask
} from '../store/tasks'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }
}
const TaskList = () => {
  const activeTasks = useAppSelector(getActiveTasks)
  const desactiveTasks = useAppSelector(getDesactiveTasks)
  const completeTasks = useAppSelector(getCompletedTasks)

  const dispatch = useAppDispatch()

  const taskStatus = {
    toDo: {
      name: 'To do',
      items: desactiveTasks
    },
    inProgress: {
      name: 'In Progress',
      items: activeTasks
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
  }, [activeTasks, desactiveTasks, completeTasks])

  return (
    <div>
      <div className="d-flex justify-content-md-center">
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
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
                              {(pvd, spshot) => {
                                return (
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
                                      onEditTask={() =>
                                        dispatch(editTask(item))
                                      }
                                      onDeleteTask={() =>
                                        dispatch(deleteTask(item.id))
                                      }
                                    />
                                  </div>
                                )
                              }}
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
            )
          })}
        </DragDropContext>
      </div>
    </div>
  )
}

export default TaskList
