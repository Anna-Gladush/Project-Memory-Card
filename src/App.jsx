/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import Card from './components/card'
import Spinner from "./components/spinner"
import Scoreboard from './components/scoreboard'

// There should be a function that displays the cards in a random order anytime a user clicks one. Be sure to invoke that function when the component mounts.

// const API_KEY = import.meta.env.API_KEY;
// const API_BASE_URL = `http://www.comicvine.com/api/`
const characters = ['Daredevil', 'Cyclops', 'Nightcrawler', 'Gambit', 'Iron Fist', 'Hawkeye', 'Emma Frost', 'Storm', 'Jubilee', 'Jessica Jones', 'Kate Bishop', 'Linda Carter'];

function App() {
  let chara = []
  const [characterData, setCharacterData] = useState(chara);
  const [isLoading, setIsLoading] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameover, setGameover] = useState(false);

  const shuffleCards = (arr) => {
    const new_arr = [...arr];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [new_arr[i], new_arr[j]] = [new_arr[j], new_arr[i]];
    }
    return new_arr
  }

  const getCharacterData = async () => {
    setIsLoading(true);
    const promises = characters.map((char) => 
      fetch(`https://comicvine.gamespot.com/api/characters/?api_key=6b255a47b25c88227c57121c75356c59ae586b71&field_list=name,image&limit=1&filter=name:${char}&format=json`)
      .then((res) => 
        res.json()
      ).then((data) => ({
        data: data.results[0],
        flipped: 'no'
      })))
      const results = await Promise.all(promises)
      .catch(error => console.error("Failed:", error));
      setCharacterData(shuffleCards(results));
      console.log(results);
      setIsLoading(false);
  };



  const handleCardClick = () => {
    
  }



  useEffect(() => {   
    getCharacterData()
  }, [])

  return (
    <>
    <header>
      {/* SCOREBOARD */}
      <Scoreboard currentScore={currentScore} bestScore={bestScore}/>
    </header>
    <main>
      {isLoading ? ( <Spinner /> ) : 
      (<div className='memory-card-deck'>
        {characterData.map(char => {
          return (
            <Card img={char.data.image.original_url} name={char.data.name} key={char.data.id} id={char.data.id} onClick={handleCardClick}/>
          )
        })}
      </div>)} 
    </main>
    </>
  )
}

export default App
