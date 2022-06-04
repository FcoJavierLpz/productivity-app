import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { collection, doc, addDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

import { Task } from '../interfaces/Task'
import { initialTask } from '../constants/tasks'

import { nanoid } from 'nanoid'

const collectionRef = 'tasks'

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
    },
    taskUpdated: (tasks, action) => {
      const index = tasks.list.findIndex(task => task.id === action.payload.id)
      tasks.list[index] = action.payload
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
  tasksReceived,
  tasksRequested,
  tasksRequestFailed,
  setShowTaskEdit,
  editTask,
  removeTaskToUpdate
} = slice.actions

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
    const tasks = querySnapshot.docs.map(document => {
      return {
        ...document.data(),
        docId: document.id
      }
    })
    dispatch({ type: tasksRequested.type })
    dispatch({ type: tasksReceived.type, payload: tasks })
  } catch (error) {
    dispatch({ type: tasksRequestFailed.type })
  }
}

export const updateTask = task => async dispatch => {
  try {
    console.log('update task', task)
    const taskRef = doc(db, collectionRef, task.docId)
    await updateDoc(taskRef, task)

    dispatch({ type: taskUpdated.type, payload: task })
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

export const getTaskById = taskId =>
  createSelector(selectTaskList, tasks =>
    tasks.find(task => task.id === taskId)
  )
