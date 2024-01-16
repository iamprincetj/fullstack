import { useState } from "react"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <tbody><tr><td>{text}</td><td>{value}</td></tr></tbody>

const Statistics = ({good, neutral, bad, all, positive, average}) => {

  if (good === 0 & bad === 0 & neutral === 0 ) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
        <h1>statistics</h1>
        <table>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={all}/>
          <StatisticLine text='average' value={average}/>
          <StatisticLine text='positive' value={positive+' %'}/>
        </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const average = () => (((good * 1) + (neutral*0) + (bad*-1)) / all).toFixed(1)
  const positive = () => ( (good/all) * 100 ).toFixed(1)


  return (
    <div>
      <h1>give feedbacks</h1>
      <Button onClick={() => {
        setGood(good + 1)
        setAll(all + 1)
      }
      } text='good'/>
      <Button onClick={() => {
        setNeutral(neutral + 1)
        setAll(all + 1)
      }
      } text='neutral'/>
      <Button onClick={() => {
        setBad(bad + 1)
        setAll(all + 1)
      }
      } text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} positive={positive()} average={average()}/>
    </div>
  )
}

export default App