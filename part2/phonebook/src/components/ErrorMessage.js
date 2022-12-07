import React from "react"

const ErroMessage = ({message}) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

export default ErroMessage