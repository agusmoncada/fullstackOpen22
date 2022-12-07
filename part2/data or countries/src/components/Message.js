import React from "react"

const Message = ({ countries }) => {
    if (countries.length <= 10) {
      return null
    }  
  
    return (<p>too many countries to show</p>)
  }

export default Message