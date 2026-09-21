import { useApiCollection } from '../api.js'
import { CollectionPage, DataStatus } from './Activities.jsx'

function Teams() {
  const { data, loading, error } = useApiCollection('teams')
  return <CollectionPage eyebrow="YOUR TEAMS" title="Better together." description="Find your people and make the next goal a group effort."><DataStatus loading={loading} error={error} empty={!data.length} label="teams" />{!loading && !error && data.length > 0 && <div className="card-grid">{data.map((team, index) => <article className="info-card" key={team._id || index}><p className="card-kicker">TEAM {String(index + 1).padStart(2, '0')}</p><h3>{team.name || 'Unnamed team'}</h3><p>{team.description || 'Ready for a new challenge.'}</p><strong>{team.members?.length || 0} members</strong></article>)}</div>}</CollectionPage>
}

export default Teams