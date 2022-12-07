import { useState } from 'react'

const Title = (props) => <h1>{props.text}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Anecdote = (props) => (<p>{props.anecdotes[props.number]}</p>)

const Votes = (props) => <p>has {props.vote[props.number]} votes</p>

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [vote, setVote] = useState(new Array(7).fill(0))

    const handleNext = () => setSelected(Math.floor(Math.random() * 7 + 0))

    const handleVote = () => {
        const copy = [...vote]
        copy[selected] += 1
        setVote(copy)
    }

    const mostVotes = vote.indexOf(Math.max(...vote))

    return (
        <div>
            <Title text="Anecdote of the day" />

            <Anecdote anecdotes={anecdotes} number={selected} />
            <Votes vote={vote} number={selected} />
            <Button handleClick={handleVote} text="vote" />
            <Button handleClick={handleNext} text="next anecdote" />

            <Title text="Anecdote with most votes" />

            <Anecdote anecdotes={anecdotes} number={mostVotes} />
            <Votes vote={vote} number={mostVotes} />
        </div>
    )
}

export default App