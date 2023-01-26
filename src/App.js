import './App.css';
import Start from './Components/Start';
import React, { useState } from 'react';
import MainContent from './Components/MainContent';
import moment from 'moment/moment';

function App() {
  moment.updateLocale('en', { week: { dow: 1 } });
  const [startVisible, setStartVisible] = useState(true);
  return (
    <div className="App">
      {startVisible ? <Start startVisible={startVisible} setStartVisible={setStartVisible} /> : <></>}
      <MainContent startVisible={startVisible} />
    </div>
  );
}

export default App;