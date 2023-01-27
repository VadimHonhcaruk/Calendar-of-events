import Start from './Components/Start';
import React, { useState } from 'react';
import MainContent from './Components/MainContent';

function App() {

  const [startVisible, setStartVisible] = useState(true);
  return (
    <div className="App">
      {startVisible ? <Start startVisible={startVisible} setStartVisible={setStartVisible} /> : <></>}
      <MainContent startVisible={startVisible} />
    </div>
  );
}

export default App;