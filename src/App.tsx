import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'
import TaskEditWrapper from './components/TaskEditWrapper'
import NotFound from './pages/NotFound'
import TaskList from './pages/TaskList'
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

const App = () => (
  <Router>
    <NavBar />
    <div className="container mt-3">
      <TaskEditWrapper />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </Router>
)

export default App
