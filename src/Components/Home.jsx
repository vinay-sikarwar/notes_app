import React from 'react'
import Navbar from './Navbar.jsx'
import Hero from '../Components/Home/Hero.jsx'
import ChooseUs from '../Components/Home/ChooseUs.jsx'
import Rest from './Rest.jsx'

function Home() {
  return (
    <>
        <Navbar />
        <Hero />
        <Rest />
        <ChooseUs />
    </>
  )
}

export default Home
