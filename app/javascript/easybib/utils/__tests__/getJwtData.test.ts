import getJwtData from 'easybib/utils/getJwtData'
import { JWT_LOCALSTOARAGE_KEY } from '../../constants'

describe('getJwtData.ts', () => {
  const jwtData = {
    client: 'wbe',
    email: 'jmealy@chegg.com',
    cheggTokens: {
      access_token: '1Ay9Qs4RWmISe4R5qF3SFd9xAVA9',
      id_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodWIudGVzdDMuY2hlZ2duZXQuY29tIiwic3ViIjoiNmExMGI4MzYtYmI0ZC00Zjk1LTg5OTctNmFhMzU0OGUyMDNmIiwiYXVkIjoiRUIiLCJleHAiOjE1NTE5MTgyNjYsImlhdCI6MTUzNjM2NjI2NiwiZW1haWwiOiJqbWVhbHlAY2hlZ2cuY29tIn0.F4it55BHg5Z0flKXnAMSyVZWr12_iNs7rMRih3wuDN0',
      expires_in: '1439',
    },
    user_role: 'not_logged_in',
    paidMember: false,
    sessionId: '022lgkblibrgobhg48ufokld20',
    cheggUserUuid: '6a10b836-bb4d-4f95-8997-6aa3548e203f',
    exp: 1536367167,
  }
  const jwt =
    'eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnQiOiJ3YmUiLCJlbWFpbCI6ImptZWFseUBjaGVnZy5jb20iLCJjaGVnZ1Rva2VucyI6eyJhY2Nlc3NfdG9rZW4iOiIxQXk5UXM0UldtSVNlNFI1cUYzU0ZkOXhBVkE5IiwiaWRfdG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcGMzTWlPaUpvZFdJdWRHVnpkRE11WTJobFoyZHVaWFF1WTI5dElpd2ljM1ZpSWpvaU5tRXhNR0k0TXpZdFltSTBaQzAwWmprMUxUZzVPVGN0Tm1GaE16VTBPR1V5TURObUlpd2lZWFZrSWpvaVJVSWlMQ0psZUhBaU9qRTFOVEU1TVRneU5qWXNJbWxoZENJNk1UVXpOak0yTmpJMk5pd2laVzFoYVd3aU9pSnFiV1ZoYkhsQVkyaGxaMmN1WTI5dEluMC5GNGl0NTVCSGc1WjBmbEtYbkFNU3lWWldyMTJfaU5zN3JNUmloM3d1RE4wIiwiZXhwaXJlc19pbiI6IjE0MzkifSwidXNlcl9yb2xlIjoibm90X2xvZ2dlZF9pbiIsInBhaWRNZW1iZXIiOmZhbHNlLCJzZXNzaW9uSWQiOiIwMjJsZ2tibGlicmdvYmhnNDh1Zm9rbGQyMCIsImNoZWdnVXNlclV1aWQiOiI2YTEwYjgzNi1iYjRkLTRmOTUtODk5Ny02YWEzNTQ4ZTIwM2YiLCJleHAiOjE1MzYzNjcxNjd9.DVTcIf8c09LRfyGgHm-sBFwrSNclPO3olUB0ZBCNitQ'

  afterAll(() => {
    localStorage.removeItem(JWT_LOCALSTOARAGE_KEY)
  })
  it('should retrieve an objet from localStorage', () => {
    localStorage.setItem(JWT_LOCALSTOARAGE_KEY, jwt)
    const parsedData = getJwtData()
    expect(parsedData).toEqual(jwtData)
  })
  it('should return null if an error occurs while retrieving from localStorage', () => {
    localStorage.removeItem(JWT_LOCALSTOARAGE_KEY)
    const parsedData = getJwtData()
    expect(parsedData).toBe(null)
  })
})
