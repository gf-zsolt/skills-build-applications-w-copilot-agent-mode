export type ApiRecord = Record<string, unknown>

export function normalizeApiResponse(value: unknown): ApiRecord[] {
  if (Array.isArray(value)) {
    return value.map(normalizeRecord)
  }

  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    if (Array.isArray(obj.data)) {
      return obj.data.map(normalizeRecord)
    }

    if (Array.isArray(obj.items)) {
      return obj.items.map(normalizeRecord)
    }

    return [normalizeRecord(obj)]
  }

  return []
}

function normalizeRecord(value: unknown): ApiRecord {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as ApiRecord
  }

  return { value }
}
