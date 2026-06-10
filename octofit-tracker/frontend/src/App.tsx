import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME
const codespaceName = rawCodespaceName?.trim() ?? ''
const isCodespace = codespaceName !== '' && codespaceName !== 'undefined'
const apiBaseUrl = isCodespace
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-3">
          <div>
            <h1 className="h3">Octofit Tracker</h1>
            <p className="text-muted mb-0">
              React 19 frontend with Vite routing and backend API support.
            </p>
          </div>
          <div>
            <small className="text-secondary">
              API endpoint base: <code>{apiBaseUrl}</code>
            </small>
          </div>
        </div>
      </header>

      {!isCodespace ? (
        <div className="alert alert-warning">
          <strong>Warning:</strong> <code>VITE_CODESPACE_NAME</code> is not defined.
          The app is using a local fallback endpoint at <code>http://localhost:8000/api</code>.
        </div>
      ) : null}

      <nav className="mb-4">
        <ul className="nav nav-pills flex-wrap gap-2">
          <li className="nav-item">
            <Link className="nav-link" to="/activities">
              Activities
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/leaderboard">
              Leaderboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/teams">
              Teams
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/workouts">
              Workouts
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Navigate replace to="/activities" />}
        />
        <Route
          path="/activities"
          element={<Activities apiBaseUrl={apiBaseUrl} />}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard apiBaseUrl={apiBaseUrl} />}
        />
        <Route
          path="/teams"
          element={<Teams apiBaseUrl={apiBaseUrl} />}
        />
        <Route
          path="/users"
          element={<Users apiBaseUrl={apiBaseUrl} />}
        />
        <Route
          path="/workouts"
          element={<Workouts apiBaseUrl={apiBaseUrl} />}
        />
        <Route
          path="*"
          element={<p className="text-danger">Page not found.</p>}
        />
      </Routes>
    </div>
  )
}

export default App
