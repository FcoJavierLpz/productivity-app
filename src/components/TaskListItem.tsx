import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface TaskProps {
  isCompleted: boolean
  title: string
  description: string
  duration: string
  onClick: () => void
}

const TaskListItem = ({ description }: TaskProps) => {
  return (
    <>
      <FontAwesomeIcon icon="redo" />
      {description}
    </>
  )
}

export default TaskListItem
