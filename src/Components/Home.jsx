import React from 'react'
import Navbar from './Navbar.jsx'
import Hero from '../Components/Home/Hero.jsx'
import ChooseUs from '../Components/Home/ChooseUs.jsx'
import Rest from './Rest.jsx'
import Footer from './Footer.jsx'

function Home() {
  return (
    <>
        <Navbar />
        <Hero />
        <Rest />
        <ChooseUs />
        <Footer />
    </>
  )
}

export default Home
