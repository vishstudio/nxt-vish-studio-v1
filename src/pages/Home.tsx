import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustedPartners } from '../components/TrustedPartners';
import { About } from '../components/About';
import { Team } from '../components/Team';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Projects } from '../components/Projects';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { ScrollCircular } from '../components/ScrollCircular';

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
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
};
