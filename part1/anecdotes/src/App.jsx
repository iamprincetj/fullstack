import { useState } from "react"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const DisplayAnecdote = ({anecdote}) => <p> {anecdote} </p>

const DisplayVotes = ({vote}) => {
  if (vote === 1) {
    return (
      <p> has {vote} vote </p>
    )
  }
  return (
    <p> has {vote} votes</p>
  )
}

const Header = ({change}) => <h1> Anecdote {change} </h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const arrLen = anecdotes.length
  let newArr = new Array(arrLen)
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(newArr.fill(0))
  const [history, setHistory] = useState([])

  function getRandomNumber(limit) {
    return Math.floor(Math.random()*limit)
  }
  
  let ranNum = getRandomNumber(arrLen)

  const handleSetSelected = () => {
    setSelected(ranNum)
    setHistory(history.concat(ranNum))
  }

  const currentAnec = history[history.length-1] | 0
  console.log(vote[currentAnec])
  console.log((vote))

  const large = Math.max(...vote)

  

  const handleSetVote = () => {
    const copy = [...vote]
    copy[currentAnec] += 1
    setVote(copy)
  }

  return (
    <div>
      <Header change='of the day'/>
      <DisplayAnecdote anecdote={anecdotes[selected]}/>
      <DisplayVotes vote={vote[currentAnec]} />
      <Button onClick={handleSetVote} text='vote'/>
      <Button text='next anecdote' onClick={handleSetSelected}/>
      <Header change='with most votes'/>
      <DisplayAnecdote anecdote={anecdotes[vote.indexOf(large)]} />
      <DisplayVotes vote={vote[vote.indexOf(large)]}/>
    </div>
  )
}

export default App