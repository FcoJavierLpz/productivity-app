import { createSlice } from '@reduxjs/toolkit'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

// import { nanoid } from 'nanoid'

const collectionRef = 'tasks'

const slice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    loading: false
  },
  reducers: {
    tasksRequested: tasks => {
      tasks.loading = true
    },

    tasksReceived: (tasks, action) => {
      console.log('action', action.payload)
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
    const response = await addDoc(collection(db, collectionRef), {
      ...task
    })
    console.log(response)
    // dispatch({ type: tasksReceived.type, payload: response }) // response.data
  } catch (error) {
    console.log('error', error)
    dispatch({ type: tasksRequestFailed.type })
  }
}

export const getTasks = async dispatch => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionRef))
    console.log('getTasks', querySnapshot)
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
