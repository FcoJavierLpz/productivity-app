import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface TaskProps {
  title: string
  description: string
  duration: string
  isCompleted: boolean
  isActive: boolean
  onClick: () => void
}

const TaskListItem = ({
  title,
  duration,
  isActive,
  isCompleted
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
      {!isActive && !isCompleted && <FontAwesomeIcon icon="pen-square" />}
      {!isActive && !isCompleted && <FontAwesomeIcon icon="trash" />}
    </div>
  )
}

export default TaskListItem
