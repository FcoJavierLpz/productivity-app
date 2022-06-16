import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import CountDown from './CountDown'

interface TaskProps {
  id: string
  title: string
  description: string
  duration: string
  history
  isCompleted: boolean
  isInProgress: boolean
  onEditTask: () => void
  onDeleteTask: () => void
  onCountDown: (time: number[]) => void
}

const TaskListItem = ({
  title,
  duration,
  history,
  isInProgress,
  isCompleted,
  onEditTask,
  onDeleteTask,
  onCountDown
}: TaskProps) => {
  const [hours, minutes, seconds] = duration.split(':').map(Number)
  const [hourLeft, setHourLeft] = useState(0)
  const [minuteLeft, setMinuteLeft] = useState(0)
  const [secondLeft, setSecondLeft] = useState(0)

  const handleCountDown = (time: [number, number, number]) => {
    setHourLeft(time[0])
    setMinuteLeft(time[1])
    setSecondLeft(time[2])
  }
  useEffect(() => {
    return () => {
      if (isInProgress) {
        onCountDown([hourLeft, minuteLeft, secondLeft])
      }
    }
  }, [hourLeft, minuteLeft, secondLeft])

  return (
    <div className="task-list d-flex justify-content-between align-items-center">
      {isInProgress && (
        <CountDown
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          onCountDown={handleCountDown}
        />
      )}

      <div className="d-flex flex-column">
        <span>Time</span>
        <small>{duration}</small>
      </div>
      {history && (
        <div className="d-flex flex-column">
          <span>Spend</span>
          <small>{history?.spendTime}</small>
        </div>
      )}

      <div className="d-flex flex-column">
        <span>Title</span>
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
