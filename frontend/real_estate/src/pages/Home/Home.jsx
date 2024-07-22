import React from 'react'
import Hero from '../../component/Hero/Hero'
import WhoWeAre from '../../component/WhoWeAre/WhoWeAre'
import FeaturedProperties from '../../component/FeaturedProperties/FeaturedProperties'

function Home() {
  return (
    <div>
        <Hero/>
        <WhoWeAre/>
        <FeaturedProperties/>
      <h1>This is home page</h1>
    </div>
  )
}

export default Home
