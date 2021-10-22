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
   
  const [selected, setSelected] = useState(0)
  const [anectdoteVotes, setAnectdoteVotes] = useState((new Array(anecdotes.length).fill(0)))

  const selectRandomAnecdote = () => {
    const randomIndex = Math.round(Math.random() * (anecdotes.length - 1))
    setSelected(randomIndex)
    // console.log(randomIndex)
  }

  const voteForAnecdote = (anecdoteIndex) => {
    const newAnectdoteVotes = [...anectdoteVotes]
    newAnectdoteVotes[anecdoteIndex] += 1
    console.log(newAnectdoteVotes)
    setAnectdoteVotes(newAnectdoteVotes)
  }

  const findMostUpvotedAnecdote = () => {
    let mostUpvotedIndex = 0
    for(let i = 0; i < anectdoteVotes; i++)
    {      
      if(anectdoteVotes[mostUpvotedIndex] < anectdoteVotes[i])
      {
        mostUpvotedIndex = i
      }
    }

    console.log(mostUpvotedIndex)
    return mostUpvotedIndex
  }

  return (
    <div>
      {/* <div>
        <p> {anecdotes[selected]} </p>
        <p> has {anectdoteVotes[selected]} votes </p>
      </div> */}
      <Anecdote title={"Anecdote of the day"} anecdote={anecdotes[selected]} voteCount={anectdoteVotes[selected]}/>
      <Button text={"vote"} onClick={() => voteForAnecdote(selected)}/>
      <Button text={"next anecdote"} onClick={selectRandomAnecdote}/>
      <Anecdote title={"Anecdote with most votes"} anecdote={anecdotes[findMostUpvotedAnecdote()]} voteCount={anectdoteVotes[findMostUpvotedAnecdote()]}/>
      {/* <Anecdote title={"Anecdote with most votes"} anecdote={() => findMostUpvotedAnecdote()} voteCount={anectdoteVotes[findMostUpvotedAnecdote()]}/> */}
      {/* create a separate component to display the most upvoted joke */}
    </div>
  )
}

export default App