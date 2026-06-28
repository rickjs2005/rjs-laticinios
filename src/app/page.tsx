import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/sections/Hero/Hero";
import { Products } from "@/sections/Products/Products";
import { About } from "@/sections/About/About";
import { Differentials } from "@/sections/Differentials/Differentials";
import { PandaPlay } from "@/sections/PandaPlay/PandaPlay";
import { Recipes } from "@/sections/Recipes/Recipes";
import { Partners } from "@/sections/Partners/Partners";
import { Stats } from "@/sections/Stats/Stats";
import { CTA } from "@/sections/CTA/CTA";
import { Footer } from "@/sections/Footer/Footer";
import YogurtBorder from "@/components/decor/YogurtBorder";

export default function Home() {
  return (
    <>
      <YogurtBorder position="top" />
      <Navbar />
      <main>
        <Hero />
        <Products />
        <About />
        <Differentials />
        <PandaPlay />
        <Recipes />
        <Partners />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
