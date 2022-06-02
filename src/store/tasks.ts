import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

import { Task } from '../interfaces/Task'

import { nanoid } from 'nanoid'

const collectionRef = 'tasks'

const initialState: {
  list: Task[]
  loading: boolean
} = {
  list: [],
  loading: false
}
const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    tasksRequested: tasks => {
      tasks.loading = true
    },

    tasksReceived: (tasks, action) => {
      tasks.list = action.payload
      tasks.loading = false
    },

    tasksRequestFailed: tasks => {
      tasks.loading = false
    },
    taskAdded: (tasks, action) => {
      tasks.list.push(action.payload)
    }
  }
})

export const { taskAdded, tasksReceived, tasksRequested, tasksRequestFailed } =
  slice.actions

export default slice.reducer

export const addTask = task => async dispatch => {
  try {
    const newTask = {
      ...task,
      id: nanoid()
    }

    await addDoc(collection(db, collectionRef), newTask)

    dispatch({ type: taskAdded.type, payload: newTask })
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}

export const getTasks = () => async dispatch => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionRef))
    const tasks = querySnapshot.docs.map(doc => doc.data())
    dispatch({ type: tasksRequested.type })
    dispatch({ type: tasksReceived.type, payload: tasks })
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}

export const getTask = taskId => async dispatch => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionRef, taskId))
    console.log('getTasks', querySnapshot)
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}

export const updateTask = taskId => async dispatch => {
  try {
    console.log('update task', taskId)
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}

export const deleteTask = taskId => async dispatch => {
  try {
    console.log('taskId Remove', taskId)
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}
const selectTaskList = state => state.entities.tasks.list

export const getDesactiveTasks = createSelector(selectTaskList, tasks =>
  tasks.filter(task => !task.isActive && !task.isCompleted)
)

export const getActiveTasks = createSelector(selectTaskList, tasks =>
  tasks.filter(task => task.isActive)
)

export const getCompletedTasks = createSelector(selectTaskList, tasks =>
  tasks.filter(task => task.isCompleted)
)
