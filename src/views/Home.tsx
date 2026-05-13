'use client';
import { Navbar } from '../components/navbar/navbar';
import { Hero } from '../components/hero/hero';
import { TrustedPartners } from '../components/trusted-partners/trusted-partners';
import { About } from '../components/about/about';
import { Team } from '../components/team/team';
import { Services } from '../components/services/services';
import { Process } from '../components/process/process';
import { Projects } from '../components/projects/projects';
import { Pricing } from '../components/pricing/pricing';
import { Testimonials } from '../components/testimonials/testimonials';
import { Contact } from '../components/contact/contact';
import { ScrollCircular } from '../components/scroll-circular/scroll-circular';

export const Home = () => {
  return (
    <>
      <Navbar />
      <ScrollCircular />
      <main>
        <Hero />
        <TrustedPartners />
        <About />
        <Projects />
        <Services />
        <Process />
        {/* <Team /> */}
        {/* <Pricing /> */}
        <Testimonials />
        <Contact />
      </main>
    </>
  );
};
