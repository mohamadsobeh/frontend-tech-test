export async function apiFetch<T>(url: string, token?: string): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    headers,
  })

  if (!response.ok) {
    try {
      const errorData = await response.json()
      const message = errorData?.message || `Request failed with status ${response.status}`
      throw new Error(message)
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error(`Request failed with status ${response.status}`)
    }
  }

  return response.json()
}
