import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import TaskEdit from './components/TaskEdit'
import NavBar from './components/NavBar'
import NotFound from './pages/NotFound'
import TaskList from './pages/TaskList'
import { Button } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faCheck,
  faPlay,
  faPause,
  faRedo,
  faPenSquare,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faPlay, faPause, faRedo, faPenSquare, faTrash)

function App() {
  const [showTaskEdit, setShowTaskEdit] = useState(false)

  return (
    <Router>
      <NavBar />
      <div className="container">
        <div className="d-flex justify-content-between">
          <h1 className="text-center">Task Management Board</h1>
          <Button variant="info" onClick={() => setShowTaskEdit(!showTaskEdit)}>
            {!showTaskEdit && 'New Task'}
            {showTaskEdit && '➖'}
          </Button>
        </div>
        {showTaskEdit && <TaskEdit />}
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
