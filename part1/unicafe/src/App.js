import { useState } from 'react'

// Renders Headers
const Header = (props) => <h1>{props.text}</h1>

// Renders Buttons
const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

// Renders each statistic
const Statistic = (props) => (
    <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
    </tr>
) 

// Validates if there is any statistic 
//to show and calls each Statistic component
const Statistics = (props) => {
    if (props.all > 0) {
        return (
            <table>
                <tbody>
                    <Statistic text="good" value={props.good} />
                    <Statistic text="neutral" value={props.neutral} />
                    <Statistic text="bad" value={props.bad} />
                    <Statistic text="all" value={props.all} />
                    <Statistic text="average" value={props.average} />
                    <Statistic text="positive" value={props.positive} />
                </tbody>
            </table>
        )
    } return <p>No feedback given</p>
}    

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = bad + good + neutral
    const average = (good - bad) /all
    const positive = good * all / 100

    const handleGood = () => {
        setGood(good + 1)
    }

    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }

    const handleBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <Header text="give feedback" />

            <Button handleClick={handleGood} text="good" />
            <Button handleClick={handleNeutral} text="neutral" />
            <Button handleClick={handleBad} text="bad" />

            <Header text="statistics" />

            <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive}/>
        </div>
    )
}

export default App