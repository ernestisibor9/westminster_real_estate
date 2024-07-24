import React from 'react'
import Hero from '../../component/Hero/Hero'
import WhoWeAre from '../../component/WhoWeAre/WhoWeAre'
import FeaturedProperties from '../../component/FeaturedProperties/FeaturedProperties'
import Navbar from '../../component/Navbar/Navbar'

function Home() {
  return (
    <div>
      <Navbar/>
        <Hero/>
        <WhoWeAre/>
        <FeaturedProperties/>
    </div>
  )
}

export default Home
