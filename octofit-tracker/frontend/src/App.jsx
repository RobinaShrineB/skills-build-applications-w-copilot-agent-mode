import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-mark">O</div>
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1>Move together.</h1>
        </div>
      </header>

      <nav className="app-nav" aria-label="Primary navigation">
        <NavLink to="/" end>Overview</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview-page">
      <div className="overview-intro">
        <p className="eyebrow">TEAM WELLNESS, IN ONE PLACE</p>
        <h2>Small steps become a shared rhythm.</h2>
        <p>Track the work, celebrate the wins, and keep your team moving forward.</p>
      </div>
      <div className="overview-grid">
        <NavLink className="overview-card overview-card-primary" to="/activities">
          <span className="card-kicker">01 / DAILY LOG</span>
          <strong>See every activity</strong>
          <span>Run, lift, stretch, repeat.</span>
        </NavLink>
        <NavLink className="overview-card" to="/leaderboard">
          <span className="card-kicker">02 / MOMENTUM</span>
          <strong>Check the leaderboard</strong>
          <span>Find your next friendly challenge.</span>
        </NavLink>
        <NavLink className="overview-card" to="/workouts">
          <span className="card-kicker">03 / NEXT UP</span>
          <strong>Choose a workout</strong>
          <span>Make the next session count.</span>
        </NavLink>
      </div>
    </section>
  )
}

export default App
