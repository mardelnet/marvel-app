import { getData } from './fetchData.ts'
import { baseUrl, endpoints } from '../constants/marvelApi'

// Define the environment variable
process.env.REACT_APP_MARVEL_API_SECRET = 'your_secret_key'

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: {} }),
  })
)

describe('Fetch Data Functions', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('getData', () => {
    it('calls fetch with the correct URL', async () => {
      const url = new URL(`${baseUrl}${endpoints['characters']}`)

      await getData(url)

      expect(fetch).toHaveBeenCalledWith(url.toString(), {
        method: 'GET',
        headers: {
          Accept: '*/*',
        },
      })
    })
  })
})
