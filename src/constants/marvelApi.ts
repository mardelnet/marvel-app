/**
 * API key for accessing the Marvel Comics API.
 * @type {string}
 */
export const apiKey = 'b5d566cf249c2b1c34d8199b3e7b17d1'

/**
 * Private key for accessing the Marvel Comics API.
 * @type {string}
 */
export const privateKey = '2f24398f5a8c822633e65df8946dff98902bc076'

/**
 * Base URL for the Marvel Comics API.
 * @type {string}
 */
export const baseUrl = 'http://gateway.marvel.com/'

/**
 * Endpoints for different resources in the Marvel Comics API.
 * @type {Record<string, string>}
 */
export const endpoints: Record<string, string> = {
  characters: 'v1/public/characters',
}
