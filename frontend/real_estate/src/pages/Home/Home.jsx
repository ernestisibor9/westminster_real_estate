import React from "react";
import Hero from "../../component/Hero/Hero";
import WhoWeAre from "../../component/WhoWeAre/WhoWeAre";
import FeaturedProperties from "../../component/FeaturedProperties/FeaturedProperties";
import Testimonial from "../../component/Testimonial/Testimonial";
import Hero2 from "../../component/Hero2/Hero2";

function Home() {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <FeaturedProperties />
      <Hero2 />
      <Testimonial />
    </div>
  );
}

export default Home;
