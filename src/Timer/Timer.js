import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import './Timer.css'
import PlayButton from '../PlayButton'
import PauseButton from '../PauseButton'
import Settings from '../SettingsButton'
import SettingsContext from '../SettingsContext'
const Timer = () => {
  const context = useContext(SettingsContext)
  const value = context.timerShown ? context.workingMinutes : context.breakingMinutes

  const [isPaused, setIsPaused] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [mode, setMode] = useState('work')

  const isPausedRef = useRef(isPaused)
  const secondsLeftRef = useRef(secondsLeft)
  const modeRef = useRef(mode)



  useEffect(()=>{

    function switchMode(){
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? context.workingMinutes : context.breakingMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }
    secondsLeftRef.current = context.workingMinutes*60
    setSecondsLeft(context.workingMinutes*60)

    const interval = setInterval(()=>{
      if (isPausedRef.current){
        return
      }
      if (secondsLeftRef.current===0){
        return switchMode()
      }

      secondsLeftRef.current--
      setSecondsLeft(secondsLeftRef.current)

    },1000)

    return ()=> clearInterval(interval)

  },[context])

  const totalSeconds = (mode === 'work' ? context.workingMinutes : context.breakingMinutes) * 60
  const rate = Math.round(secondsLeft/totalSeconds*100)

  const minutes = Math.floor(secondsLeft / 60)
  let seconds = secondsLeft % 60
  if (seconds<10){
    seconds = '0'+seconds
  }
  const textTimer = minutes + ":" + seconds
  return (
    <div className='content'>
      <div className='timer'>
        <CircularProgressbar value={rate} text={textTimer} styles={buildStyles({
            textColor: '#fff',
            pathColor: mode==='work'? 'red':'green',
            tailColor: 'rgba(255,255,255,.2)'
        })}/>
      </div>
      <div className='buttons'>
        <PlayButton onClick={()=> {setIsPaused(false); isPausedRef.current = false; console.log(secondsLeftRef.current)}}/>
        <PauseButton onClick={()=> {setIsPaused(true); isPausedRef.current = true}}/>
      </div>
      <div className='settings'>
        <Settings onClick={()=>context.setTimerShown(false)}/>
      </div>
    </div>
  )
}

export default Timer