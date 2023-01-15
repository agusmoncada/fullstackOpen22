import { useState } from "react"
import { Button } from "react-bootstrap"

const Toglabble = (props) => {
    const [visible, setVisible] = useState(false)
    
    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant='outline-primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant="outline-secondary" onClick={toggleVisibility}>cancel</Button>
            </div>
        </div> 
    )

}

export default Toglabble