import { useAppDispatch, useAppSelector } from '../hooks'
import TaskEdit from './TaskEdit'
import { Button } from 'react-bootstrap'
import { setShowTaskEdit } from '../store/tasks'

const TaskEditWrapper = () => {
  const dispatch = useAppDispatch()

  const showTaskEdit = useAppSelector(
    state => state.entities.tasks.showTaskEdit
  )

  return (
    <>
      <div className="d-flex justify-content-end pb-2">
        <Button
          variant="info"
          onClick={() => dispatch(setShowTaskEdit(showTaskEdit))}
        >
          {!showTaskEdit && 'New Task'}
          {showTaskEdit && '➖'}
        </Button>
      </div>
      {showTaskEdit && <TaskEdit />}
    </>
  )
}

export default TaskEditWrapper
