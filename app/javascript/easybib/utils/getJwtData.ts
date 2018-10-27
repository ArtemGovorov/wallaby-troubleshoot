import { JWT_LOCALSTOARAGE_KEY } from '../constants'

export type JwtData = {
  client: string
  email: string
  cheggTokens: {
    access_token: string
    id_token: string
    expires_in: string
  }
  user_role: string
  paidMember: false
  sessionId: string
  cheggUserUuid: string
  exp: number
}

export default (): JwtData | null => {
  try {
    // TODO: Ensure JWT_LOCALSTOARAGE_KEY is the correct value when JWT is plugged into CFE
    const jwtCache = localStorage.getItem(JWT_LOCALSTOARAGE_KEY)
    const userEncrypted = jwtCache.split('.')[1]
    return JSON.parse(atob(userEncrypted)) as JwtData
  } catch (e) {
    // jwt wasn't present in user's localStorage.
  }
  return null
}
