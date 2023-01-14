import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
    const id = useParams().id
    const user = useSelector( state => state.users.find(user => user.id === id))
    if (!user) {
        return null
    }
    return (
        <>
        <h1>{user.name}</h1>
        <h3> Added blogs </h3>
        <ul>
        {user.blogs.map(blog => 
            <li key={blog.id}>{blog.title}</li>
        )}
        </ul>
        </>
    )
}

export default User