import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhatWeDo from '../components/WhatWeDo';
// import Header from '../components/Header';
import Partners from "../components/Partners";
import Action from '@/components/Action';

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <Partners />
      <Action />
    </main>
  );
}  


