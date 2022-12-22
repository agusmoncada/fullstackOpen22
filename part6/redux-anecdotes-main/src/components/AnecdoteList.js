import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { alertVote, removeAlert } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const handdleVote = (id, content) => {
      dispatch(vote(id))
      dispatch(alertVote(content))
      setTimeout(() => {
        dispatch(removeAlert())
      }, 4000);
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
                  <button onClick={() => handdleVote(anecdote.id, anecdote.content)}>vote</button>
                </div>
              </div>
            )}
        </>
       
    )
}

export default AnecdoteList