import React from 'react'

import ChooseUrself from './ChooseUrself';
import Contact from './Contact';
import FirstScreenMap from './FirstScreenMap';
import Footer from './Footer';
import Goal from './Goal';
import HowTo from './HowTo';
import ImplementedProjects from './ImplementedProjects';
import Intro2ndScreen from './Intro2ndScreen';
import Map from './Map';
import Navbar from './Navbar';
import RoadMap from './RoadMap';
import Team from './Team';

export default function Landing() {
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
    )
}
