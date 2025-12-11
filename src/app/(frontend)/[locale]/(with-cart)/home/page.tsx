import AboutSection from "@/frontendComponents/Home/Aboutus";
import FeaturedWorks from "@/frontendComponents/Home/FeaturedWorks";
import Hero from "@/frontendComponents/Home/Hero";
import NewsLatter from "@/frontendComponents/Home/NewsLatter";
import NewsSection from "@/frontendComponents/Home/NewsSection";
import OurWork from "@/frontendComponents/Home/OurWork";
import ProductSection from "@/frontendComponents/Home/ProductSection";
import SliderBrand from "@/frontendComponents/Home/SliderBrand";
import TestimonialsSection from "@/frontendComponents/Home/TestimonialsSection";
import { getCachedGlobal } from "@/utilities/getGlobals";

export const dynamic = "force-dynamic";

const HomePage = async () => {
 

  return (
    <main>
      {/* <HeroSection/> */}
      <Hero />

      <AboutSection />
      <OurWork />
      {/* <FeaturedWorks /> */}

      {/* <FeaturedProjects /> */}
      <ProductSection />
      <NewsSection />

      <TestimonialsSection />
      <SliderBrand />
      <NewsLatter />
    </main>
  );
};
export default HomePage;
