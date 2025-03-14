import { useState } from 'react';

import './App.css';

function App() {

  let timeInterval
  let milliseconds = 0

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

  const setTimer = () => {

    // ==== CALCULATE ====
    // we will work with milliseconds
    // convert minutes to milliseconds
    // convert seconds to milliseconds
    milliseconds = (minInput * (1000 * 60)) + (secondsInput * (1000))

    let formattedTime = formatTime(milliseconds)
    setTimeDisplay(formattedTime)

    timeInterval = setInterval(() => {
      // ==== CALCULATE ====
      // timer is running every 1000ms (1s)
      // so we are subtracting 1000ms every time
      milliseconds = milliseconds - 1000

      // ==== FORMAT ====
      formattedTime = formatTime(milliseconds)

      // ==== SET DISPLAY ====
      setTimeDisplay(formattedTime)

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
      
      // ==== CALCULATE ====
      // timer is running every 1000ms (1s)
      // so we are subtracting 1000ms every time
      milliseconds = milliseconds - 1000

      // ==== FORMAT ====
      formattedTime = formatTime(milliseconds)

      // ==== SET DISPLAY ====
      setTimeDisplay(formattedTime)

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
    // you are dividing by 1 minute
    let minutes = Math.floor(milliseconds / (1000 * 60));
    console.log(`minutes: ${minutes}`)
    
    // get the remaining seconds by using the % operator
    // divide the remaining seconds by 1000
    // 1s = 1000ms
    // floor it to get a whole number
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    console.log(`seconds: ${seconds}`)

    console.log(`new string: ${minutes}:${seconds}`)
 
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
