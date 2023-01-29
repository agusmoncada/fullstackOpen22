
const Recommend = ({ show, data, books }) => {
    if (!show) {
        return null
    }
    
    return (
        <div>
            <h1>recommendations</h1>
            <p>books in your favorite genre <b>{data?.me.favouriteGenre}</b></p>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
    )
}

export default Recommend