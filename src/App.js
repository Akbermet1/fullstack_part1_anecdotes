import React, { useState } from 'react'

const Anecdote = ({title, anecdote, voteCount}) => {
  return (
   <div>
      <h1> {title}  </h1>
      <p> {anecdote} </p>
      <p> has {voteCount} {voteCount >= 0 ? " votes" : " vote"} </p>
   </div> 
  )
}

const AnecdoteWithMostVotes = ({title, anecdotes, anecdotesState}) => {
  const findMostUpvotedIndex = () => {
    let mostUpvotedIndex = 0
    for(let i = 0; i < anecdotesState.votes.length; i++)
    {      
      if(anecdotesState.votes[mostUpvotedIndex] < anecdotesState.votes[i])
      {
        mostUpvotedIndex = i
      }
    }

    console.log(mostUpvotedIndex)
    return mostUpvotedIndex
  }

  let anecdote_index = findMostUpvotedIndex()

  if(Math.max(...anecdotesState.votes) > 0)
    return (
      <Anecdote title={title} anecdote={anecdotes[anecdote_index]} voteCount={anecdotesState.votes[anecdote_index]}/>
    )
  else
  return (
    <div>
      <h1> {title}  </h1>
      <p> There is no most upvoted anecdote yet. </p>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [anecdotesState, setAnecdotesState] = useState({selected: 0, votes: new Array(anecdotes.length).fill(0)})

  const selectRandomAnecdote = () => {
    let randomIndex = Math.round(Math.random() * (anecdotes.length - 1))
    const newState = {
      selected: randomIndex,
      votes: [...anecdotesState.votes]
    }
    console.log("index =",randomIndex)
    console.log(newState)
    setAnecdotesState(newState)
  }

  const voteForAnecdote = (anecdoteIndex) => {
    const newVotes = [...anecdotesState.votes]
    newVotes[anecdoteIndex] += 1
    const newState = {
      ...anecdotesState,
      votes: newVotes
    }

    console.log(newState.votes)
    setAnecdotesState(newState)
  }

  return (
    <div>
      <Anecdote title={"Anecdote of the day"} anecdote={anecdotes[anecdotesState.selected]} voteCount={anecdotesState.votes[anecdotesState.selected]}/>
      <Button text={"vote"} onClick={() => voteForAnecdote(anecdotesState.selected)}/>
      <Button text={"next anecdote"} onClick={selectRandomAnecdote}/>
      <AnecdoteWithMostVotes title={"Anecdote with most votes"} anecdotes={anecdotes} anecdotesState={anecdotesState}/>
    </div>
  )
}

export default App