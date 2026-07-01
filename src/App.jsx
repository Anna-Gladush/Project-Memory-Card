/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import Card from './components/card'
import Spinner from "./components/spinner"
import Scoreboard from './components/scoreboard'
import Confetti from 'react-confetti'

import mock from "./mock.json"

const API_KEY = import.meta.env.API_KEY;

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

  const getCharacterData = () => {
    const promises = characters.map((char) => 
      fetch(`https://comicvine.gamespot.com/api/characters/?api_key=${API_KEY}&field_list=name,image&limit=1&filter=name:${char}&format=json`)
      .then((res) => 
        res.json()
      ).then((data) => ({
        data: data.results[0],
        flipped: 'no'
      })))
      const results = Promise.all(promises)
      .catch(error => {console.error("Failed:", error)});
      setCharacterData(shuffleCards(results));
      // console.log(results);
      setIsLoading(false);
  };



  const handleCardClick = (id) => {
    if (gameover) return 

    const char = characterData.filter(data => data.id === id)
    const rest = characterData.filter(data => data.id !== id)

    if (char[0].flipped == "yes") {
      const flip = characterData.map(ch => {
        ch.flipped = "no"
        return ch
      })
      setCurrentScore(0)
      setCharacterData(shuffleCards(flip))
      return
    }

    setCurrentScore(prev => prev + 1)
    setBestScore(prev => prev > currentScore ? prev : currentScore + 1)

    char[0].flipped = "yes"
    rest.push(char[0])

    if (currentScore + 1 === 12) {
      setGameover(true)
    }
    setCharacterData(shuffleCards(rest))
  }
  
  const restart = () => {
    setCurrentScore(0)
    setCharacterData(shuffleCards(characterData))
    setGameover(false)
  }

  // SINCE WE HAVE TROUBLE WITH CORS WE WILL USE mock.js
  useEffect(() => {
    const results = mock.map(item => {
      return {
        img: item.data.image.small_url,
        id: item.data.name,
        flipped: 'no',
      }
    })
    setCharacterData(shuffleCards(results))
  }, [])

  return (
    <>
    {gameover && 
    (<>
    <Confetti 
      recycle={false}
      numberOfPieces={1000}
      colors={['#f44336','#e91e63','#673ab7','#3f51b5','#2196f3','#009688','#4CAF50','#FFEB3B','#FFC107','#FF9800','#FF5722']}
      />
      <button className='restart' onClick={restart}>Restart</button>
      </>)}

    <header>
      {/* SCOREBOARD */}
      <Scoreboard currentScore={currentScore} bestScore={bestScore}/>
    </header>
    <main>
      {isLoading ? ( <Spinner /> ) : 
      (<div className='memory-card-deck'>
        {characterData.map(char => {
          return (
            <Card img={char.img} name={char.id} key={char.id} id={char.id} handler={handleCardClick}/>
          )
        })}
      </div>)} 
    </main>
    </>
  )
}

export default App
