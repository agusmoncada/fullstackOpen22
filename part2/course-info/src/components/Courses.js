import React from "react"
import Course from "./Course"

const Courses = ({ courses }) => {
    return (
        <>
        {courses.map(course => 
            <Course key={course.id} name={course.name} id={course.id} part={course.parts} />
        )}
        </>
    )
    
}

export default Courses