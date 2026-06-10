import { useEffect, useState } from 'react'
import { normalizeApiResponse } from './api'

function Leaderboard({ codespaceName }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiBase = codespaceName && codespaceName !== 'undefined'
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'https://localhost:8000/api'
  const url = `${apiBase}/leaderboard`

  useEffect(() => {

    setLoading(true)
    setError(null)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.status}`)
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
  }, [url])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p className="text-muted">Loaded from <code>{`${url}`}</code></p>

      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading leaderboard...</span>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="alert alert-secondary">No leaderboard entries available.</div>
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

export default Leaderboard
