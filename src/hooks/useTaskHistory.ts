import { useState } from 'react'
import { History } from '../interfaces/History'

const useTaskHistory = () => {
  const [taskHistory, setTaskHistory] = useState<History[]>([])

  const handleCountDown = (taskId, duration, timeLeft) => {
    setTaskHistory([{ id: taskId, duration, timeLeft }])
  }

  const calculateRemainingTime = (
    duration: string,
    [endHours, endMinutes, endSeconds]: number[]
  ): string => {
    let [startHours, startMinutes, startSeconds] = duration
      .split(':')
      .map(Number)
    let [countHours, countMinutes, countSeconds] = [0, 0, 0]

    if (startMinutes === 0) {
      startMinutes = 60
    }

    if (startSeconds === 0) {
      startSeconds = 60
    }

    if (startSeconds < endSeconds) {
      startSeconds += 60
      startMinutes--
    }

    if (startMinutes < endMinutes) {
      startMinutes += 60
      startHours--
    }

    countSeconds = startSeconds - endSeconds
    startMinutes === 60 && startHours--
    startSeconds === 60 && startMinutes--
    countMinutes = startMinutes - endMinutes
    countHours = startHours - endHours

    if (countSeconds === 60) {
      countSeconds = 0
      countMinutes++
    }

    if (countMinutes === 60) {
      countMinutes = 0
      countHours++
    }

    return `${countHours.toString().padStart(2, '0')}:${countMinutes
      .toString()
      .padStart(2, '0')}:${countSeconds.toString().padStart(2, '0')}`
  }

  const getTimeHistory = (taskId, history) => {
    const findTask = history.find(h => h.id === taskId)

    const spendTime =
      findTask && calculateRemainingTime(findTask.duration, findTask.timeLeft)

    return {
      spendTime,
      date: new Date().toLocaleString()
    }
  }

  return {
    taskHistory,
    handleCountDown,
    getTimeHistory
  }
}

export default useTaskHistory
