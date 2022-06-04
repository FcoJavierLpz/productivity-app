import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface TaskProps {
  id: string
  title: string
  description: string
  duration: string
  isCompleted: boolean
  isActive: boolean
  onEditTask: () => void
  onDeleteTask: () => void
}

const TaskListItem = ({
  title,
  duration,
  isActive,
  isCompleted,
  onEditTask,
  onDeleteTask
}: TaskProps) => {
  return (
    <div className="task-list d-flex justify-content-between align-items-center">
      {isActive && <FontAwesomeIcon icon="play" />}
      <div className="d-flex flex-column">
        <span>Time</span>
        <small>{duration}</small>
      </div>
      <div className="d-flex flex-column">
        <span>Spend</span>
        <small>{duration}</small>
      </div>
      <div className="d-flex flex-column">
        <span>Task</span>
        <small>{title}</small>
      </div>
      {isCompleted && <FontAwesomeIcon icon="check" />}
      {!isActive && !isCompleted && (
        <FontAwesomeIcon icon="pen-square" onClick={onEditTask} />
      )}
      {!isActive && !isCompleted && (
        <FontAwesomeIcon icon="trash" onClick={onDeleteTask} />
      )}
    </div>
  )
}

export default TaskListItem
