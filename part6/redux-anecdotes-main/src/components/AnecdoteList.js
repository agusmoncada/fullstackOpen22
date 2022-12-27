import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { alert } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
      if (filter === '') {
        return anecdotes
      }
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const handdleVote = (anecdote) => {
      dispatch(vote(anecdote))
      dispatch(alert(`you voted '${anecdote.content}'`, 5))
    }
    return (
      <>
          {anecdotes
          .slice()
          .sort((a,b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handdleVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
      </>
    )
}

export default AnecdoteList