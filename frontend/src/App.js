import React from 'react'
import ChooseUrself from './components/MainPage/ChooseUrself';
import FirstScreenMap from './components/MainPage/FirstScreenMap';
import Goal from './components/MainPage/Goal';
import HowTo from './components/MainPage/HowTo';
import ImplementedProjects from './components/MainPage/ImplementedProjects';
import Intro2ndScreen from './components/MainPage/Intro2ndScreen';
import Navbar from './components/MainPage/Navbar';
import RoadMap from './components/MainPage/RoadMap';
import Team from './components/MainPage/Team';

function App() {
  return (
    <div>
      <Navbar />
      <FirstScreenMap />
      <Intro2ndScreen />
      <HowTo />
      <ChooseUrself />
      <Goal />
      <RoadMap />
      <ImplementedProjects />
      <Team />
    </div>
  );
}

export default App;
