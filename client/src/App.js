import React from 'react';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import socketIO from 'socket.io-client';
import Homepage from './pages/Homepage';
import Listonepage from './pages/Listonepage';
import Portieri from './components/Portieri';
import Difensori from './components/Difensori';
import Centrocampisti from './components/Centrocampisti';
import Attaccanti from './components/Attaccanti';
const socket = socketIO.connect('http://localhost:4000');

function App() {
  
  return (
    <Router>
      <div socket={socket}>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/listone' element={<Listonepage/>}/>
          <Route path='/listone/portieri' element={<Portieri/>}/>
          <Route path='/listone/difensori' element={<Difensori/>}/>
          <Route path='/listone/centrocampisti' element={<Centrocampisti/>}/>
          <Route path='/listone/attaccanti' element={<Attaccanti/>}/>
          <Route path='*' element={<Homepage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
