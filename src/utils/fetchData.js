export const getAllCharacters = async () => {
  const md5 = require('md5');

  // Your API credentials
  const apiKey = 'b5d566cf249c2b1c34d8199b3e7b17d1';
  const privateKey = '2f24398f5a8c822633e65df8946dff98902bc076';
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
  const url = new URL('http://gateway.marvel.com/v1/public/characters?limit=6');
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