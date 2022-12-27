import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { alert } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        //Tells reducer to make async operation
        dispatch(createAnecdote(content))
        
        //Notification
        dispatch(alert(`you created '${content}'`, 2))
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