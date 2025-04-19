import React from 'react'
import Navbar from './pages/Navbar'
import Hero from './pages/Hero'
import About from './pages/About'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import { Cursor } from './pages/Cursor'
import Project from './pages/Project'

function App() {
  return (
    <>
    <Cursor/>
    <Navbar/>
    <Hero/>
    <About />
    <Skills/>
    <Project/>
    <Contact/>
    <Footer/>

    </>
  )
}

export default App
