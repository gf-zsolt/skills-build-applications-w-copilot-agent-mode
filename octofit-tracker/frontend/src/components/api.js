export function normalizeApiResponse(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeRecord)
  }

  if (value && typeof value === 'object') {
    if (Array.isArray(value.data)) {
      return value.data.map(normalizeRecord)
    }

    if (Array.isArray(value.items)) {
      return value.items.map(normalizeRecord)
    }

    return [normalizeRecord(value)]
  }

  return []
}

function normalizeRecord(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value
  }

  return { value }
}
