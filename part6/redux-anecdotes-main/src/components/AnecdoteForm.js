import { useDispatch } from "react-redux"
import { create } from "../reducers/anecdoteReducer"
import { alertAnecdote, removeAlert } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create(content))
        dispatch(alertAnecdote(content))
        setTimeout(() => {
            dispatch(removeAlert())
        }, 5000);
    }

    return (
        <>
            <div>
                <h3>create anecdote</h3>
                <form onSubmit={add}>
                <input name='anecdote'/>
                <button type='submit'>add</button>
                </form>
            </div>
        </>
    ) 
}

export default AnecdoteForm