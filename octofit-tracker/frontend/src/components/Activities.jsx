import { API_BASE_URL, displayDate, useApiCollection } from '../api.js'

const ACTIVITIES_API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : `${API_BASE_URL}/api/activities/`

function Activities() {
  const { data, loading, error } = useApiCollection('activities', ACTIVITIES_API_URL)

  return (
    <CollectionPage eyebrow="ACTIVITY LOG" title="Keep the streak visible." description="A live feed of the work your team has put in.">
      <DataStatus loading={loading} error={error} empty={!data.length} label="activities" />
      {!loading && !error && data.length > 0 && (
        <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Activity</th><th>Athlete</th><th>Duration</th><th>Points</th><th>Date</th></tr></thead><tbody>{data.map((activity) => <tr key={activity._id || `${activity.type}-${activity.completedAt}`}><td className="cell-strong">{activity.type || 'Workout'}</td><td>{activity.user?.username || activity.username || '—'}</td><td>{activity.durationMinutes ? `${activity.durationMinutes} min` : '—'}</td><td className="points">{activity.points ?? 0}</td><td>{displayDate(activity.completedAt)}</td></tr>)}</tbody></table></div>
      )}
    </CollectionPage>
  )
}

export function CollectionPage({ eyebrow, title, description, children }) { return <><div className="page-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{description}</p></div>{children}</> }
export function DataStatus({ loading, error, empty, label }) { if (loading) return <p className="status-message">Loading {label}...</p>; if (error) return <p className="status-message status-error">Could not load {label}: {error}</p>; if (empty) return <p className="status-message">No {label} found yet.</p>; return null }

export default Activities