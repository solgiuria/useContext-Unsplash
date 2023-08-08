
import React from 'react'
import './App.css'
import { Header } from './components/Header/Header' //los componentes se importan solos
import { Imgs } from './components/Imgs/Imgs'
import { ImgsR } from './components/ImgsR/ImgsR'
import { ImgsT } from './components/ImgsT/ImgsT'
import { StateCompo } from './context/StateCompo'


function App() {
 

  return (
    <StateCompo>
      <>
        <Header/>
        <Imgs/>
        <ImgsR/> 
        <ImgsT/>
      </>
    </StateCompo>
  )
}

export default App
