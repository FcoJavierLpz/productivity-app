import React from 'react'

interface TaskProps {
  isCompleted: boolean
  title: string
  description: string
  duration: string
  onClick: () => void
}

const TaskListItem = ({ description }: TaskProps) => {
  return <li>{description}</li>
}

export default TaskListItem
