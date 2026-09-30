/**
 * Mock transport layer.
 *
 * Every function here simulates network latency and can fail, so components
 * are written against real async behaviour. Replacing a function body with a
 * `fetch` call (or an SDK call) is the only change required to connect a real
 * backend. No credentials, tokens or API keys live in this file.
 */

const LATENCY = { min: 350, max: 900 }

const delay = (ms?: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms ?? LATENCY.min + Math.random() * (LATENCY.max - LATENCY.min)))

export class ServiceError extends Error {
  constructor(
    message: string,
    readonly kind: 'network' | 'auth' | 'validation' = 'network',
  ) {
    super(message)
    this.name = 'ServiceError'
  }
}

/* -------------------------------------------------------------------------- */
/* Admissions                                                                  */
/* -------------------------------------------------------------------------- */

export interface SubmissionResult {
  reference: string
  submittedAt: string
}

export const submitApplication = async (payload: unknown): Promise<SubmissionResult> => {
  void payload
  await delay(1200)
  if (Math.random() < 0.06) {
    throw new ServiceError(
      'We could not reach the admissions server. Your entries are still on this device — please try again.',
      'network',
    )
  }
  const reference = `ASM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 899999)}`
  return { reference, submittedAt: new Date().toISOString() }
}

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const sendContactMessage = async (payload: unknown): Promise<{ receivedAt: string }> => {
  void payload
  await delay(1000)
  if (Math.random() < 0.08) {
    throw new ServiceError('Your message could not be sent. Please check your connection and try again.', 'network')
  }
  return { receivedAt: new Date().toISOString() }
}

/* -------------------------------------------------------------------------- */
/* Parent portal authentication                                                */
/* -------------------------------------------------------------------------- */

const SESSION_KEY = 'aslam.parent.session'

/**
 * DEMO CREDENTIALS — this is a frontend simulation only. No real account,
 * password or token is involved, and nothing here is a credential.
 * A production build must delete this block and delegate to a server session.
 */
const demoAccounts: Record<string, string> = {
  'parent/2026': 'aslam-demo',
}

export interface PortalSession {
  parentId: string
  displayName: string
  issuedAt: string
  mock: true
}

export const signIn = async (parentId: string, password: string, remember: boolean): Promise<PortalSession> => {
  await delay(800)
  if (!parentId.trim() || !password) {
    throw new ServiceError('Enter your parent ID and password to continue.', 'validation')
  }
  if (demoAccounts[parentId.trim()] !== password) {
    throw new ServiceError(
      'Those details were not recognised. This demo accepts parent ID "parent/2026" with password "aslam-demo".',
      'auth',
    )
  }
  const session: PortalSession = {
    parentId: parentId.trim(),
    displayName: 'Aslam Family',
    issuedAt: new Date().toISOString(),
    mock: true,
  }
  if (remember) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  else sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export const signOut = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* storage unavailable — nothing to clear */
  }
}

/**
 * Session shape guard. Web storage is attacker-writable from any script on the
 * origin, so the parsed value is validated rather than cast: a tampered or
 * stale entry must fail closed instead of being trusted by the route guard.
 */
const isPortalSession = (value: unknown): value is PortalSession => {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.parentId === 'string' &&
    candidate.parentId.length > 0 &&
    typeof candidate.displayName === 'string' &&
    typeof candidate.issuedAt === 'string' &&
    Number.isFinite(Date.parse(candidate.issuedAt))
  )
}

const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 8

export const readSession = (): PortalSession | null => {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
  if (!raw) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (!isPortalSession(parsed)) return null

  if (Date.now() - Date.parse(parsed.issuedAt) > SESSION_MAX_AGE_MS) {
    signOut()
    return null
  }
  return parsed
}

/* -------------------------------------------------------------------------- */
/* Messaging                                                                   */
/* -------------------------------------------------------------------------- */

export const sendMessage = async (conversationId: string, body: string): Promise<{ id: string }> => {
  void conversationId
  void body
  await delay(500)
  return { id: `local-${Date.now()}` }
}

/* -------------------------------------------------------------------------- */
/* Payments                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Deliberately unimplemented. A real integration must be completed server-side
 * with a certified payment provider; the client only receives a redirect URL
 * or a provider token.
 */
export const startFeePayment = async (amount: number): Promise<never> => {
  await delay(600)
  throw new ServiceError(
    `Online payment is not enabled in this build. Please contact the bursar's office to settle ₦${amount.toLocaleString('en-NG')}.`,
    'network',
  )
}
