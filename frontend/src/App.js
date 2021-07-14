import React from 'react'
import ChooseUrself from './components/MainPage/ChooseUrself';
import Contact from './components/MainPage/Contact';
import FirstScreenMap from './components/MainPage/FirstScreenMap';
import Footer from './components/MainPage/Footer';
import Goal from './components/MainPage/Goal';
import HowTo from './components/MainPage/HowTo';
import ImplementedProjects from './components/MainPage/ImplementedProjects';
import Intro2ndScreen from './components/MainPage/Intro2ndScreen';
import Map from './components/MainPage/Map';
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
      <Map />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
