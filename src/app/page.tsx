import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhatWeDo from './components/WhatWeDo';
import Header from './components/Header';
import Partners from "./components/Partners";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <Partners />
    </main>
  );
}  


