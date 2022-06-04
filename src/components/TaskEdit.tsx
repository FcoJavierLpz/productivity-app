import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Task } from '../interfaces/Task'
import { addTask, updateTask, removeTaskToUpdate } from '../store/tasks'
import { useAppDispatch, useAppSelector } from '../hooks'

const AddTask = () => {
  const dispatch = useAppDispatch()
  const taskToUpdate = useAppSelector(
    state => state.entities.tasks.taskToUpdate
  )

  const taskInitialState = taskToUpdate ?? {
    id: '',
    title: '',
    description: '',
    duration: '02:00:00',
    isCompleted: false,
    isActive: false,
    isStandard: true
  }

  const [task, setTask] = useState<Task>(taskInitialState)
  const resetState = () => setTask(taskInitialState)

  useEffect(() => {
    setTask(taskInitialState)
  }, [taskInitialState])

  useEffect(() => {
    return () => {
      dispatch(removeTaskToUpdate(null))
    }
  }, [])

  const changeDuration = ({ target: { value } }) => {
    let [hours, minutes, seconds] = value.split(':')

    if (!value) {
      hours = '00'
      minutes = '00'
      seconds = '00'
    }

    if (Number(hours) >= 2) {
      hours = '02'
      minutes = '00'
      seconds = '00'
    }

    setTask({ ...task, duration: `${hours}:${minutes}:${seconds}` })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!task.id && task.title) {
      dispatch(addTask(task))
      resetState()
      return
    }

    dispatch(updateTask(task))
  }
  return (
    <div className="card">
      <h3>Add Task</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            name="title"
            required
            placeholder="Title"
            value={task.title}
            onChange={({ target: { value } }) =>
              setTask({ ...task, title: value })
            }
          />
        </Form.Group>

        <Form.Group controlId="desrciption">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="description"
            required
            placeholder="description"
            value={task.description}
            onChange={({ target: { value } }) =>
              setTask({ ...task, description: value })
            }
          />
        </Form.Group>

        <Form.Group controlId="duration">
          <Form.Label className="d-flex justify-content-between">
            Duración - Máx: 2 hrs
            <div>
              <Form.Check
                inline
                name="typeDuration"
                onChange={() => setTask({ ...task, isStandard: true })}
                label="Standard"
                type="radio"
                id="standard"
                checked={task.isStandard}
              />
              <Form.Check
                inline
                name="typeDuration"
                onChange={() => setTask({ ...task, isStandard: false })}
                label="Custom"
                type="radio"
                id="custom"
                checked={!task.isStandard}
              />
            </div>
          </Form.Label>
          {task.isStandard ? (
            <Form.Control name="duration" onChange={changeDuration} as="select">
              <option value="00:30:00">Corta: 30 minutos</option>
              <option value="00:45:00">Media: 45 minutos</option>
              <option value="01:00:00">Larga: 60 minutos</option>
            </Form.Control>
          ) : (
            <Form.Control
              className="text-center without_ampm"
              name="duration"
              onChange={changeDuration}
              value={task.duration}
              type="time"
              step="1"
            />
          )}
        </Form.Group>

        <div className="mt-3 text-right">
          <Button variant="success" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AddTask
