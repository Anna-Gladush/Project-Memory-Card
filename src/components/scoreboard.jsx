const Scoreboard = ({currentScore, bestScore}) => {
  return (
  <div className="scoreboard">
    <h1 className="logo">MARVEL</h1>
    <div className="score">
      <p>Score: {currentScore} / 12</p>
      <p>Best Score: {bestScore}</p>
    </div>
  </div>
  )
}
export default Scoreboard