import React from "react"
import Header from './Header'
import Part from './Part'
import Total from './Total'

const Course = ({ name, id, part }) => {
    const totalAmount = part.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <>
            <Header name={name} />
            {part.map(part =>
                <Part key={part.id} part={part.name} exercise={part.exercises} />
            )}
            <Total total={totalAmount} />
        </>
    )
}

export default Course