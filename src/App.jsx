// import { useEffect, useState } from 'react'
import Card from './components/card'
// Scoreboard - current score, and a “Best Score”
// There should be a function that displays the cards in a random order anytime a user clicks one. Be sure to invoke that function when the component mounts.

//  8 or 12 cards

const API_KEY = import.meta.env.API_KEY;
const API_BASE_URL = `http://www.comicvine.com/api/`

// <resource>/?api_key=<api_key>&filter=<filter>:<value>&format=json

const characters = ['Daredevil', 'Cyclops', 'Human Nightcrawler', 'Gambit', 'Iron Fist', 'Hawkeye', 'Emma Frost', 'Storm', 'Jubilee', 'Jessica Jones', 'Kate Bishop', 'Linda Carter']
function App() {
  // const [characterData, setCharacterData] = useState({})

  const getCharacterData = async (char_name) => {
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
	

  // http://www.comicvine.com/api/characters/?api_key=6b255a47b25c88227c57121c75356c59ae586b71&field_list=name,image&limit=1&filter=name:Daredevil,gender:male&format=json
  return (
    <>
      {/* {characters.map(async char => {
        const ch_info = await getCharacterData(char)
        return (
          <li>{ch_info.name}</li>
        )
      })} */}
      <Card img='https://comicvine.gamespot.com/a/uploads/scale_small/11118/111187046/7397359-0398898002-EQH1ysWWsAA7QLf' name='Daredevil'/>
    </>
  )
}

export default App
