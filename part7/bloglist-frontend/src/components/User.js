import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { ListGroup } from "react-bootstrap"

const User = () => {
    const id = useParams().id
    const user = useSelector( state => state.users.find(user => user.id === id))
    if (!user) {
        return null
    }
    return (
        <>
        <h1>{user.name}</h1>
        <h4> Added blogs </h4>
        <ListGroup>
        {user.blogs.map(blog => 
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        )}
        </ListGroup>
        </>
    )
}

export default User