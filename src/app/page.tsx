import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhatWeDo from './components/WhatWeDo';
import Header from './components/Header';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WhatWeDo />
      <HowItWorks />
    </main>
  );
}  

