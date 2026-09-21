import { API_BASE_URL, useApiCollection } from '../api.js'
import { CollectionPage, DataStatus } from './Activities.jsx'

const USERS_API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : `${API_BASE_URL}/api/users/`

function Users() {
  const { data, loading, error } = useApiCollection('users', USERS_API_URL)
  return <CollectionPage eyebrow="THE CREW" title="Know who is showing up." description="Your team roster, ready for the next session."><DataStatus loading={loading} error={error} empty={!data.length} label="users" />{!loading && !error && data.length > 0 && <div className="card-grid">{data.map((user, index) => <article className="info-card person-card" key={user._id || index}><div className="avatar">{(user.username || 'U').slice(0, 1).toUpperCase()}</div><div><h3>{user.profile?.displayName || user.username || 'Teammate'}</h3><p>@{user.username || 'unknown'} {user.profile?.grade ? `· Grade ${user.profile.grade}` : ''}</p></div></article>)}</div>}</CollectionPage>
}

export default Users