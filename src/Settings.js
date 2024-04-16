import React, { useContext } from 'react'
import ReactSlider from 'react-slider'
import './Settings.css'
import SettingsContext from './SettingsContext'
import BackButton from './BackButton'
const Settings = (props) => {
    const context = useContext(SettingsContext)
  return (
    <div className='texts'>
        <label>Work Minutes: {context.workingMinutes}:00</label>
        <ReactSlider 
        className={'slider red'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={context.workingMinutes}
        onChange={newValue => context.setWorkingMinutes(newValue)}
        min={2}
        max={120}
        />
        <label>Break Minutes: {context.breakingMinutes}:00</label>
        <ReactSlider 
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={context.breakingMinutes}
        onChange={newValue => context.setBreakMinutes(newValue)}
        min={2}
        max={120}
        />
        <div style={{textAlign: 'center', marginTop: '20px'}}>
            <BackButton onClick={()=>context.setTimerShown(true)}/>
        </div>
    </div>
  )
}

export default Settings