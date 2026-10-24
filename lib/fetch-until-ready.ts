export function isAbortError(error: unknown) {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  )
}

function sleep(ms: number, signal?: AbortSignal) {
  if (ms <= 0) return Promise.resolve()

  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"))
      return
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort)
      resolve()
    }, ms)

    const onAbort = () => {
      clearTimeout(timer)
      reject(new DOMException("Aborted", "AbortError"))
    }

    signal?.addEventListener("abort", onAbort, { once: true })
  })
}

export async function fetchUntilReady<T>({
  load,
  isReady,
  signal,
  initialDelayMs = 200,
  maxDelayMs = 2000,
  maxAttempts = Number.POSITIVE_INFINITY,
  onRetry,
}: {
  load: (signal: AbortSignal) => Promise<T>
  isReady: (value: T) => boolean
  signal?: AbortSignal
  initialDelayMs?: number
  maxDelayMs?: number
  maxAttempts?: number
  onRetry?: (attempt: number) => void
}): Promise<T> {
  let delay = initialDelayMs
  let attempt = 0
  let lastError: unknown
  let lastValue: T | undefined
  let hasLastValue = false

  while (true) {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError")
    }

    try {
      const value = await load(signal ?? new AbortController().signal)
      lastValue = value
      hasLastValue = true
      if (isReady(value)) return value
    } catch (error) {
      if (isAbortError(error)) throw error
      lastError = error
    }

    attempt += 1
    if (attempt >= maxAttempts) {
      // A resolved-but-not-ready value (for example an empty array from a
      // newly created sheet) is still authoritative after all retries. Return
      // it so consumers can clear stale UI instead of displaying old data.
      if (hasLastValue) return lastValue as T
      throw lastError instanceof Error ? lastError : new Error("Data is not ready")
    }
    onRetry?.(attempt)
    await sleep(delay, signal)
    delay = Math.min(Math.round(delay * 1.35), maxDelayMs)
  }
}

export async function readApiList<T>(
  response: Response,
): Promise<T[]> {
  const data: unknown = await response.json().catch(() => null)
  if (!response.ok || !Array.isArray(data)) {
    throw new Error("API list is not ready")
  }
  return data as T[]
}
