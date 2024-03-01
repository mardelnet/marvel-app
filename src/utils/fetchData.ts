import { apiKey, baseUrl, endpoints } from '../constants/marvelApi.ts'

/**
 * Fetches characters from the Marvel Comics API.
 * @param {number} limit - The maximum number of characters to retrieve.
 * @param {number} offset - The offset for paginating the results.
 * @returns {Promise} - A promise that resolves with the fetched data.
 */
export const getCharacters = async (limit: number, offset: number) => {
  const url = new URL(
    `${baseUrl}${endpoints['characters']}?limit=${limit}&offset=${offset}`
  )
  return getData(url)
}

/**
 * Fetches a single character from the Marvel Comics API by name.
 * @param {string} name - The name of the character to retrieve.
 * @returns {Promise} - A promise that resolves with the fetched data.
 */
export const getSingleCharacter = async (name: string) => {
  const url = new URL(`${baseUrl}${endpoints['characters']}?name=${name}`)
  return getData(url)
}

/**
 * Fetches data from the specified URL using the fetch API.
 * @param {URL} url - The URL to fetch data from.
 * @returns {Promise} - A promise that resolves with the fetched data.
 */
export const getData = async (url: URL) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const md5 = require('md5')

  const ts = new Date().getTime()

  const secretKey = process.env.REACT_APP_MARVEL_API_SECRET

  if (!secretKey) {
    throw new Error(
      'REACT_APP_MARVEL_API_SECRET is not defined in the environment.'
    )
  }

  const hash = md5(ts + secretKey + apiKey)

  const params = {
    apikey: apiKey,
    ts: ts,
    hash: hash,
  }

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  )

  const headers = {
    Accept: '*/*',
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: headers,
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
