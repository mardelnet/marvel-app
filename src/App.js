import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
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
    const url = new URL('http://gateway.marvel.com/v1/public/characters');
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // Request headers
    const headers = {
      'Accept': '*/*'
    };

    // Make GET request to Marvel Comics API using fetch
    fetch(url, {
      method: 'GET',
      headers: headers
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle response data
        console.log(data);
        setData(data);
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      {data && (
      <ul>
        {data.data.results.map(item => (
          <li key={item.id}>
            {item.name}
            {item.description}
            {item.thumbnail.path}
            {item.thumbnail.extension}
            {item.urls[0].url}
          </li>
        ))}
      </ul>
    )}
    </div>
  );
}

export default App;
