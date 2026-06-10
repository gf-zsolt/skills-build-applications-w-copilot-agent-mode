import { useEffect, useState } from 'react'
import { normalizeApiResponse } from './api'

function Workouts({ codespaceName }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const host = codespaceName && codespaceName !== 'undefined'
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'https://localhost:8000'
    const apiBase = `${host}/api`
    const url = `${apiBase}/workouts`

    setLoading(true)
    setError(null)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch workouts: ${response.status}`)
        }
        return response.json()
      })
      .then((payload) => {
        setItems(normalizeApiResponse(payload))
      })
      .catch((fetchError) => {
        setError(fetchError instanceof Error ? fetchError.message : 'Unknown error')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [codespaceName])

  return (
    <section>
      <h2>Workouts</h2>
      <p className="text-muted">Loaded from <code>{`${url}`}</code></p>

      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading workouts...</span>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="alert alert-secondary">No workouts found.</div>
      )}

      {items.map((item, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <pre className="mb-0"><code>{JSON.stringify(item, null, 2)}</code></pre>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Workouts
