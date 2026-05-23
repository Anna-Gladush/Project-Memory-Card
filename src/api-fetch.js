const getCharacterData = async (char_name) => {
  const API_KEY = import.meta.env.API_KEY;
  const API_BASE_URL = `http://www.comicvine.com/api/`
    const params = new URLSearchParams({
      api_key: API_KEY,
      field_list: 'name,image',
      limit: 12,
      filter: `name:${char_name}`,
      format: 'json'
    })

    try {
      const response = await fetch(`${API_BASE_URL}/?${params}`);

      if (!response.ok) {
        throw new Error(`Failed fetching data. Response status: ${response.status}`);
      }
      const data = await response.json();
      return data
      // setCharacterData(data || {})
    } catch(err) {
      console.log(err)
    }
  }

export default getCharacterData