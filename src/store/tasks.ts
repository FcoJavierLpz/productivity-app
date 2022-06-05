import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../config/firebase'

import { Task } from '../interfaces/Task'
import { initialTask } from '../constants/tasks'

const collectionRef = 'tasks'
const inProgress = 'inProgress'
const done = 'done'

const initialState: {
  list: Task[]
  taskToUpdate: Task
  showTaskEdit: boolean
  loading: boolean
} = {
  list: [],
  taskToUpdate: initialTask,
  showTaskEdit: false,
  loading: false
}

const slice = createSlice({
  name: collectionRef,
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
    },
    taskUpdated: (tasks, action) => {
      const task = tasks.list.find(tsk => tsk.id === action.payload.id)
      const index = tasks.list.findIndex(tsk => tsk.id === action.payload.id)
      tasks.list[index] = { ...task, ...action.payload }
    },
    taskDeleted: (tasks, action) => {
      const index = tasks.list.findIndex(task => task.id === action.payload)
      tasks.list.splice(index, 1)
    },
    setShowTaskEdit: (tasks, action) => {
      tasks.showTaskEdit = !action.payload
    },
    editTask: (tasks, action) => {
      tasks.taskToUpdate = action.payload
      tasks.showTaskEdit = true
    },
    removeTaskToUpdate: (tasks, action) => {
      tasks.taskToUpdate = action.payload
    }
  }
})

export const {
  taskAdded,
  taskUpdated,
  taskDeleted,
  tasksReceived,
  tasksRequested,
  tasksRequestFailed,
  setShowTaskEdit,
  editTask,
  removeTaskToUpdate
} = slice.actions

export default slice.reducer

export const getTasks = () => async dispatch => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionRef))
    const tasks = querySnapshot.docs.map(document => {
      return {
        ...document.data(),
        id: document.id
      }
    })
    dispatch({ type: tasksRequested.type })
    dispatch({ type: tasksReceived.type, payload: tasks })
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}

export const addTask = task => async dispatch => {
  try {
    const newTask = {
      ...task
    }

    const response = await addDoc(collection(db, collectionRef), newTask)

    dispatch({
      type: taskAdded.type,
      payload: { ...newTask, id: response.id }
    })
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}

export const updateTask = task => async dispatch => {
  try {
    const taskRef = doc(db, collectionRef, task.id)
    await updateDoc(taskRef, task)

    dispatch({ type: taskUpdated.type, payload: task })
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}

export const deleteTask = id => async dispatch => {
  try {
    const taskRef = doc(db, collectionRef, id)
    await deleteDoc(taskRef)

    dispatch({ type: taskDeleted.type, payload: id })
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}

export const checkTask = (id, toContainer) => async dispatch => {
  try {
    const isInProgress = toContainer === inProgress
    const isCompleted = toContainer === done

    dispatch({
      type: taskUpdated.type,
      payload: { id, isInProgress, isCompleted }
    })

    const taskRef = doc(db, collectionRef, id)
    await updateDoc(taskRef, { isInProgress, isCompleted })
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}

const selectTaskList = state => state.entities.tasks.list

export const getTodoTasks = createSelector(selectTaskList, tasks =>
  tasks.filter(task => !task.isInProgress && !task.isCompleted)
)

export const getInProgressTasks = createSelector(selectTaskList, tasks =>
  tasks.filter(task => task.isInProgress)
)

export const getCompletedTasks = createSelector(selectTaskList, tasks =>
  tasks.filter(task => task.isCompleted)
)

export const getTaskById = taskId =>
  createSelector(selectTaskList, tasks =>
    tasks.find(task => task.id === taskId)
  )
