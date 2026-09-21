import { useApiCollection } from '../api.js'
import { CollectionPage, DataStatus } from './Activities.jsx'

function Workouts() {
  const { data, loading, error } = useApiCollection('workouts')
  return <CollectionPage eyebrow="WORKOUT LIBRARY" title="Make a plan, then move." description="A small menu of sessions for whatever energy you bring today."><DataStatus loading={loading} error={error} empty={!data.length} label="workouts" />{!loading && !error && data.length > 0 && <div className="card-grid">{data.map((workout, index) => <article className="info-card workout-card" key={workout._id || index}><p className="card-kicker">SESSION {String(index + 1).padStart(2, '0')}</p><h3>{workout.title || workout.name || 'Workout'}</h3><p>{workout.description || 'A focused session for your next win.'}</p><div className="workout-meta"><span>{workout.durationMinutes ? `${workout.durationMinutes} min` : 'Flexible'}</span><span>{workout.difficulty || 'All levels'}</span></div></article>)}</div>}</CollectionPage>
}

export default Workouts