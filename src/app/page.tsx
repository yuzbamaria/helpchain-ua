import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhatWeDo from '../components/WhatWeDo';
import Partners from "../components/Partners";
import Action from '@/components/Action';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <Partners />
      <Action />
      <Footer />
    </main>
  );
}  


