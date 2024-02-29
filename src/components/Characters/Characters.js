import React, { useState, useEffect } from 'react';
import styles from './Characters.module.scss';

function Character() {
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
    const url = new URL('http://gateway.marvel.com/v1/public/characters?limit=6');
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
        setData(data);
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  }, []);

  const filterDescription = (text) => {
    return text.length > 101 ? text.substring(0, 101) + '...' : text;
  }

  return (
    <div>
      {data && (
      <div className={styles.container}>
        {data.data.results.map(item => (
          <div className={styles.item} key={item.id}>
            <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={'altText'} />
            <div className={styles.description}>
              <h3>{item.name}</h3>
              <div>{item.description ? filterDescription(item.description) : '(No description available)'}</div>
              <a href={item.urls[0].url} target='_blank' rel="noreferrer">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
  );
}

export default Character;
