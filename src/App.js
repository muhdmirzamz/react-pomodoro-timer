import { useState } from 'react';

import './App.css';

let timeInterval
let milliseconds = 0

function App() {

  const [timeDisplay, setTimeDisplay] = useState('00:00')
  
  const [minInput, setMinInput] = useState(0)
  const [secondsInput, setSecondsInput] = useState(0)

  const onChangeMinInput = (event) => {
    console.log(`minute input = ${event.target.value.replace(/\D/g, '')} `)
    setMinInput(event.target.value.replace(/\D/g, '')) // prevents numbers from being keyed in
  }

  const onChangeSecondsInput = (event) => {
    console.log(`seconds input = ${event.target.value.replace(/\D/g, '')} `)
    setSecondsInput(event.target.value.replace(/\D/g, ''))
  }

  const processTime = () => {
    // ==== CALCULATE ====
    // timer is running every 1000ms (1s)
    // so we are subtracting 1000ms every time
    milliseconds = milliseconds - 1000

    // ==== FORMAT ====
    let formattedTime = formatTime(milliseconds)

    // ==== SET DISPLAY ====
    setTimeDisplay(formattedTime)
  }

  const setTimer = () => {

    // initial setup
    // ==== CALCULATE ====
    // we will work with milliseconds
    milliseconds = (minInput * (1000 * 60)) + (secondsInput * (1000))

    // ==== CALCULATE ====
    let formattedTime = formatTime(milliseconds)

    // ==== DISPLAY ====
    setTimeDisplay(formattedTime)

    timeInterval = setInterval(() => {

      processTime()

      if (milliseconds <= 0) {
        clearInterval(timeInterval)
        setTimeDisplay('00:00')

        // prevents any further execution of the program
        return
      }
    }, 1000); 
    

    console.log(`Setting Timer`)
  }

  const pauseTimer = () => {
    clearInterval(timeInterval)
  }

  const resumeTimer = () => {

    let formattedTime = formatTime(milliseconds)
    setTimeDisplay(formattedTime)

    timeInterval = setInterval(() => {
      
      processTime()

      if (milliseconds <= 0) {
        clearInterval(timeInterval)
        setTimeDisplay('00:00')

        return
      }
    }, 1000); 
  }

  const formatTime = (milliseconds) => {
    // 1s = 1000ms
    // 60s (1 min) - 1000 * 60
    let minutes = Math.floor(milliseconds / (1000 * 60));
    
    // get the remaining seconds by using the % operator
    // divide the remaining seconds by 1000
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    console.log(`seconds: ${seconds}`)
 
    // https://www.w3schools.com/jsref/jsref_string_padstart.asp
    // pads a string with '0' until your string length reaches 2
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <div className="main-body">
      <div className='main-panel'>
        <h1 className='duration-text'>{timeDisplay}</h1>
        <p>Minutes</p>
        <input type="text" value={minInput} onChange={onChangeMinInput} />
        <p>seconds</p>
        <input type="text" value={secondsInput} onChange={onChangeSecondsInput} />
        <button onClick={setTimer}>Set timer</button>
        <button onClick={pauseTimer}>Pause timer</button>
        <button onClick={resumeTimer}>Resume timer</button>
      </div>
    </div>
  );
}

export default App;
