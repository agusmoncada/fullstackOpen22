import { useSelector, useDispatch } from "react-redux"
import { activeFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    
    const setFilter = (event) => {
        const content = event.target.value
        dispatch(activeFilter())
        console.log(content);
    }
    return (
        <>
        <form onChange={setFilter}>
            filter
          <input name='filter'/>  
        </form>
        </>
    )
}

export default Filter