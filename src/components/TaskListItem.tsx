import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface TaskProps {
  isCompleted: boolean
  title: string
  description: string
  duration: string
  onClick: () => void
}

const TaskListItem = ({ title, description, duration }: TaskProps) => {
  return (
    <div className="task-list d-flex justify-content-between align-items-center">
      <FontAwesomeIcon icon="play" />
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
      <FontAwesomeIcon icon="pen-square" />
      <FontAwesomeIcon icon="trash" />
    </div>
  )
}

export default TaskListItem
