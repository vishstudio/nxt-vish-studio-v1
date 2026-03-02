import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustedPartners } from '../components/TrustedPartners';
import { About } from '../components/About';
import { Team } from '../components/Team';
import { Services } from '../components/Services';
import { Projects } from '../components/Projects';
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
        <Team />
        <Services />
        <Projects />
        <Contact />
      </main>
    </>
  );
};
