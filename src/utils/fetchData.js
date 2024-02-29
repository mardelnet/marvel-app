import { privateKey, apiKey, baseUrl, endpoints} from '../constants/marvelApi';

export const getCharacters = async (limit, offset) => {
  const md5 = require('md5');

  const ts = new Date().getTime(); // timestamp

  // Generating hash
  const hash = md5(ts + privateKey + apiKey);

  // Request parameters
  const params = {
    apikey: apiKey,
    ts: ts,
    hash: hash
  };

  // Constructing URL with query parameters
  const url = new URL(`${baseUrl}${endpoints['characters']}?limit=${limit}&offset=${offset}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  // Request headers
  const headers = {
    'Accept': '*/*'
  };

  // Make GET request to Marvel Comics API using fetch
  try {
    const response = await fetch(url, { method: 'GET', headers: headers })

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch(error) {
    console.error('Error:', error);
  }
}