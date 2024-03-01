import {
  privateKey,
  apiKey,
  baseUrl,
  endpoints,
} from '../constants/marvelApi.ts'

export const getCharacters = async (limit: number, offset: number) => {
  const url = new URL(
    `${baseUrl}${endpoints['characters']}?limit=${limit}&offset=${offset}`
  )
  return getData(url)
}

export const getSingleCharacter = async (name: string) => {
  const url = new URL(`${baseUrl}${endpoints['characters']}?name=${name}`)
  return getData(url)
}

export const getData = async (url: URL) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const md5 = require('md5')

  const ts = new Date().getTime() // timestamp

  // Generating hash
  const hash = md5(ts + privateKey + apiKey)

  // Request parameters
  const params = {
    apikey: apiKey,
    ts: ts,
    hash: hash,
  }

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  )

  // Request headers
  const headers = {
    Accept: '*/*',
  }

  // Make GET request to Marvel Comics API using fetch
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
