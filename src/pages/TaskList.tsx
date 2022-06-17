import TaskListItem from '../components/TaskListItem'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useTaskHistory from '../hooks/useTaskHistory'
import useTaskList from '../hooks/useTaskList'
import { editTask, deleteTask } from '../store/tasks'
import { useAppDispatch } from '../hooks'

const TaskList = () => {
  const dispatch = useAppDispatch()
  const { taskHistory, handleCountDown, getTimeHistory } = useTaskHistory()
  const { columns, onDragEnd } = useTaskList()

  return (
    <div>
      <div className="d-flex justify-content-md-center">
        <DragDropContext
          onDragEnd={result => onDragEnd(result, taskHistory, getTimeHistory)}
        >
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
                                  onCountDown={timeLeft =>
                                    handleCountDown(
                                      item.id,
                                      item.duration,
                                      timeLeft
                                    )
                                  }
                                />
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <div className="d-flex flex-column mt-3 align-items-center">
                          <span className="m-0">No tasks to show</span>
                          <span>drag and drop to add tasks</span>
                        </div>
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
