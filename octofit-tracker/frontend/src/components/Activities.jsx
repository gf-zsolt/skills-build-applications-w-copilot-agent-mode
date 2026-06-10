import { useEffect, useState } from 'react'
import { normalizeApiResponse } from './api'

function Activities({ codespaceName }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const host = codespaceName && codespaceName !== 'undefined'
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'https://localhost:8000'
    const apiBase = `${host}/api`
    const url = `${apiBase}/activities`

    setLoading(true)
    setError(null)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch activities: ${response.status}`)
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
      <h2>Activities</h2>
      <p className="text-muted">Loaded from <code>{`${url}`}</code></p>

      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading activities...</span>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="alert alert-secondary">No activities found.</div>
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

export default Activities
