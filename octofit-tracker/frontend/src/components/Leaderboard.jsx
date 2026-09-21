import { CollectionPage, DataStatus } from './Activities.jsx'
import { API_BASE_URL, useApiCollection } from '../api.js'

const LEADERBOARD_API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : `${API_BASE_URL}/api/leaderboard/`

function Leaderboard() {
  const { data, loading, error } = useApiCollection('leaderboard', LEADERBOARD_API_URL)
  return <CollectionPage eyebrow="LEADERBOARD" title="A little competition helps." description="See who is building momentum across the team."><DataStatus loading={loading} error={error} empty={!data.length} label="leaderboard entries" />{!loading && !error && data.length > 0 && <div className="rank-list">{data.map((entry, index) => <div className="rank-row" key={entry._id || entry.user?._id || index}><span className="rank-number">{entry.rank || index + 1}</span><span className="rank-name">{entry.user?.username || entry.username || 'Teammate'}</span><span className="points">{entry.points ?? 0} pts</span></div>)}</div>}</CollectionPage>
}

export default Leaderboard