export interface Task {
  id: string
  isCompleted: boolean
  title: string
  description: string
  duration: string
  onClick: () => void
}
