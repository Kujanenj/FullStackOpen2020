import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = ({ onClick, text }) =>
 (  <button onClick={onClick}>    {text}
   </button>)


const Statistics =({all, good,bad,neutral}) =>{
    console.log(all,"KAIKKI")
    console.log(neutral, "neutraali")
    if(all===0){
        return(
        <div>
            <h1>Statistics</h1>
            no feed
        </div>
        )
    }
    return(
        <div>
            
            <h1>Statistics</h1>
            <table>
              <tbody>
                <Statistic text="good" value={good}/>
                <Statistic text="neutral" value={neutral} />
                <Statistic text="bad" value={bad}></Statistic>
                <Statistic text="all" value={all}></Statistic>
                <Statistic text="average" value={(good-bad)/all}></Statistic>
                <Statistic text="positive" value={(good/all*100)+"%"}></Statistic>    
              </tbody>
            </table>
            
           
        </div>
    )
    
    }

const Statistic = ({text, value}) =>{
  console.log(text,value)
  return(
    
      <tr>
      <td>
      {text}
      </td>
      <td>
       {value}
      </td>
      </tr>
      
)
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  


  const handleGoodClick =() =>{
    setGood(good + 1)
    setAll(all+1)
    
    }
    const handleNeutralClick =() =>{
        setNeutral(neutral + 1)
        setAll(all+1)
    }
    const handleBadClick =() =>{
        setBad(bad + 1)
        setAll(all+1)
        
    }
    
  return (
    <div>
        <h1>
            Give Feedback
        </h1>
      <Button onClick={handleGoodClick} text="good"></Button>
      
      <Button onClick={handleNeutralClick} text="Neutral"></Button>
      
      <Button onClick ={handleBadClick} text="Bad"></Button>
      
      
      
  <Statistics all={all} good ={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)