export interface Task {
  id: string
  title: string
  description: string
  duration: string
  isCompleted: boolean
  isInProgress: boolean
  isStandard: boolean
  history: {
    date: string
    spendTime: string
  } | null
}
