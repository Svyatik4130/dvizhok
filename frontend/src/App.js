import React from 'react'
import FirstScreenMap from './components/MainPage/FirstScreenMap';
import HowTo from './components/MainPage/HowTo';
import Intro2ndScreen from './components/MainPage/Intro2ndScreen';
import Navbar from './components/MainPage/Navbar';



function App() {
  return (
    <div>
      <Navbar />
      <FirstScreenMap />
      <Intro2ndScreen />
      <HowTo />
    </div>
  );
}

export default App;
