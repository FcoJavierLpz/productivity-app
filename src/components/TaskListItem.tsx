import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CountDown from './CountDown'

interface TaskProps {
  id: string
  title: string
  description: string
  duration: string
  isCompleted: boolean
  isInProgress: boolean
  onEditTask: () => void
  onDeleteTask: () => void
}

const TaskListItem = ({
  title,
  duration,
  isInProgress,
  isCompleted,
  onEditTask,
  onDeleteTask
}: TaskProps) => {
  const [hours, minutes, seconds] = duration.split(':').map(Number)

  return (
    <div className="task-list d-flex justify-content-between align-items-center">
      {isInProgress && (
        <CountDown hours={hours} minutes={minutes} seconds={seconds} />
      )}
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
      {!isInProgress && !isCompleted && (
        <FontAwesomeIcon icon="pen-square" onClick={onEditTask} />
      )}
      {!isInProgress && !isCompleted && (
        <FontAwesomeIcon icon="trash" onClick={onDeleteTask} />
      )}
    </div>
  )
}

export default TaskListItem
