import React from 'react'
import Accordeon from './Accordeon'
import AboutCard from './AboutCard'

function AboutUS() {
  return (
    <div>
   <div class='flex flex-wrap justify-evenly mb-10 '>
      <AboutCard />
      <AboutCard />
      <AboutCard /> 
      <AboutCard /> 
      <AboutCard />
      <AboutCard />
      <AboutCard />
      <AboutCard />
      </div>
     <Accordeon />
      </div>


  )
}

export default AboutUS;
