import { getCharacters, getSingleCharacter, getData } from './marvelApi';

describe('getCharacters function', () => {
  beforeEach(() => {
    // Clear fetch mock history before each test
    fetchMock.resetMocks();
  });

  it('fetches characters from Marvel Comics API', async () => {
    const mockData = { /* Mock character data */ };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const limit = 10;
    const offset = 0;
    const characters = await getCharacters(limit, offset);

    expect(characters).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledWith(`mockedBaseUrl/characters?limit=${limit}&offset=${offset}`, expect.any(Object));
  });
});

describe('getSingleCharacter function', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches a single character by name from Marvel Comics API', async () => {
    const mockData = { /* Mock character data */ };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const characterName = 'Iron Man';
    const character = await getSingleCharacter(characterName);

    expect(character).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledWith(`mockedBaseUrl/characters?name=${characterName}`, expect.any(Object));
  });
});

describe('getData function', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches data from the specified URL using fetch API', async () => {
    const mockData = { /* Mock data */ };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const url = new URL('mockedUrl');
    const data = await getData(url);

    expect(data).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledWith(url.toString(), expect.any(Object));
  });
});
