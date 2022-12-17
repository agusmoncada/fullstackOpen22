import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log('Store state is:', storeNow)
})

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, state }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{state}</td>
    </tr>
  )
}

const Statistics = () => {
  const state = store.getState()
  const all = state.good + state.bad + state.ok
  const average = (state.good - state.bad) / all 
  const positive = state.good * all
  
  if (all > 0) {
    return (
      <table>
        <tbody>
          <Statistic text={'good'} state={state.good}/>
          <Statistic text={'ok'} state={state.ok}/>
          <Statistic text={'bad'} state={state.bad}/>
          <Statistic text={'all'} state={all}/>
          <Statistic text={'average'} state={average}/>
          <Statistic text={'positive'} state={positive}/>
        </tbody>
      </table>
    )
  }
  return <h3>give some feedback</h3>
}

const App = () => {
  
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={good} text={'good'}/>
      <Button handleClick={ok} text={'ok'}/>
      <Button handleClick={bad} text={'bad'}/>
      <Button handleClick={reset} text={'reset stats'}/>

      <h2>statistics</h2>
      <Statistics/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
