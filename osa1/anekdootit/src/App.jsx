import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const newVotes = [...vote]
    newVotes[selected] += 1
    setVote(newVotes)
  }

  const mostVotes = Math.max(...vote)
  const mostVotesIndex = vote.indexOf(mostVotes)

  return(
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button onClick={handleVote} text="vote"/>
      <Button onClick={handleClick} text="next anecdote"/>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
}

export default App