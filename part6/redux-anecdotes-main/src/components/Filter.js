import { useDispatch } from "react-redux"
import { activeFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    
    const setFilter = (event) => {
        const content = event.target.value
        dispatch(activeFilter(content))
    }
    return (
        <>
        <form onChange={setFilter}>
            filter
          <input name='filter'/>  
        </form>
        {}
        </>
    )
}

export default Filter