import './App.css';
import Timer from './Timer/Timer';
import Settings from './Settings';
import { useState } from 'react';
import SettingsContext from './SettingsContext'
function App() {
  const [timerShown, setTimerShown] = useState(true)
  const [workingMinutes, setWorkingMinutes] = useState(45)
  const [breakingMinutes, setBreakMinutes] = useState(15)
  return (
    <SettingsContext.Provider value={{
      timerShown, 
      setTimerShown,
      workingMinutes,
      breakingMinutes,
      setBreakMinutes,
      setWorkingMinutes
    }}>
      <div className="App">
        {timerShown ? <Timer/>: <Settings />}
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
